export interface RawCustomer {
    customer_id: number
    name: string
    last_name?: string
    customer_alias?: string
}

export interface Customer {
    customerId: number
    name: string
    lastName?: string
    customerAlias?: string
}

