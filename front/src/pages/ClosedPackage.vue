<template>

  <TheBanner title="Este pedido está cerrado"
             symbol="lock"
             reverse-border
             soft>
    Todos los pedidos están pagados y revisados, no se puede volver a editar.
  </TheBanner>

  <OrdersList :package-orders="notEmptyOrders"
              :ham-price="packageData.hamPrice"
              @click-order="viewCustomerOrder">
    <template #subtitle="{ lines }">
      <b>{{ lines?.length }} líneas {{ formatNumber(900) }}</b>
    </template>
    <template #value="{ paid }">
      <b :class="colorCSSM.fontProduct">
        {{ paid ? 'Pagado' : 'Pendiente' }}
      </b>
    </template>
  </OrdersList>

  <closed-package-details :package="packageData"/>
</template>

<script setup lang="tsx">
import {computed} from "vue";
import { formatNumber } from "../utils/format-numbers.ts";
import type {PackageOrder} from "../types/PackageOrder.ts";
import type {ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";

import ClosedPackageDetails from "@components/ham/ClosedPackageDetails.vue";
import TheBanner from "@components/shared/TheBanner.vue";
import OrdersList from "@components/ham/OrdersList.vue";

import colorCSSM from "@css/utilities/colors.module.css";

interface Props {
  packageData: ResponsePackageDetail
}

const props = defineProps<Props>()

const notEmptyOrders = computed(() => props.packageData.orders.filter((order: PackageOrder) => order.lines?.length))

interface Emits {
  (ev: 'order-update', result: PackageOrder): void
}

const emit = defineEmits<Emits>()


function viewCustomerOrder(order: PackageOrder) {
  emit('order-update', order)
}
</script>
