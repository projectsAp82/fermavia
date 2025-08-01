'use client'

import { X, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

type ProductFormData = {
  name: string
  price: number
  unit: string
}

type Product = {
  id: string
  name: string
  price: number
  unit: string
  userId: string
}

export default function AddProductModal({
  isOpen, 
  onClose, 
  onProductCreated,
  productToEdit,
  onProductUpdated 
}: { 
  isOpen: boolean, 
  onClose: () => void,
  onProductCreated: (product: Product) => void,
  productToEdit?: Product | undefined,
  onProductUpdated?: (product: Product) => void

}) {

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<ProductFormData>();

  useEffect(() => {
  if (productToEdit) {
    reset({
      name: productToEdit.name,
      price: productToEdit.price,
      unit: productToEdit.unit
    })
  } else {
    reset() // reset vide si on crée
  }
}, [productToEdit, reset])


  const onSubmit = async (data: ProductFormData) => {
    try {
      const res = await fetch(
        productToEdit
          ? `/api/products/${productToEdit.id}/edit`
          : '/api/products/create',
        {
          method: productToEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      )

      if (!res.ok) throw new Error('Erreur API')

      const savedProduct = await res.json()

      if (productToEdit) {
        onProductUpdated?.(savedProduct)
      } else {
        onProductCreated(savedProduct)
      }

      onClose()
      reset()
    } catch (err) {
      console.error(err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative space-y-4 mx-4">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-fermaviatxt-500 flex items-center gap-2">
          <Plus size={20} /> Ajouter un produit
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              step='0.01'
              placeholder="Ex : Tomates anciennes"
              {...register('name', {required: true})}
              className="w-full rounded-md border px-3 py-2 text-sm mt-1"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">Le nom est requis</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
            <input
              type="number"
              placeholder="0.00"
              {...register('price', {required: true, valueAsNumber: true})}
              className="w-full rounded-md border px-3 py-2 text-sm mt-1"
            />
            
            {errors.price && <p className="text-red-500 text-xs mt-1">Le prix est requis</p>}
          </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Unité</label>
                <input
                    type="text"
                    placeholder="Ex : kg, pièce, plateau..."
                    {...register('unit', {required: true})}
                    className="w-full rounded-md border px-3 py-2 text-sm mt-1"
                />
                
              {errors.unit && <p className="text-red-500 text-xs mt-1">L'unité est requise</p>}
            </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-fermaviatxt-500 text-white py-2 rounded-md font-medium hover:bg-fermaviatxt-600 transition"
          >
            Ajouter le produit
          </button>
        </div>
      </div>
    </div>
  )
}
