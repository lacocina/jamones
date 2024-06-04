import { defineStore } from "pinia";
import {api} from "../services/api.ts";
import {Customer} from "../types/Customer.ts";
import {computed, ref} from "vue";

export const useCustomerStore = defineStore('customer',() => {
    const customers = ref<Customer[]>([])
    const loading = ref<boolean>(true)
    const error = ref<any | null>(null)

    const loadingCustomers = computed(() => loading.value)
    const customersList = computed(() => customers.value)

    async function fetchCustomers() {
        try {
            const { data } = await api.get('/customers')
            customers.value.splice(0, customers.value.length, ...data);
        } catch (e) {
            console.error('fetchCustomers: ', e)
            error.value = e
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        error,
        loadingCustomers,
        customersList,
        fetchCustomers
    }
})
