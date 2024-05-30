<template>

  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">

    <list-box title="Pedidos de los clientes" description="Jamones" default-color>
      <button v-for="customer in packageOrders"
              :key="customer.customerId" type="button"
              @click="editCustomerOrder(customer)"
              :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
        <div :class="oStackCSSM.xxs">
          <h2>{{ customer.name }}</h2>
          <div :class="textCSSM.sizeSmall">
              <span :class="[textCSSM.light, colorCSSM.fontSoft]">
                Precio aprox: <b>{{ customer.customerId }}</b>
              </span>
          </div>
        </div>
        <b :class="[colorCSSM.fontProduct, textCSSM.sizeBig]">
          3
<!--          {{ order.lines?.length }}-->
        </b>
      </button>
    </list-box>

    <list-box>
      <div :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
        <div>
          <h2>Total jamones</h2>
          <div :class="textCSSM.sizeSmall">
              <span :class="[textCSSM.light, colorCSSM.fontSoft]">
                Total aprox: <b>720€</b>
              </span>
          </div>
        </div>
        <h4 :class="[textCSSM.sizeBig,colorCSSM.fontProduct]">4</h4>
      </div>
    </list-box>
  </section>

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
import ListBox from "@components/shared/ListBox.vue";

import colorCSSM from "@css/utilities/colors.module.css";
import textCSSM from "@css/utilities/text.module.css";
import oSectionCSSM from "@css/objects/o-section.module.css";
import oStackCSSM from "@css/objects/o-stack.module.css";
import cListBoxCSSM from "@css/components/molecules/c-list-box.module.css";
import oFlexCSSM from "@css/objects/o-flex.module.css";

const { open } = useOverlay()
interface Props {
  packageData: Package
  packageOrders: PackageOrder[]
}

defineProps<Props>()

interface Emits {
  (ev: 'order-update', result: any): void
}

const emit = defineEmits<Emits>()

async function editCustomerOrder(customer: Customer) {
  try {
    const { reason, value } = await open(<CustomerOrderDialog customer={ customer }/>)
    if (reason === 'confirm') {
      if (value) {
        console.log(`Borra líneas de la order con customerId "${customer.customerId}" y ponle ${value} líneas`)
      } else {
        console.log('Borra todos las líneas de la Order con customerId', customer.customerId)
      }
      emit('order-update', customer)
    }
  } catch (e) {
    if (e !== ClosedModal) {
      console.log('Err')
    }
  }
}

</script>
