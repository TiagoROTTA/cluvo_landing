import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'

export async function POST(request: NextRequest) {
  try {
    // Configure Airtable à l'intérieur de la fonction pour éviter les erreurs au build
    if (!process.env.AIRTABLE_ACCESS_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      console.error('Missing Airtable credentials:', {
        hasToken: !!process.env.AIRTABLE_ACCESS_TOKEN,
        hasBaseId: !!process.env.AIRTABLE_BASE_ID,
      })
      return NextResponse.json(
        { error: 'Server configuration error: Missing Airtable credentials' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { email, name, stage, description } = body

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!stage) {
      return NextResponse.json(
        { error: 'Startup stage is required' },
        { status: 400 }
      )
    }

    // Initialize Airtable
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
    }).base(process.env.AIRTABLE_BASE_ID)

    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Waitlist'
    
    console.log('Attempting to create record in Airtable:', {
      table: tableName,
      email,
      name,
      stage,
    })

    // Create record in Airtable
    const records = await base(tableName).create([
      {
        fields: {
          Email: email,
          Name: name,
          Description: description || '',
          'Company Stage': stage,
        },
      },
    ])

    console.log('Successfully added to Airtable:', { 
      recordId: records[0].id,
      email, 
      name, 
      stage 
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully added to waitlist!' 
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error processing waitlist submission:', {
      message: error?.message,
      statusCode: error?.statusCode,
      errorDetails: error?.error,
      stack: error?.stack,
    })
    
    // Return more detailed error message in development
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Failed to process submission: ${error?.message || 'Unknown error'}`
      : 'Failed to process submission. Please try again later.'
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

