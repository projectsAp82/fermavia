// app/layout.tsx (App Router)
import './globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'

import { Toaster } from "@/components/ui/toast/toast"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fermavia - Commandes groupées locales',
  description: 'Organisez et rejoignez des commandes groupées de produits locaux en toute simplicité.',
  keywords: 'ferme, local, circuit court, commande groupée, producteurs, fermavia',
  openGraph: {
    title: 'Fermavia',
    description: 'Rejoignez ou organisez des commandes groupées de produits locaux.',
    url: 'https://app.fermavia.com',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <Head>
        {/* Pour le SEO + réseaux sociaux */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${inter.className} bg-white text-gray-900`}>
        <main className="min-h-screen flex flex-col">
          {/* HEADER ici si global */}
          {/* <Header /> */}

          <div className="flex-1">{children}</div>
          <Toaster />  

          {/* FOOTER ici si global */}
          {/* <Footer /> */}
        </main>
      </body>
    </html>
  )
}
