import { PackageStatusOptions } from "./PackageStatus.ts";

export interface RawPackage {
    id: number
    status: PackageStatusOptions
    ham_price?: string
    date_creation?: Date
    date_confirmed?: Date
    date_received?: Date
    date_closing?: Date
    shipping_cost?: string
}

export interface RawPackageUpdate {
    status?: PackageStatusOptions
    ham_price?: string
    date_creation?: Date
    date_confirmed?: Date
    date_received?: Date
    date_closing?: Date
    shipping_cost?: string
}

export interface Package {
    id: number
    status: PackageStatusOptions
    hamPrice?: string
    dateCreation?: Date
    dateConfirmed?: Date
    dateReceived?: Date
    dateClosing?: Date
    shippingCost?: string
}

export interface PackageUpdate {
    status?: PackageStatusOptions
    hamPrice?: number
    dateCreation?: Date
    dateConfirmed?: Date
    dateReceived?: Date
    dateClosing?: Date
    shippingCost?: number
}
