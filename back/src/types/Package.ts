import { PackageStatusOptions } from "./PackageStatus.ts";
import { CustomerOrder, RawCustomerOrder } from "./CustomerOrder.ts";

export type RawPackage = {
    id: number
    status: PackageStatusOptions
    ham_price?: string
    date_creation?: Date
    date_confirmed?: Date
    date_received?: Date
    date_closing?: Date
    shipping_cost?: string
    orders?: RawCustomerOrder[]
}

export type Package = {
    id: number
    status: PackageStatusOptions
    hamPrice?: string | number
    dateCreation?: Date
    dateConfirmed?: Date
    dateReceived?: Date
    dateClosing?: Date
    shippingCost?: string | number
    orders?: CustomerOrder[]
}
