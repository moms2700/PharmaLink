import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PharmaLink - Votre pharmacie en ligne en Algérie',
  description:
    'Trouvez et réservez vos médicaments facilement. Localisez les pharmacies les plus proches avec PharmaLink Algérie.',
  keywords: [
    'pharmacie',
    'médicaments',
    'Algérie',
    'Alger',
    'Doliprane',
    'réservation',
    'pharmacie en ligne',
    'médicaments disponibles',
  ],
  authors: [{ name: 'PharmaLink Team' }],
  openGraph: {
    title: 'PharmaLink Algérie',
    description: 'Trouvez vos médicaments en un clic',
    type: 'website',
    locale: 'fr_DZ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
