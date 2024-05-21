export interface Order {
    orderId: number
    packageId: number
    customerId: number
    paid: boolean
    note?: string
}

