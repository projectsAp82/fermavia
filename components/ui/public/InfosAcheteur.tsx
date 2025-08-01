'use client'

import { useState } from "react"

export default function InfosAcheteur() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')

  return (
    <div className="mt-8 space-y-4 bg-white border-b px-4 py-5 pb-5 shadow-sm">
      <h2 className="text-lg font-semibold text-fermaviatxt-500">Vos informations</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom"
          className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-fermaviatxt-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Adresse mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemple@email.com"
          className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-fermaviatxt-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Commentaire (facultatif)</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Informations complémentaires, préférences..."
          rows={3}
          className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-fermaviatxt-500 resize-none"
        />
      </div>
    </div>
  )
}
