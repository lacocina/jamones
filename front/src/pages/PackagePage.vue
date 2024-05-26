<template>
  <template v-if="packageData">

    <the-hero :status="packageData.status"/>

    <opened-package v-if="packageData.status === PackageStatusOptions.Opened"
                    :packageOrders="packageOrders"
                    :packageData="packageData"
                    @order-update="handleOrderUpdate"/>

    <closed-package v-if="packageData.status === PackageStatusOptions.Closed"
                    :packageOrders="packageOrders"
                    :packageData="packageData"
                    @order-update="handleOrderUpdate"/>

  </template>

  <template else>
    Loading
  </template>
</template>

<script setup lang="tsx">
import {ref} from "vue";
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

const packageOrders = ref<PackageOrder[]>([])
const packageData = ref<Package>()

async function fetchPackageDetail() {
  try {
    const { data } : { data: ResponsePackageDetail } = await api.get(`packages/${route.params.packageId}`)
    const { orders, ...responsePackageData } = data
    packageOrders.value = orders
    packageData.value = responsePackageData
  } catch (e) {
    console.error(e)
  }
}

fetchPackageDetail()

function handleOrderUpdate(order: PackageOrder) {
  packageOrders.value.map((item: PackageOrder) => {
    if (item.orderId === order.orderId) {
      item.name = 'Antonio'
    }
  })
}
</script>
