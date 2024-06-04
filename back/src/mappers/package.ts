import {Package, RawPackage} from "../types/Package.ts";
import {CustomerOrder, RawCustomerOrder} from "../types/CustomerOrder.ts";
import {OrderLine, RawOrderLine} from "../types/OrderLine.ts";

export function packageToResponseMapper(packageParam: RawPackage): Package {
    return {
        id: packageParam.id,
        status: packageParam.status,
        hamPrice: packageParam.ham_price,
        dateCreation: packageParam.date_creation,
        dateConfirmed: packageParam.date_confirmed,
        dateReceived: packageParam.date_received,
        dateClosing: packageParam.date_closing,
        shippingCost: packageParam.shipping_cost,
        orders: packageParam.orders?.map(customerOrderToResponseMapper)
    }
}

export function customerOrderToResponseMapper(customerOrder: RawCustomerOrder): CustomerOrder {
    return {
        orderId: customerOrder.order_id,
        packageId: customerOrder.package_id,
        customerId: customerOrder.customer_id,
        note: customerOrder.note,
        name: customerOrder.name,
        lastName: customerOrder.last_name,
        customerAlias: customerOrder.customer_alias,
        lines: customerOrder.lines?.map(orderLineToResponseMapper)
    }
}

export function orderLineToResponseMapper(orderLine: RawOrderLine): OrderLine {
    return {
        id: orderLine.id,
        orderId: orderLine.order_id,
        weight: orderLine.weight
    }
}
