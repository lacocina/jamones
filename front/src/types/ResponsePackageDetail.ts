import { Package } from "./Package.ts";
import { PackageOrder } from "./PackageOrder.ts";
export interface ResponsePackageDetail extends Package {
    orders: PackageOrder[]
}
