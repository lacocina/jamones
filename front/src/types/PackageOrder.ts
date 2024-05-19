import { Order } from "./Order.ts";
import { Customer } from "./Customer.ts";

export interface PackageOrder extends Order, Customer {}
