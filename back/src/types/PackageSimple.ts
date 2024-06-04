import { PackageStatusOptions } from "./PackageStatus.ts";

export interface RawPackageSimple {
    id: number
    status: PackageStatusOptions
    ham_price?: string
    date_creation?: Date
    date_confirmed?: Date
    date_received?: Date
    date_closing?: Date
    shipping_cost?: string
}

export interface RawPackageSimpleUpdate {
    status?: PackageStatusOptions
    ham_price?: string
    date_creation?: Date
    date_confirmed?: Date
    date_received?: Date
    date_closing?: Date
    shipping_cost?: string
}

export interface PackageSimple {
    id: number
    status: PackageStatusOptions
    hamPrice?: string
    dateCreation?: Date
    dateConfirmed?: Date
    dateReceived?: Date
    dateClosing?: Date
    shippingCost?: string
}

export interface PackageSimpleUpdate {
    status?: PackageStatusOptions
    hamPrice?: number
    dateCreation?: Date
    dateConfirmed?: Date
    dateReceived?: Date
    dateClosing?: Date
    shippingCost?: number
}
