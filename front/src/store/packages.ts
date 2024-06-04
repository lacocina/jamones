import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {api} from "../services/api.ts";
import {Package} from "../types/Package.ts";
import {ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";

export const usePackageStore = defineStore('packages', () => {
    const packageList = ref<Package[]>([])
    const packageDetails = ref<ResponsePackageDetail[]>([])
    const allPackageDetails = ref<ResponsePackageDetail[]>([])
    const loading = ref<boolean>(true)
    const error = ref<any | null>(null)

    const loadingPackages = computed(() => loading.value)
    const currentPackage = computed(() => packageList.value.find((item: Package) => !(!!item.dateClosing)))
    const closedPackages = computed(() => packageList.value.filter((item: Package) => !!item.dateClosing))

    async function fetchPackageList() {
        if (!packageList.value.length) {
            try {
                const { data } = await api.get('/packages/list')
                await new Promise(resolve => setTimeout(resolve, 2000))
                packageList.value = data
            } catch (e) {
                console.error('fetchPackages: ', e)
                error.value = e
            } finally {
                loading.value = false
            }
        }
    }

    async function fetchAllPackageDetails() {
        try {
            const { data } = await api.get('/packages/list-details')
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
        const targetPackage = packageDetails.value.find((item: ResponsePackageDetail) => item.id.toString() === id)
        if (targetPackage) {
            return { data: targetPackage }
        }
        loading.value = true
        try {
            const { data } : { data: ResponsePackageDetail } = await api.get(`packages/${id}`)
            await new Promise(resolve => setTimeout(resolve, 2000))
            packageDetails.value.push(data)
            return { data }
        } catch (e) {
            console.error(e)
            return e
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        error,
        loadingPackages,
        closedPackages,
        currentPackage,
        fetchPackageList,
        fetchPackageDetail,
        fetchAllPackageDetails
    }
})
