<template>

  <DeliveryBanner v-if="isOnTheWay"/>

  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">

    <list-box title="Pedidos de los clientes" description="Jamones" default-color>
      <button v-for="order in packageData.orders"
              :key="order.orderId" type="button"
              @click="editCustomerOrder(order, order.preLines, order.orderId)"
              :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
        <div :class="oStackCSSM.xxs">
          <h2>{{ order.name }}</h2>
          <div v-if="packageData.hamPrice" :class="textCSSM.sizeSmall">
              <span :class="[textCSSM.light, colorCSSM.fontSoft]">
                Precio aprox: <b>{{ Math.floor(order.preLines * packageData.hamPrice * 8) }}€</b>
              </span>
          </div>
        </div>
        <b :class="[textCSSM.sizeBig, colorCSSM.fontProduct]">
          {{ order.preLines }}
        </b>
      </button>
      <button v-for="customer in emptyOrderCustomers"
              :key="customer.customerId" type="button"
              @click="editCustomerOrder(customer, 0, null)"
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
          {{ packagesStore.totalPackagesOrdersLines(packageData.id) }}
        </h4>
      </div>
    </list-box>
  </section>

  <price-banner :package-id="packageData.id"
                v-model.number="packageData.hamPrice"/>

  <shipping-banner :package-id="packageData.id"
                   v-model.number="packageData.shippingCost"/>

  <the-banner v-if="isOnTheWay"
              title="¿Ya ha llegado"
              button-text="!Sí, ya ha llegado!"
              @click="confirmArrived"
              soft>
    Si ya está aquí el jamón continua para apuntar a los que vayan pagando.
  </the-banner>

  <the-banner v-else
              title="¿Ya está todo listo?"
              button-text="Confirmar pedido"
              @click="confirmPackage"
              :disabled="!packageData.orders?.length"
              soft>
    Si ya está todo preparado para pedir puedes continuar para indicar que el pedido está de camino.
  </the-banner>
</template>

<script setup lang="tsx">
import {computed} from "vue";
import { api } from "../services/api.ts";
import {useOverlay} from "@composables/useOverlay.ts";
import {useCustomerStore} from "../store/customers.ts";
import {usePackageStore} from "../store/packages.ts";

import type {Customer} from "../types/Customer.ts";
import type {ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";
import {PackageStatusOptions} from "../types/PackageStatus.ts";
import {ClosedModal} from "../types/ClosedModal.ts";

import PriceBanner from "@components/ham/PriceBanner.vue";
import ShippingBanner from "@components/ham/ShippingBanner.vue";
import TheBanner from "@components/shared/TheBanner.vue";
import CustomerOrderDialog from "@components/ham/CustomerOrderDialog.vue";
import OrdersSummaryDialog from "@components/ham/OrdersSummaryDialog.vue";
import ShippingDialog from "@components/ham/ShippingDialog.vue"
import ListBox from "@components/shared/ListBox.vue";
import DeliveryBanner from "@components/ham/DeliveryBanner.vue";

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

const emptyOrderCustomers = computed(() => customersStore.customersList.filter(customer => {
  return !props.packageData.orders.some(order => order.customerId === customer.customerId)
}))
const totalOrdersLines = computed(() => props.packageData.orders.reduce((acc, order) => acc + (order.preLines), 0))
const isOnTheWay = computed(() => props.packageData.status === PackageStatusOptions.OnTheWay)


const { open } = useOverlay()
async function editCustomerOrder(item: Customer, lines: number, orderId: number | null) {
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
      } else if (orderId) {
        await packagesStore.deleteOrder({ orderId })
      }
    }
  } catch (e) {
    if (e !== ClosedModal) {
      console.error('Error: ', e)
    }
  }
}

async function confirmPackage () {
  try {
    const { reason } = await open(
        <OrdersSummaryDialog orderList={ props.packageData.orders }/>
    )
    if (reason === 'confirm') {
      const { data } = await api.patch(
          `packages/updatePackage/${props.packageData.id}`,
          { status: PackageStatusOptions.OnTheWay }
      )
      console.log(data)
    }
  } catch (e) {
    if (e !== ClosedModal) {
      console.error('Error: ', e)
    }
  }
}

async function confirmArrived () {
  try {
    const response = await open(<ShippingDialog price={props.packageData.shippingCost}/>)
    if (response.reason === 'confirm' && response.value) {
      try {
        const { data } = await api.patch(
            `packages/updatePackage/${props.packageData.id}`,
            {
              shippingCost: response.value,
              status: PackageStatusOptions.Pending
            }
        )
        console.log(data)
      } catch (e) {
        console.error(e)
      }
    }
  } catch (e) {
    if (e !== ClosedModal) {
      console.log('Err')
    }
  }
}

</script>
