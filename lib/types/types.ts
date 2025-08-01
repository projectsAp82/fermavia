export type Sale = {
    id: string
    userId: string
    user: {id: string}
    title: string
    description?: string
    deadline: Date
    status: 'ACTIVE' | 'CLOSED'
    saleProducts: {id: string}[]
    createdAt: Date
    orders: {id: string}[]
    dateLivraison: Date
}