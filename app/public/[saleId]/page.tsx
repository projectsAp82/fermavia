import PublicSaleHeader from "@/components/ui/public/PublicSaleHeader"
import { notFound } from "next/navigation"
import { GetSaleById } from "@/lib/data/sales"
import PublicSaleClient from "@/components/ui/public/publicSaleClient";



export default async function PublicSalePage({ params }: {params: Promise<{saleId: string}>}) {

  const { saleId } = await params;
  const sale = await GetSaleById(saleId)
  if (!sale) return notFound()

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      <PublicSaleHeader sale={sale} />
      <PublicSaleClient saleProducts={sale.saleProducts} saleId={saleId} />
    </div>
  )
}
