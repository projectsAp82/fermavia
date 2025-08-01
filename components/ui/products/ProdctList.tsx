'use client'

import { Pencil, Trash, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import AddProductModal from '../newSale/AddProductModal'

export type Product = {
  id: string
  name: string
  price: number
  unit: string
  userId: string
}

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined)

  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts])

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleProductCreated = (product: Product) => {
    setProducts((prev) => [...prev, product])
    setIsModalOpen(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return

    setIsLoading(true)
    try {
      const res = await fetch(`/api/products/${id}/delete`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Erreur lors de la suppression')

      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la suppression du produit.')
    }
    setIsLoading(false)
  }

  const handleProductUpdated = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    setIsModalOpen(false)
    setEditingProduct(undefined)
  }

  return (
    <div className="space-y-3 pb-15">
      {/* Barre de recherche */}
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-3 pr-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-fermaviatxt-500"
        />
      </div>

      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
        >
          <div>
            <p className="font-semibold text-gray-800">{product.name}</p>
            <p className="text-sm text-gray-500">
              {product.price}€ / {product.unit}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingProduct(product)
                setIsModalOpen(true)
              }}
              className="text-blue-400 hover:text-blue-600 mr-2"
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="text-red-400 hover:text-red-600"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Trash size={20} />}
            </button>
          </div>
        </div>
      ))}

      {/* Modale d'ajout/édition */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProduct(undefined)
        }}
        onProductCreated={handleProductCreated}
        productToEdit={editingProduct}
        onProductUpdated={handleProductUpdated}
      />

      {/* Bouton flottant d'ajout */}
      <div className="fixed bottom-20 right-5 z-50">
        <button
          onClick={() => {
            setEditingProduct(undefined)
            setIsModalOpen(true)
          }}
          type="button"
          className="w-12 h-12 rounded-full bg-fermaviabtnbg-500 text-white shadow-lg flex items-center justify-center hover:bg-fermaviabtnhv-500 transition"
          aria-label="Ajouter un nouveau produit"
        >
          <span className="text-3xl">+</span>
        </button>
      </div>
    </div>
  )
}
