import { prisma } from '@/lib/prisma'
import { requireUser } from '@/lib/checkUser'

export async function POST(req: Request) {

  const user = await requireUser();

  const body = await req.json()

  const { title, description, deadline, dateLivraison, produits } = body

  try {
    const sale = await prisma.sale.create({
      data: {
        title,
        description,
        deadline: new Date(deadline),
        dateLivraison: new Date(dateLivraison),
        userId: user.id,
        saleProducts: {
          create: produits.map((p: { productId: string, stock: number | null, price: Number }) => ({
            product: {
                connect: {id: p.productId}
            },
            maxDispo: p.stock,
            price: p.price
          }))
        }
      }
    })

    return Response.json({ success: true, saleId: sale.id })
  } catch (error) {
    console.error('Erreur lors de la création de la vente :', error)
    return new Response('Erreur lors de la création', { status: 500 })
  }
}
