export interface RawOrder {
    order_id: number
    package_id: number
    customer_id: number
    note?: string
}

export interface Order {
    orderId: number
    packageId: number
    customerId: number
    note?: string
}
