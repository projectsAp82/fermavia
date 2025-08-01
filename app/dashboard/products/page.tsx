import { requireUser } from '@/lib/checkUser'
import { getUserProducts } from '@/lib/data/products'
import ProductList from '@/components/ui/products/ProdctList'

export default async function ProductsPage() {
  const user = await requireUser()
  const products = await getUserProducts(user.id)

  return (
    <div className="space-y-4">
      <ProductList initialProducts={products} />
    </div>
  )
}
