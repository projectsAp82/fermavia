'use client'

import { useForm } from "react-hook-form"
import { SaleProduct, Product } from "@/app/generated/prisma"

type Props = {
  saleProducts: (SaleProduct & { product: Product })[]
  saleId: string
}

type FormData = {
  buyerName: string
  buyerEmail: string
  buyerComment: string
  quantities: { [productId: string]: number }
}

export default function PublicSaleClient({ saleProducts, saleId }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    defaultValues: {
      quantities: {}
    }
  })

  const onSubmit = async (data: FormData) => {
    const productMap = new Map(saleProducts.map(sp => [sp.productId, sp]))

    const items = Object.entries(data.quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, qty]) => {
        const sp = productMap.get(productId)

        if (!sp) {
          console.warn("Produit introuvable :", productId)
          throw new Error(`Produit introuvable : ${productId}`)
        }

        return {
          productId,
          quantity: qty,
          priceAtOrder: sp.price,
        }
      })

    if (items.length === 0) {
      alert("Veuillez sélectionner au moins un produit.")
      return
    }

    const payload = {
      saleId,
      buyerName: data.buyerName,
      buyerEmail: data.buyerEmail,
      buyerComment: data.buyerComment,
      items,
    }

    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error()
      alert("Commande envoyée !")
      reset()
    } catch (err) {
      console.error("Erreur d’envoi :", err)
      alert("Erreur lors de l’envoi de la commande.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4 py-6">

      {/* Produits */}
      <div className="space-y-3">
        {saleProducts.map(sp => (
          <div key={sp.productId} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border">
            <div>
              <p className="font-medium text-gray-800">{sp.product.name}</p>
              <p className="text-sm text-gray-500">{sp.price}€ / {sp.product.unit}</p>
              {sp.maxDispo && (
                <p className="text-xs text-gray-400">Stock dispo : {sp.maxDispo}</p>
              )}
            </div>
            <input
              type="number"
              min={0}
              max={sp.maxDispo || undefined}
              placeholder="0"
              {...register(`quantities.${sp.productId}` as const, { valueAsNumber: true })}
              className="w-16 border rounded-md px-2 py-1 text-sm text-right"
            />
          </div>
        ))}
      </div>

      {/* Infos acheteur */}
      <div className="space-y-4 mt-5 mb-5">
        <div>
          <label className="text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            {...register("buyerName", { required: true })}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
          {errors.buyerName && <p className="text-red-500 text-xs mt-1">Nom requis</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("buyerEmail", { required: true })}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
          {errors.buyerEmail && <p className="text-red-500 text-xs mt-1">Email requis</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Commentaire</label>
          <textarea
            {...register("buyerComment")}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Bouton */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-fermaviabtnbg-500 hover:bg-fermaviabtnhv-500 text-white font-medium py-2 px-6 rounded-md transition disabled:opacity-50"
        >
          {isSubmitting ? "Envoi..." : "Commander"}
        </button>
      </div>
    </form>
  )
}
