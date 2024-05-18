import { PackageStatusOptions } from "./PackageStatus.ts";

export interface RawPackage {
    id: number
    status: PackageStatusOptions
    ham_price?: number
    date_creation?: Date
    date_confirmed?: Date
    date_received?: Date
    date_closing?: Date
    shipping_cost?: number
}
export interface Package {
    id: number
    status: PackageStatusOptions
    hamPrice?: number
    dateCreation?: Date
    dateConfirmed?: Date
    dateReceived?: Date
    dateClosing?: Date
    shippingCost?: number
}
