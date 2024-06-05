import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {api} from "../services/api.ts";
import {ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";
import {useRouter} from "vue-router";
import {useNotification} from "@kyvg/vue3-notification";

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
    const getPackageById = computed(() => (id: string) => allPackageDetails.value.find((item: ResponsePackageDetail) => item.id.toString() === id))

    async function fetchAllPackageDetails() {
        try {
            const { data } = await api.get('/packages/list')
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
        const router = useRouter()
        const { notify } = useNotification()
        let targetPackage = allPackageDetails.value.find((item: ResponsePackageDetail) => item.id.toString() === id)
        if (targetPackage) return targetPackage

        await router.push({ name: 'home'})
        notify({
            title: 'Error',
            text: 'No se encontró el paquete con el identificador ' + id,
        })
        return null
    }

    return {
        loading,
        error,
        loadingPackages,
        allPackageDetails,
        closedPackages,
        currentPackage,
        getPackageById,
        fetchPackageDetail,
        fetchAllPackageDetails
    }
})
