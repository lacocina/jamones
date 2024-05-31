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
import {reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {api} from "../services/api.ts";
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

const isLoading = ref(true)
const packageOrders = reactive<PackageOrder[]>([])
const packageData = ref<Package>()

async function fetchPackageDetail() {
  try {
    const { data } : { data: ResponsePackageDetail } = await api.get(`packages/${route.params.packageId}`)
    const { orders, ...responsePackageData } = data
    await new Promise(resolve => setTimeout(resolve, 1000))
    packageOrders.splice(0, packageOrders.length, ...orders)
    packageData.value = responsePackageData
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

fetchPackageDetail()

function handleOrderUpdate(customer: Customer) {
  console.log(customer.customerId)
  packageOrders?.map((item: PackageOrder) => {
    if (item.customerId === customer.customerId) {
      item.name = 'Antonio'
    }
  })
}
</script>
