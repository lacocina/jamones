export interface RawOrderLine {
    id: number
    order_id: number
    weight?: number
}

export interface OrderLine {
    id: number
    orderId: number
    weight?: number
}
