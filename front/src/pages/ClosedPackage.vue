<template>

  <TheBanner title="Este pedido está cerrado"
             symbol="lock"
             reverse-border
             soft>
    Todos los pedidos están pagados y revisados, no se puede volver a editar.
  </TheBanner>

  <OrdersList :package-orders="packageOrders"
              :ham-price="packageData.hamPrice"
              @click-order="viewCustomerOrder">
    <template #subtitle="{ customerId }">
      <b>{{ customerId }} - 900€ - </b> 3 Jamones
    </template>
    <template #value="{ paid }">
      <b :class="colorCSSM.fontProduct">
        {{ paid ? 'Pagado' : 'Pendiente' }}
      </b>
    </template>
  </OrdersList>

  <closed-package-details else :package="packageData"/>
</template>

<script setup lang="tsx">
import type {Package} from "../types/Package.ts";
import type {PackageOrder} from "../types/PackageOrder.ts";

import ClosedPackageDetails from "@components/ham/ClosedPackageDetails.vue";
import TheBanner from "@components/shared/TheBanner.vue";
import OrdersList from "@components/ham/OrdersList.vue";
import colorCSSM from "@css/utilities/colors.module.css";

interface Props {
  packageData: Package
  packageOrders: PackageOrder[]
}

defineProps<Props>()

interface Emits {
  (ev: 'order-update', result: PackageOrder): void
}

const emit = defineEmits<Emits>()


function viewCustomerOrder(order: PackageOrder) {
  emit('order-update', order)
}
</script>
