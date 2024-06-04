<template>

  <LoadingLottie v-if="isLoading">
    Cargando datos del paquete...
  </LoadingLottie>

  <template v-else-if="currentPackage">

    <the-hero :status="currentPackage?.status"/>

    <opened-package v-if="currentPackage.status === PackageStatusOptions.Opened"
                    :packageData="currentPackage"/>

    <closed-package v-if="currentPackage.status === PackageStatusOptions.Closed"
                    :packageData="currentPackage"
                    @order-update="handleOrderUpdate"/>

  </template>
  <template v-else>
    Paquete con el ID {{ route.params.packageId }} no encontrado
  </template>
</template>

<script setup lang="tsx">
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import {usePackageStore} from "../store/packages.ts";
import type {Customer} from "../types/Customer.ts";
import type {ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";
import type {PackageOrder} from "../types/PackageOrder.ts";
import {PackageStatusOptions} from "../types/PackageStatus.ts";

import TheHero from "@components/shared/TheHero.vue";
import ClosedPackage from "./ClosedPackage.vue";
import OpenedPackage from "./OpenedPackage.vue";
import LoadingLottie from "@components/shared/LoadingLottie.vue";

const route = useRoute()
const packageStore = usePackageStore()

const isLoading = computed(() => packageStore.loadingPackages)
const currentPackage = ref<ResponsePackageDetail | undefined>(undefined)

async function fetchPackageDetail() {
  currentPackage.value = await packageStore.fetchPackageDetail(route.params.packageId as string)
}

fetchPackageDetail()

function handleOrderUpdate(customer: Customer) {
  console.log(customer.customerId)
  currentPackage?.value?.orders?.map((item: PackageOrder) => {
    if (item.customerId === customer.customerId) {
      item.name = 'Antonio'
    }
  })
}
</script>
