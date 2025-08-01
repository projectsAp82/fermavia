'use client'

import { useState } from "react"
import { SaleProduct, Product } from "@/app/generated/prisma"
import { useFormContext } from 'react-hook-form'

type Props = {
  saleProducts: (SaleProduct & { product: Product })[]
}

export default function AvailableProducts({ saleProducts }: Props) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const increment = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const decrement = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }))
  }

  return (
    <div className="space-y-4 mt-6 ml-5 mr-5">
      <h2 className="text-lg font-semibold text-fermaviatxt-500">Produits disponibles</h2>

      {saleProducts.map(({ product, price, maxDispo }) => (
        <div
          key={product.id}
          className="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between"
        >
          <div className="flex-1">
            <p className="font-bold text-fermaviatxt-500">{product.name}</p>
            <p className="mt-1 text-sm text-fermaviatxt-500">{price.toFixed(2)}€
              <span className="text-sm text-gray-500"> / {product.unit} </span>
            </p>
            {maxDispo !== null && maxDispo !== undefined && (
              <p className="text-xs text-gray-400 mt-1">Stock : {maxDispo} disponibles</p>
            )}
            
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => decrement(product.id)}
              className="w-8 h-8 rounded-full border text-xl font-bold text-gray-600 hover:bg-gray-100"
            >
              –
            </button>
            <span className="w-6 text-center">{quantities[product.id] || 0}</span>
            <button
              onClick={() => increment(product.id)}
              className="w-8 h-8 rounded-full border text-xl font-bold text-fermaviatxt-500 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
