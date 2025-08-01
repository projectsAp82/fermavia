'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingCart, CirclePlus, PackageSearch, UserPen, ArrowLeft } from "lucide-react"
import Image from "next/image"


const navItems = [
  { href: "/dashboard", label: "Accueil", icon: <Home size={20} /> },
  { href: "/dashboard/commandes", label: "Commandes", icon: <ShoppingCart size={20} /> },
  { href: "/dashboard/new", label: "", icon: <CirclePlus size={30} /> },
  { href: "/dashboard/produits", label: "Produits", icon: <PackageSearch size={20} /> },
  { href: "/dashboard/reglages", label: "Profil", icon: <UserPen size={20} /> },
]


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const getHeaderConfig = () => {
    if (pathname === '/dashboard') {
      return { showBack: false, title: 'Fermavia', backHref: '' }
    }

    if (pathname === '/dashboard/newSale') {
      return { showBack: true, title: 'Nouvelle vente', backHref: '/dashboard' }
    }

    if (pathname === '/dashboard/products') {
      return { showBack: true, title: 'Gestion des produits', backHref: '/dashboard' }
    }

    if (pathname === '/dashboard/profile') {
      return { showBack: true, title: 'Mon Profil', backHref: '/dashboard' }
    }

    if (pathname === '/dashboard/sales') {
      return { showBack: true, title: 'Mes Ventes', backHref: '/dashboard' }
    }

    return { showBack: false, title: 'Fermavia', backHref: '' }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f7f2]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white px-4 py-3 shadow flex items-center justify-between">
        <div className="flex items-center gap-2 mt-2">
          {getHeaderConfig().showBack ? (
            <Link href={getHeaderConfig().backHref} className="text-fermaviatxt-500 hover:text-fermaviatxt-700">
              <ArrowLeft size={20} />
            </Link>
          ) : (
            <Image src="/logofermavia.png" alt="Logo Fermavia" width={25} height={25} className="mx-auto w-12 h-auto" />
          )}
          <span className="font-semibold text-lg text-fermaviatxt-500">
            {getHeaderConfig().title}
          </span>
        </div>
        
      </header>

      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        {children}
      </main>

      {/* Navigation Sticky Bas */}
        <nav className="sticky bottom-0 w-full bg-white border-t border-gray-200">
            <div className="w-full grid grid-cols-5 text-xs text-gray-600 text-center">
                
                {/* 1 - Accueil */}
                <Link href="/dashboard" className="flex flex-col items-center justify-center py-2 hover:text-green-700">
                <Home size={20} />
                <span>Accueil</span>
                </Link>

                {/* 2 - Commandes */}
                <Link href="/dashboard/sales" className="flex flex-col items-center justify-center py-2 hover:text-green-700">
                <ShoppingCart size={20} />
                <span>Ventes</span>
                </Link>

                {/* 3 - Bouton Central */}
                <Link
                href="/dashboard/newSale"
                className="relative flex flex-col items-center justify-center"
                >
                <div className="w-12 h-12 bg-fermaviabtnbg-500 text-white rounded-full flex items-center justify-center shadow -mt-6 border-4 border-white">
                    <CirclePlus size={24} />
                </div>
                </Link>

                {/* 4 - Produits */}
                <Link href="/dashboard/products" className="flex flex-col items-center justify-center py-2 hover:text-green-700">
                <PackageSearch size={20} />
                <span>Produits</span>
                </Link>

                {/* 5 - Réglages */}
                <Link href="/dashboard/reglages" className="flex flex-col items-center justify-center py-2 hover:text-green-700">
                <UserPen size={20} />
                <span>Profil</span>
                </Link>

            </div>
        </nav>


    </div>
  )
}
