<template>
  <the-notification/>
  <main :class="oPageCSSM.oPage">
    <LoadingLottie v-if="loadingPackages || loadingCustomers"/>
    <router-view v-else/>
  </main>
  <OverlayController />
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {usePackageStore} from "./store/packages.ts";
import {useCustomerStore} from "./store/customers.ts";

import OverlayController from '@components/shared/OverlayController.vue';
import TheNotification from "@components/ui/TheNotification.vue";
import LoadingLottie from "@components/shared/LoadingLottie.vue";

import oPageCSSM from '@css/objects/o-page.module.css'

const packageStore = usePackageStore()
const customerStore = useCustomerStore()


packageStore.fetchAllPackageDetails()
customerStore.fetchCustomers()

const loadingPackages = computed(() => packageStore.loadingPackages)
const loadingCustomers = computed(() => customerStore.loadingCustomers)

</script>

<style>
#app {
  display: grid;
  grid-template-columns: var(--page-max-width);
  justify-content: center;
  padding: var(--spacing-rem-md) 0;

  --product-color: var(--color-brand-ham);
  & > main {
    background-color: #fff;
  }
}
</style>
