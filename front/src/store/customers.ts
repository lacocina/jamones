import { defineStore } from "pinia";
import {api} from "../services/api.ts";
import {Customer} from "../types/Customer.ts";

export const useCustomerStore = () => {
    const customerStore = defineStore('customer',{
        state: () => ({
            customers: [] as Customer[],
            loading: true,
            error: null as any | null,
        }),
        getters: {
          getCustomers : ({ customers } : {customers: Customer[]}) : Customer[] => customers
        },
        actions: {
            async fetchCustomers() {
                try {
                    const { data } = await api.get('/customers')
                    this.customers.splice(0, this.customers.length, ...data);
                } catch (e) {
                    console.error('fetchCustomers: ', e)
                    this.error = e
                } finally {
                    this.loading = false
                }
            }
        }
    })
    const store = customerStore()
    if (store.customers?.length === 0) {
        store.fetchCustomers()
    }
    return store
}

