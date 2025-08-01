// app/api/products/create/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireUser } from '@/lib/checkUser'

export async function POST(req: Request) {
  try {
    const user = await requireUser()
    const body = await req.json()

    const { name, price, unit } = body

    if (!name || !price || !unit) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        unit,
        userId: user.id,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('[PRODUCT_CREATE_ERROR]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
