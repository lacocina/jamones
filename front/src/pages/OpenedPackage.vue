<template>

  <orders-list :package-orders="packageOrders"
               :ham-price="packageData.hamPrice"
               @click-order="editCustomerOrder">
    <template #subtitle="{ customerId }">
      Precio aprox: <b>{{ customerId }}</b>
    </template>
    <template #value>
      <b :class="[colorCSSM.fontProduct, textCSSM.sizeBig]">
        3
      </b>
    </template>
  </orders-list>

  <price-banner :package-id="packageData.id"
                v-model.number="packageData.hamPrice"/>

  <shipping-banner :package-id="packageData.id"
                   v-model.number="packageData.shippingCost"/>

  <the-banner title="¿Ya está todo listo?"
              button-text="Confirmar pedido"
              disabled
              disabled-message="Falta añadir medio jamón"
              soft>
    Si ya está todo preparado para pedir puedes continuar para indicar que el pedido está de camino.
  </the-banner>
</template>

<script setup lang="tsx">
import {useOverlay} from "@composables/useOverlay.ts";
import type {Package} from "../types/Package.ts";
import type {PackageOrder} from "../types/PackageOrder.ts";
import type {Customer} from "../types/Customer.ts";
import {ClosedModal} from "../types/ClosedModal.ts";

import PriceBanner from "@components/ham/PriceBanner.vue";
import ShippingBanner from "@components/ham/ShippingBanner.vue";
import TheBanner from "@components/shared/TheBanner.vue";
import CustomerOrderDialog from "@components/ham/CustomerOrderDialog.vue";
import OrdersList from "@components/ham/OrdersList.vue";

import colorCSSM from "@css/utilities/colors.module.css";
import textCSSM from "@css/utilities/text.module.css";

const { open } = useOverlay()
interface Props {
  packageData: Package
  packageOrders: PackageOrder[]
}

defineProps<Props>()

async function editCustomerOrder(order: PackageOrder) {
  const customer: Customer = {
    name: order.name,
    customerId: order.customerId
  }
  try {
    const response = await open(<CustomerOrderDialog customer={ customer }/>)
    console.log(response)
  } catch (e) {
    if (e !== ClosedModal) {
      console.log('Err')
    }
  }
}

</script>
