import { ShoppingCart, Truck, Euro, Users, Plus, CircleDot } from "lucide-react"
import { requireUser } from "@/lib/checkUser"
export default async function DashboardPage() {

    const user = await requireUser();

    return (
        <div className="flex flex-col gap-6">

            {/* Salutation */}
            <div>
                <h2 className="text-lg font-semibold text-gray-800">Bonjour {user.name} !</h2>
                <p className="text-sm text-gray-600">Voici un aperçu de votre activité communautaire</p>
            </div>

            {/* Statistiques principales */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <ShoppingCart size={18} />
                    <span className="text-sm">Commandes actives</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">3</span>
                </div>

                <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Truck size={18} />
                    <span className="text-sm">Prochaine livraison</span>
                </div>
                <span className="text-sm text-gray-800 font-semibold">Mar 15</span>
                </div>

                <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Euro size={18} />
                    <span className="text-sm">Total collecté</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">245</span>
                </div>

                <div className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Users size={18} />
                    <span className="text-sm">Participants</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">12</span>
                </div>
            </div>

            {/* Bouton de création */}
            <button className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
                <Plus size={18} />
                Créer une nouvelle commande groupée
            </button>

            {/* Activité récente */}
            <div className="bg-white rounded-xl shadow p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Activité récente</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-[2px]"><CircleDot size={10} /></span>
                    <div>
                    <span className="font-medium">Paul</span> a rejoint la commande "<span className="italic">Légumes bio</span>"<br />
                    <span className="text-gray-500 text-xs">Il y a 2h</span>
                    </div>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-[2px]"><CircleDot size={10} /></span>
                    <div>
                    Livraison confirmée pour demain<br />
                    <span className="text-gray-500 text-xs">Il y a 4h</span>
                    </div>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-[2px]"><CircleDot size={10} /></span>
                    <div>
                    <span className="font-medium">Sophie</span> a créé "<span className="italic">Fruits de saison</span>"<br />
                    <span className="text-gray-500 text-xs">Hier</span>
                    </div>
                </li>
                </ul>
            </div>
        </div>
    )
}
