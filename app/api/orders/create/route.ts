// /app/api/orders/create/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("Body recu : ", body)
    const { saleId, buyerName, buyerEmail, buyerComment, items } = body

    if (!saleId || !buyerName || !buyerEmail || !items || items.length === 0) {
      return NextResponse.json({ error: "Données incomplètes" }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: {
        saleId,
        buyerName,
        buyerEmail,
        buyerComment,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtOrder: item.price,
          }))
        }
      },
      include: {
        items: true,
      }
    })

    return NextResponse.json(order, { status: 201 })

  } catch (err) {
    console.error("Erreur création commande :", err)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
