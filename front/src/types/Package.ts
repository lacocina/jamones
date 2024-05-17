import type { PackageStatusOptions } from "./PackageStatus.ts";

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
