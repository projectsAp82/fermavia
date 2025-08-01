import { requireUser } from "@/lib/checkUser"
import SaleList from "@/components/ui/sales/SaleList"
import { GetUserSales } from "@/lib/data/sales"

export default async function SalesPage() {
    const user = await requireUser()
    const sales = await GetUserSales(user.id)

  return (
    <div>
      <SaleList sales={sales} />
    </div>
  )
}
