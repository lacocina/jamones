export interface RawOrderLine {
    id: number
    packageId: number
    order_id?: number
    weight?: number
    price?: number
}

export interface OrderLine {
    id: number
    packageId?: number
    orderId?: number
    weight?: number
    price?: number
}
