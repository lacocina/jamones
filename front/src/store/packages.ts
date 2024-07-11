import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {api} from "../services/api.ts";
import {ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";
import {useNotification} from "@kyvg/vue3-notification";
import {PackageOrder} from "../types/PackageOrder.ts";

export const usePackageStore = defineStore('packages', () => {
    const allPackageDetails = ref<ResponsePackageDetail[]>([])
    const loading = ref<boolean>(true)
    const error = ref<any | null>(null)

    const loadingPackages = computed(() => loading.value)
    const currentPackage = computed(() => {
        return allPackageDetails.value
            .find((item: ResponsePackageDetail) => !(!!item.dateClosing))
    })
    const closedPackages = computed(() => allPackageDetails.value.filter((item: ResponsePackageDetail) => !!item.dateClosing))
    const totalPackagesOrdersLines = computed(() =>
        (packageId: number) => {
            return allPackageDetails.value
                .find((item: ResponsePackageDetail) => item.id === packageId)
                ?.orders.reduce((acc, order) => acc + (order.preLines), 0)
                || 0
    })

    async function fetchAllPackageDetails() {
        try {
            const { data } : { data: ResponsePackageDetail[] } = await api.get('/packages/list')
            await new Promise(resolve => setTimeout(resolve, 2000))
            allPackageDetails.value = data
        } catch (e) {
            console.error('fetchPackages: ', e)
            error.value = e
        } finally {
            loading.value = false
        }
    }

    async function fetchPackageDetail(id: string) : Promise<ResponsePackageDetail | any> {
        const { notify } = useNotification()
        let targetPackage = allPackageDetails.value.find((item: ResponsePackageDetail) => item.id.toString() === id)
        if (targetPackage) return targetPackage

        notify({
            title: 'Error',
            text: 'No se encontró el paquete con el identificador ' + id,
            type: 'error'
        })
        return null
    }

    async function updateOrder(
        { packageId, customerId, lines }: { packageId: number, customerId: number, lines: number }
    ) {
        const { data } : { data: PackageOrder } = await api.post('/packages/updateNumberOrderLines', {
            packageId,
            customerId,
            lines
        })

        const targetPackage = allPackageDetails.value.find((item: ResponsePackageDetail) => item.id === packageId)
        if (!targetPackage) {
            throw new Error('No se encontró el paquete con el identificador ' + packageId)
        }

        const orderIndex = targetPackage.orders.findIndex((item: PackageOrder) => item.customerId === customerId)

        if (orderIndex !== -1) {
            targetPackage.orders[orderIndex] = data
        } else if (targetPackage) {
            targetPackage.orders.push(data)
        }
    }

    async function deleteOrder(
        { orderId }: { orderId: number }
    ) {
        await api.delete(`/packages/order/${orderId}`)
        const targetPackage = allPackageDetails.value.find((pack) => {
            return pack.id === currentPackage.value?.id
        })

        if (targetPackage) {
            const orderIndex = targetPackage?.orders.findIndex(order => order.orderId === orderId)
            targetPackage?.orders.splice(orderIndex, 1)
        }
    }

    return {
        loading,
        error,
        loadingPackages,
        allPackageDetails,
        closedPackages,
        totalPackagesOrdersLines,
        currentPackage,
        fetchPackageDetail,
        fetchAllPackageDetails,
        updateOrder,
        deleteOrder
    }
})
