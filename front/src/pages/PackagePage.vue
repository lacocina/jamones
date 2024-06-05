<template>

  <template v-if="currentPackage">

    <the-hero :status="currentPackage.status"/>

    <opened-package v-if="currentPackage.status === PackageStatusOptions.Opened"
                    :packageData="currentPackage"/>

    <closed-package v-if="currentPackage.status === PackageStatusOptions.Closed"
                    :packageData="currentPackage"
                    @order-update="handleOrderUpdate"/>

  </template>

</template>

<script setup lang="tsx">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";

import {usePackageStore} from "../store/packages.ts";
import type {Customer} from "../types/Customer.ts";
import type {ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";
import type {PackageOrder} from "../types/PackageOrder.ts";
import {PackageStatusOptions} from "../types/PackageStatus.ts";

import TheHero from "@components/shared/TheHero.vue";
import ClosedPackage from "./ClosedPackage.vue";
import OpenedPackage from "./OpenedPackage.vue";

const route = useRoute()
const router = useRouter()
const packageStore = usePackageStore()

const currentPackage = ref<ResponsePackageDetail>()

async function fetchPackageDetail() {
  const packageData = await packageStore.fetchPackageDetail(route.params.packageId as string)
  if (!packageData) await router.push({name: 'home'})
  currentPackage.value = packageData
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
