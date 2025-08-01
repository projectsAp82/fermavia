import { prisma } from "@/lib/prisma"

export async function getUserProducts(userId: string) {
  return prisma.product.findMany({
    where: { userId },
    orderBy: { name: 'asc' }
  })
}
