import { defineStore } from "pinia";

export const useCustomerStore = () => {
    const customerStore = defineStore('customer',{
        state: () => ({
            list: [] as number[]
        }),
        actions: {
            fetchCustomers() {
                this.list = [1]
            }
        }
    })
    const store = customerStore()
    if (store.list === null) {
        store.fetchCustomers()
    }
    return store
}

