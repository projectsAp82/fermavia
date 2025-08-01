// components/public/PublicSaleHeader.tsx
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Sale } from "@/app/generated/prisma"

export default function PublicSaleHeader({ sale }: { sale: Sale }) {
  const isClosed = sale.status !== "ACTIVE" || new Date() > new Date(sale.deadline)

  return (
    <div className="w-full bg-white border-b px-4 py-5 shadow-sm">
      <div className="max-w-2xl mx-auto text-center space-y-1">
        <h1 className="text-xl font-bold text-fermaviatxt-500">
          {sale.title}
        </h1>

        {sale.description && (
          <p className="text-sm text-gray-600">{sale.description}</p>
        )}

        <p className="text-sm text-gray-500">
          {isClosed ? (
            <span className="text-red-500 font-medium">Commande clôturée</span>
          ) : (
            <>Commande possible jusqu’au{" "}
              <span className="font-medium text-gray-700">
                {format(new Date(sale.deadline), "PPP", { locale: fr })}
              </span>
            </>
          )}
        </p>
        <p className="text-sm text-gray-500">
          {isClosed ? (
            <span className="text-red-500 font-medium">Commande clôturée</span>
          ) : (
            <>Livraison prévue le {" "}
              <span className="font-medium text-gray-700">
                {format(new Date(sale.dateLivraison), "PPP", { locale: fr })}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
