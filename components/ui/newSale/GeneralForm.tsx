'use client'

import { useFormContext } from 'react-hook-form'
import { PencilLine } from 'lucide-react'

export default function GeneralInfoCard(){
    const {register} = useFormContext()

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 space-y-4 mt-5">
            <div className="flex items-center gap-2 text-fermaviatxt-500 font-semibold text-md">
                <PencilLine size={18} />
                <span>Informations générales</span>
            </div>

            <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-fermaviatxt-500">
                Nom de la commande <span className="text-red-500">*</span>
                </label>
                <input {...register("title")}
                id="title"
                name="title"
                type="text"
                placeholder="Ex: Panier fermier - Semaine 32"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fermaviatxt-500 focus:border-transparent"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-fermaviatxt-500">
                Description
                </label>
                <textarea {...register("description")}
                id="description"
                name="description"
                rows={3}
                placeholder="Décrivez brièvement cette commande..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fermaviatxt-500 focus:border-transparent"
                />
            </div>
        </div>
    )
}