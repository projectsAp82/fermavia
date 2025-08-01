'use client'

import GeneralInfoCard from './GeneralForm'
import PlanningCard from './PlanningForm'
import ProductListCard from './ProductListCard'
import { useForm, FormProvider } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type EnregistrementProduit = {
    productId: string
    name: string
    price: number
    unit: string
    stock: number | null
}

export default function NewSaleClient({
    produitsExistants
}: {
    produitsExistants: any[]
}) {

    const methods = useForm({ mode: 'onBlur'});
    const { handleSubmit } = methods
    const [produitsPourVente, setProduitsPourVente] = useState<EnregistrementProduit[]>([])

    const router = useRouter()


    const onSubmit = async (data: any) => {
        try {
            const res = await fetch('/api/sales/create', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                    deadline: new Date(data.deadline),
                    dateLivraison: new Date(data.dateLivraison),
                    produits: produitsPourVente.map(p => ({
                        productId: p.productId,
                        stock: p.stock ?? null,
                        price: p.price
                    }))
                })
            })

            if(!res.ok){
                throw new Error('Erreur côté serveur')
            }
            const result = await res.json()
            console.log('Vente créée avec succès', result)
            router.push('/dashboard/sales')
        } catch (error) {
            console.error('Erreur de création de vente :', error)
        }
        
    }

    return (

        <div className="p-4 bg-fermaviabg-500">
                <div>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <GeneralInfoCard />
                            <PlanningCard />
                            <ProductListCard 
                                produitsExistants={produitsExistants}
                                onProductsReady={(produits) => setProduitsPourVente(produits)}
                            />
                            <button
                                type="submit"
                                className="w-full bg-fermaviabtnbg-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-fermaviabtnhv-500 transition mt-5"
                                
                            >
                                Créer la vente
                                
                            </button>
                        </form>
                    </FormProvider>
                </div>
                
        </div>

    )
}