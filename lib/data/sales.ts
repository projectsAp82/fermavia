import { prisma } from "@/lib/prisma"

export async function GetUserSales(userId: string) {
  return prisma.sale.findMany({
    where: { userId },
    include:{
        orders: true,
    },
    orderBy: { 
        deadline: 'desc', 
    }
  })
}

export async function GetSaleById(id: string){
  return prisma.sale.findUnique({
    where: { id },
    include: {
      orders: true,
      saleProducts : {
        include: {
          product: true
        }
      }
    }
  })
}
