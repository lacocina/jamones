import {OrderLine} from "./OrderLine.ts";

export interface Order {
    orderId: number
    packageId: number
    customerId: number
    paid: boolean
    lines: OrderLine[]
    note?: string
}

