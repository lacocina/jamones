import type { CustomerOrder } from "./CustomerOrder.ts";
import type { PackageStatusOptions } from "./PackageStatus.ts";

export interface Package {
    id: number
    hamPrice: number
    customerOrders: CustomerOrder[]
    status: PackageStatusOptions
    creationDate: Date
    closingDate?: Date
    shippingPrice?: number
}
