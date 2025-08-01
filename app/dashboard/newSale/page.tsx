import { requireUser } from "@/lib/checkUser"
import NewSaleClient from "@/components/ui/newSale/NewSaleClient"
import { getUserProducts } from "@/lib/data/products";

export default async function NewSalePage() {
    const user = await requireUser();
    const produitsExistants = await getUserProducts(user.id)

    return (
            <NewSaleClient produitsExistants={produitsExistants}/>
        
    )
}
