'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale/fr'
import { Trash, Cog } from 'lucide-react'

// Types de la vente
export type Sale = {
  id: string
  title: string
  deadline: Date // date ISO
  status: 'ACTIVE' | 'CLOSED'
  createdAt: Date // date ISO
  dateLivraison: Date
  orders: { id: string }[]
}

export default function SaleList({ sales }: { sales: Sale[] }) {
  const [saleList, setSaleList] = useState(sales)

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette vente ?')) return
    try {
      const res = await fetch(`/api/sales/${id}/delete`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Erreur de suppression')
      setSaleList(prev => prev.filter(s => s.id !== id))
    } catch (err) {
      console.error(err)
      alert("Erreur lors de la suppression")
    }
  }

  return (
    <div className="space-y-4 pb-20">
      {saleList.map(sale => {
        const totalDays =
          (new Date(sale.deadline).getTime() - new Date(sale.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        const passedDays =
          (new Date().getTime() - new Date(sale.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        const progress = Math.min(100, Math.floor((passedDays / totalDays) * 100))

        return (
          <div
            key={sale.id}
            className="bg-white border rounded-xl shadow-sm p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-800">{sale.title}</h2>
              <span className={`text-xs font-medium px-2 py-1 rounded-full 
                ${sale.status === 'ACTIVE' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}
              >
                {sale.status === 'ACTIVE' ? 'En cours' : 'Clôturée'}
              </span>
            </div>
            
            <div className="text-sm text-gray-500">
              Livraison : {format(new Date(sale.dateLivraison), "dd MMMM", { locale: fr })}
            </div>
            <div className="text-sm text-gray-500">
              {sale.orders.length} participant{sale.orders.length > 1 ? 's' : ''}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                className="flex-1 bg-fermaviabtnbg-500 text-white rounded-md py-2 text-sm font-medium hover:bg-fermaviabtnhv-500 transition"
              >
                Gérer
              </button>
              <button
                onClick={() => handleDelete(sale.id)}
                className="flex items-center justify-center text-red-500 hover:text-red-700"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
