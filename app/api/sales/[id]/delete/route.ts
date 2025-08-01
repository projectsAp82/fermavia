import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/checkUser'

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { params } = context

  try {
    const user = await requireUser()

    const sale = await prisma.sale.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!sale || sale.userId !== user.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
    }

    await prisma.sale.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[DELETE SALE]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
