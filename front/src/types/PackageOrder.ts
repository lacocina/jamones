import { Order } from "./Order.ts";
import { Customer } from "./Customer.ts";
import {OrderLine} from "./OrderLine.ts";

export interface PackageOrder extends Order, Customer {
    lines: OrderLine[]
}
