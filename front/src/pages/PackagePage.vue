<template>
  <template v-if="packageData">

    <the-hero :status="packageData.status"/>

    <component :is="packageByStatus"
               :packageOrders="packageOrders"
               :packageData="packageData"/>

  </template>

  <template else>
    Loading
  </template>
</template>

<script setup lang="tsx">
import {markRaw, ref, shallowRef} from "vue";
import {useRoute} from "vue-router";
import {api} from "../services/api.ts";
import {ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";
import {Package} from "../types/Package.ts";
import {PackageOrder} from "../types/PackageOrder.ts";
import {PackageStatusOptions} from "../types/PackageStatus.ts";

import TheHero from "@components/shared/TheHero.vue";
import ClosedPackage from "./ClosedPackage.vue";
import OpenedPackage from "./OpenedPackage.vue";

const route = useRoute()

const packageByStatus = shallowRef()
const packageOrders = ref<PackageOrder[]>([])
const packageData = ref<Package>()

async function fetchPackageDetail() {
  try {
    const { data } : { data: ResponsePackageDetail } = await api.get(`packages/${route.params.packageId}`)
    const { orders, ...responsePackageData } = data
    packageOrders.value = orders
    packageData.value = responsePackageData
    if (packageData.value?.status === PackageStatusOptions.Opened) packageByStatus.value = OpenedPackage
    if (packageData.value?.status === PackageStatusOptions.Closed) packageByStatus.value = ClosedPackage
  } catch (e) {
    console.error(e)
  }
}

fetchPackageDetail()

</script>
