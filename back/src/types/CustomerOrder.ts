import { RawOrder, Order } from "./Order.ts";
import { RawCustomer, Customer } from "./Customer.ts";
import { OrderLine, RawOrderLine } from "./OrderLine.ts";

export interface RawCustomerOrder extends RawOrder, RawCustomer {
    lines?: RawOrderLine[]
}
export interface CustomerOrder extends Order, Customer {
    lines?: OrderLine[]
}
