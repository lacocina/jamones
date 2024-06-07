<template>

  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">

    <list-box title="Pedidos de los clientes" description="Jamones" default-color>
      <button v-for="order in packageData.orders"
              :key="order.orderId" type="button"
              @click="editCustomerOrder(order, order.lines.length)"
              :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
        <div :class="oStackCSSM.xxs">
          <h2>{{ order.name }}</h2>
          <div v-if="packageData.hamPrice" :class="textCSSM.sizeSmall">
              <span :class="[textCSSM.light, colorCSSM.fontSoft]">
                Precio aprox: <b>{{ Math.floor(order.lines.length * packageData.hamPrice * 8) }}€</b>
              </span>
          </div>
        </div>
        <b :class="[textCSSM.sizeBig, colorCSSM.fontProduct]">
          {{ order.lines.length }}
        </b>
      </button>
      <button v-for="customer in emptyOrderCustomers"
              :key="customer.customerId" type="button"
              @click="editCustomerOrder(customer, 0)"
              :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
        <div :class="oStackCSSM.xxs">
          <h2>{{ customer.name }}</h2>
        </div>
        <b :class="[
            textCSSM.sizeBig,
            colorCSSM.fontSoftest]">
          0
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
import {useCustomerStore} from "../store/customers.ts";
import {usePackageStore} from "../store/packages.ts";

import type {Customer} from "../types/Customer.ts";
import type{ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";
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

interface Props {
  packageData: ResponsePackageDetail
}
const props = defineProps<Props>()

const customersStore = useCustomerStore()
const packagesStore = usePackageStore()

const emptyOrderCustomers = customersStore.customersList.filter(customer => {
    return !props.packageData.orders.some(order => order.customerId === customer.customerId)
})
const totalOrdersLines = computed(() => props.packageData.orders.reduce((acc, order) => acc + (order.lines?.length || 0), 0))


const { open } = useOverlay()
async function editCustomerOrder(item: Customer, lines: number) {
  try {
    const { reason, value } = await open(
        <CustomerOrderDialog
            customerId={ item.customerId }
            customerName={ item.name }
            lines={ lines }
        />
    )
    if (reason === 'confirm') {
      if (value) {
        await packagesStore.updateOrder({
          packageId: props.packageData.id,
          customerId: item.customerId,
          lines: value
        })
      } else {
        console.log('Pinia: Borra todos las líneas de la Order con customerId', item.name)
      }
    }
  } catch (e) {
    if (e !== ClosedModal) {
      console.error('Error: ', e)
    }
  }
}

</script>
