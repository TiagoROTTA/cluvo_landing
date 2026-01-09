import { NextRequest, NextResponse } from 'next/server'
import Airtable from 'airtable'

export async function POST(request: NextRequest) {
  // Configure Airtable à l'intérieur de la fonction pour éviter les erreurs au build
  if (!process.env.AIRTABLE_ACCESS_TOKEN || !process.env.AIRTABLE_BASE_ID) {
    console.error('Missing Airtable credentials')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  const base = new Airtable({
    apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
  }).base(process.env.AIRTABLE_BASE_ID)
  try {
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

    // Create record in Airtable
    await base(process.env.AIRTABLE_TABLE_NAME || 'Waitlist').create([
      {
        fields: {
          Email: email,
          Name: name,
          Description: description || '',
          'Company Stage': stage,
        },
      },
    ])

    console.log('Successfully added to Airtable:', { email, name, stage })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully added to waitlist!' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing waitlist submission:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}

