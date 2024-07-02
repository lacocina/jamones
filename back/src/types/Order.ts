export interface RawOrder {
    order_id: number
    package_id: number
    customer_id: number
    paid: boolean
    pre_lines: number
    note?: string
}

export interface Order {
    orderId: number
    packageId: number
    customerId: number
    paid: boolean
    preLines: number
    note?: string
}
