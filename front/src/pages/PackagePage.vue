<template>

  <LoadingLottie v-if="isLoading" :class="uPadding.bottomXl">
    Cargando datos del paquete...
  </LoadingLottie>

  <template v-else-if="packageData && packageOrders">

    <the-hero :status="packageData.status"/>

    <opened-package v-if="packageData.status === PackageStatusOptions.Opened"
                    :packageOrders="packageOrders"
                    :packageData="packageData"/>

    <closed-package v-if="packageData.status === PackageStatusOptions.Closed"
                    :packageOrders="packageOrders"
                    :packageData="packageData"
                    @order-update="handleOrderUpdate"/>

  </template>
  <template v-else>
    Paquete con el ID {{ route.params.packageId }} no encontrado
  </template>
</template>

<script setup lang="tsx">
import {computed, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {usePackageStore} from "../store/packages.ts";
import type {Customer} from "../types/Customer.ts";
import type {ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";
import type {Package} from "../types/Package.ts";
import type {PackageOrder} from "../types/PackageOrder.ts";
import {PackageStatusOptions} from "../types/PackageStatus.ts";

import TheHero from "@components/shared/TheHero.vue";
import ClosedPackage from "./ClosedPackage.vue";
import OpenedPackage from "./OpenedPackage.vue";
import LoadingLottie from "@components/shared/LoadingLottie.vue";

import uPadding from '@css/utilities/u-padding.module.css'

const route = useRoute()
const packageStore = usePackageStore()

const isLoading = computed(() => packageStore.loadingPackages)
const packageOrders = reactive<PackageOrder[]>([])
const packageData = ref<Package>()

async function getPackageDetail() {
  try {
    const { data } : { data : ResponsePackageDetail} = await packageStore.fetchPackageDetail(route.params.packageId as string)
    const { orders, ...responsePackageData } = data
    packageOrders.splice(0, packageOrders.length, ...orders)
    packageData.value = responsePackageData
  } catch (e) {
    console.error(e)
  }
}

getPackageDetail()

function handleOrderUpdate(customer: Customer) {
  console.log(customer.customerId)
  packageOrders?.map((item: PackageOrder) => {
    if (item.customerId === customer.customerId) {
      item.name = 'Antonio'
    }
  })
}
</script>
