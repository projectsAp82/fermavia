import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireUser } from '@/lib/checkUser'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireUser()
    const productId = params.id

    // Vérifie si le produit appartient bien à l'utilisateur connecté
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
        userId: user.id
      }
    })

    if (!product) {
      return new NextResponse('Produit non trouvé ou accès interdit', { status: 404 })
    }

    await prisma.product.delete({
      where: { id: productId }
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[PRODUCT_DELETE_ERROR]', err)
    return new NextResponse('Erreur serveur', { status: 500 })
  }
}
