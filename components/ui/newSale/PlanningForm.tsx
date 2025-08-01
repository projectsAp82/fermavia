'use client'

import { Clock } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

export default function PlanningCard() {
    const {register} = useFormContext()
    return (
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 space-y-4 mt-5">
            <div className="flex items-center gap-2 text-fermaviatxt-500 font-semibold text-md">
                <Clock size={18} />
                <span>Planning</span>
            </div>

            <div className="space-y-2">
                <label htmlFor="closingDate" className="text-sm font-medium text-fermaviatxt-500">
                Date de clôture <span className="text-red-500">*</span>
                </label>
                <input
                {...register("deadline")}
                id="deadline"
                name="deadline"
                type="date"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fermaviatxt-500 focus:border-transparent"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="dateLivraison" className="text-sm font-medium text-fermaviatxt-500">
                Date de livraison estimée <span className="text-red-500">*</span>
                </label>
                <input
                {...register("dateLivraison")}
                id="dateLivraison"
                name="dateLivraison"
                type="date"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fermaviatxt-500 focus:border-transparent"
                />
            </div>
        </div>
    )
}
