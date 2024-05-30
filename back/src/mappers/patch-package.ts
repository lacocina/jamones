import {Package, PackageUpdate, RawPackageUpdate} from "../types/Package.ts";

export const patchPackageToDbMapper = (packageParam: Package) : RawPackageUpdate => {
    return {
        status: packageParam.status,
        ham_price: packageParam.hamPrice,
        date_creation: packageParam.dateCreation,
        date_confirmed: packageParam.dateConfirmed,
        date_received: packageParam.dateReceived,
        date_closing: packageParam.dateClosing,
        shipping_cost: packageParam.shippingCost
    }
}

export const patchPackageToResponseMapper = (packageParam: RawPackageUpdate) : PackageUpdate => {
    return {
        status: packageParam.status,
        hamPrice: parseFloat(packageParam.ham_price),
        dateCreation: packageParam.date_creation,
        dateConfirmed: packageParam.date_confirmed,
        dateReceived: packageParam.date_received,
        dateClosing: packageParam.date_closing,
        shippingCost: parseFloat(packageParam.shipping_cost)
    }
}
