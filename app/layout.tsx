import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cluvo',
  description: 'Turn customer conversations into investor-grade evidence. CLUVO helps founders validate product-market fit with real evidence and stop accepting polite lies.',
  viewport: 'width=device-width, initial-scale=1.0',
  icons: {
    icon: '/logo_tab.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
        <link rel="icon" href="/logo_tab.png" />
      </head>
      <body className={`${inter.variable} ${ibmPlexMono.variable} bg-background-light dark:bg-background-dark text-deep-jungle dark:text-gray-100 font-sans antialiased transition-colors duration-300`}>
        {children}
      </body>
    </html>
  )
}

