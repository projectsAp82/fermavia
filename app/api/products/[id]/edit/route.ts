import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireUser } from '@/lib/checkUser'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireUser()
    const productId = params.id
    const body = await req.json()
    const { name, price, unit } = body

    // Vérifie que le produit appartient à l'utilisateur
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId, userId: user.id }
    })

    if (!existingProduct) {
      return new NextResponse('Produit introuvable ou accès interdit', { status: 404 })
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        price,
        unit
      }
    })

    return NextResponse.json(updatedProduct)
  } catch (err) {
    console.error('[PRODUCT_EDIT_ERROR]', err)
    return new NextResponse('Erreur serveur', { status: 500 })
  }
}
