"use client"

import { ShoppingCart, Plus, X } from 'lucide-react'
import AddProductModal from './AddProductModal'
import { useState, useEffect } from 'react'

type Product = {
  id: string
  name: string
  price: number
  unit: string
  userId: string
}

type EnregistrementProduit = {
  productId: string
  name: string
  price: number
  unit: string
  stock: number | null
}


export default function ProductListCard({
    produitsExistants,
    onProductsReady
}: {
    produitsExistants: Product[],
    onProductsReady: (produits: EnregistrementProduit[]) => void
}) {
    const [showModal, setShowModal] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
    const [inputPrice, setInputPrice] = useState<number | ''>('')
    const [products, setProducts] = useState<Product[]>([])
    const [enregistrements, setEnregistrements] = useState<EnregistrementProduit[]>([])
    const [inputStock, setInputStock] = useState<string>('')

    useEffect(() =>{
      setProducts(produitsExistants)
    }, [produitsExistants])

    useEffect(() => {
      onProductsReady(enregistrements)
    }, [enregistrements])


    const selectedProduct = products.find((p) => p.id === selectedProductId)

    const handleSelectChange = (id: string) => {
        setSelectedProductId(id)
        const produit = products.find((p) => p.id === id)
        setInputPrice(produit?.price ?? '')
    }

    const handleProductCreated = (product: Product) => {
        setProducts((prev) => [...prev, product])
        setSelectedProductId(product.id)
        setInputPrice(product.price)
        setShowModal(false)
    }

    const handleSaveProduct = () => {
      if (!selectedProductId) return
      const produit = products.find(p => p.id === selectedProductId)
      if (!produit) return

      setEnregistrements(prev => [
        ...prev,
        {
          productId: produit.id,
          name: produit.name,
          price: inputPrice || produit.price,
          unit: produit.unit,
          stock: inputStock.trim() === '' ? null : Number(inputStock)
        }
      ])

      setSelectedProductId(null)
      setInputPrice('')
      setInputStock('')
    }
    

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 space-y-4 mt-5">
      {/* En-tête */}
      <div className="flex items-center justify-between text-fermaviatxt-500 font-semibold text-md">
        <div className="flex items-center gap-2">
          <ShoppingCart size={18} />
          <span>Produits</span>
        </div>
        <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-sm text-fermaviatxt-500 hover:underline flex items-center gap-1">
          <Plus size={16} />
          Créer un produit
        </button>
      </div>

      <AddProductModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onProductCreated={handleProductCreated}
        />

      {/* Exemple de produit ajouté */}
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2">

        {/* Sélection du produit existant */}
        <select 
            className="w-full rounded-md border px-3 py-2 text-sm font-sans text-gray-700"
            value={selectedProductId ?? ''}
            onChange={(e) => handleSelectChange(e.target.value)}
        >
          <option value="">Sélectionner un produit existant</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} – {p.price}€ / {p.unit}
            </option>
          ))}
        </select>

        <div className="flex items-center justify-between mt-5">
          <p className="text-sm font-medium text-gray-700">
            {selectedProduct ? selectedProduct.name : 'Aucun produit sélectionné'}
          </p>
          <button type="button" className="text-gray-400 hover:text-red-500 ml-2">
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-5">
            {/* Prix */}
            <div className="flex flex-col">
                <label htmlFor="price" className="text-sm font-medium text-fermaviatxt-500 mb-1">
                Prix (€)
                </label>
                <input
                id="price"
                type="number"
                placeholder="Prix (€)"
                value={inputPrice}
                onChange={(e) => setInputPrice(Number(e.target.value))}
                className="w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400"
                />
            </div>

            {/* Stock */}
            <div className="flex flex-col">
                <label htmlFor="stock" className="text-sm font-medium text-fermaviatxt-500 mb-1">
                Stock (optionnel)
                </label>
                <input
                id="stock"
                type="number"
                value={inputStock}
                onChange={e => setInputStock(e.target.value)}
                placeholder="Stock"
                className="w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400"
                />
            </div>
        </div>
      </div>

      {/* Bouton bas */}
      <button
        type="button"
        className="w-full border border-dashed border-green-400 rounded-lg py-2 text-fermaviatxt-500 text-sm flex justify-center items-center gap-1 hover:bg-green-50"
        onClick={handleSaveProduct}
      >
        <Plus size={16} />
        Enregistrer le produit
      </button>

      {/* Affichage dynamique des produits */}
      {enregistrements.length > 0 && (
        <div className="pt-4 space-y-3 border-t border-gray-200 mt-4">
          <h3 className="text-sm font-semibold text-gray-700">Produits enregistrés :</h3>

          {enregistrements.map((prod) => (
            <div
              key={prod.productId}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{prod.name}</p>
                <p className="text-xs text-gray-500">
                  {prod.price}€ / {prod.unit} –{" "}
                  {prod.stock === null ? "Stock illimité" : `Stock : ${prod.stock}`}
                </p>
              </div>
              <button
                type="button"
                className="text-gray-400 hover:text-red-500"
                onClick={() =>
                  setEnregistrements((prev) =>
                    prev.filter((p) => p.productId !== prod.productId)
                  )
                }
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
