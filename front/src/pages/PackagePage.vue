<template>

  <template v-if="currentPackage">

    <the-hero :status="currentPackage.status"
              :title="titlePage"
              :subtitle="subtitlePage"/>

    <opened-package v-if="currentPackage.status === PackageStatusOptions.Opened || currentPackage.status === PackageStatusOptions.OnTheWay"
                    :packageData="currentPackage"/>

    <pending-package v-if="currentPackage.status === PackageStatusOptions.Pending"
                     :packageData="currentPackage"/>

    <closed-package v-if="currentPackage.status === PackageStatusOptions.Closed"
                    :packageData="currentPackage"
                    @order-update="handleOrderUpdate"/>

  </template>

</template>

<script setup lang="tsx">
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

import {format} from "date-fns";
import {es} from "date-fns/locale";

import {usePackageStore} from "../store/packages.ts";
import type {Customer} from "../types/Customer.ts";
import type {ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";
import type {PackageOrder} from "../types/PackageOrder.ts";
import {PackageStatusOptions} from "../types/PackageStatus.ts";

import TheHero from "@components/shared/TheHero.vue";
import ClosedPackage from "./ClosedPackage.vue";
import OpenedPackage from "./OpenedPackage.vue";
import PendingPackage from "./PendingPackage.vue";

const route = useRoute()
const router = useRouter()
const packageStore = usePackageStore()

const currentPackage = ref<ResponsePackageDetail>()

async function fetchPackageDetail() {
  const packageData = await packageStore.fetchPackageDetail(route.params.packageId as string)
  if (!packageData) {
    await router.push({name: 'home'})
    return
  }
  currentPackage.value = packageData
}

fetchPackageDetail()

const titlePage = computed(() => {
  if (!currentPackage.value) return 'Paquete no encontrado'
  if (currentPackage.value.status === PackageStatusOptions.Opened) {
    return 'Pedido activo'
  }
  if (currentPackage.value.status === PackageStatusOptions.OnTheWay) {
    return 'Pedido en camino'
  }
  if (currentPackage.value.status === PackageStatusOptions.Pending) {
    return 'Pendiente de pago'
  }
  return format(currentPackage.value.dateReceived!, 'LLLL yyyy', {locale: es})
})

const subtitlePage = computed(() => {
  let subtitle = `${currentPackage.value?.orders.length} pedidos`
  const totalLines = packageStore.totalPackagesOrdersLines(currentPackage.value?.id || 0)
  subtitle += ` - ${totalLines} Jamones`
  return subtitle
})

function handleOrderUpdate(customer: Customer) {
  console.log(customer.customerId)
  currentPackage?.value?.orders?.map((item: PackageOrder) => {
    if (item.customerId === customer.customerId) {
      item.name = 'Antonio'
    }
  })
}
</script>
