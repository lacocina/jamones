<template>

  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">

    <list-box title="Pedidos de los clientes" description="Jamones" default-color>
      <button v-for="order in packageData.orders"
              :key="order.orderId" type="button"
              @click="editCustomerOrder(order)"
              :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
        <div :class="oStackCSSM.xxs">
          <h2>{{ order.name }}</h2>
          <div v-if="order.lines && packageData.hamPrice" :class="textCSSM.sizeSmall">
              <span :class="[textCSSM.light, colorCSSM.fontSoft]">
                Precio aprox: <b>{{ Math.floor(order.lines.length * packageData.hamPrice * 8) }}€</b>
              </span>
          </div>
        </div>
        <b :class="[
            textCSSM.sizeBig,
            order.lines ? colorCSSM.fontProduct : colorCSSM.fontSoftest
            ]">
          {{ order.lines?.length || 0 }}
        </b>
      </button>
    </list-box>

    <list-box>
      <div :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
        <div>
          <h2>Total jamones</h2>
          <div v-if="packageData.hamPrice" :class="textCSSM.sizeSmall">
              <span :class="[textCSSM.light, colorCSSM.fontSoft]">
                Total aprox: <b>{{ Math.floor(totalOrdersLines * packageData.hamPrice * 8) }}€</b>
              </span>
          </div>
        </div>
        <h4 :class="[textCSSM.sizeBig,colorCSSM.fontProduct]">
          {{ totalOrdersLines }}
        </h4>
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
import {computed} from "vue";
import {useOverlay} from "@composables/useOverlay.ts";

import type{ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";
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
  packageData: ResponsePackageDetail
}

const props = defineProps<Props>()

const totalOrdersLines = computed(() => props.packageData.orders.reduce((acc, order) => acc + (order.lines?.length || 0), 0))

async function editCustomerOrder(customer: Customer) {
  try {
    const { reason, value } = await open(<CustomerOrderDialog customer={ customer }/>)
    if (reason === 'confirm') {
      if (value) {
        console.log(`Pinia: Borra líneas de la order con customerId "${customer.customerId}" y ponle ${value} líneas`)
      } else {
        console.log('Pinia: Borra todos las líneas de la Order con customerId', customer.customerId)
      }
    }
  } catch (e) {
    if (e !== ClosedModal) {
      console.log('Err')
    }
  }
}

</script>
