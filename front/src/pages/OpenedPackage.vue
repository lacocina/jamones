<template>

  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">

    <list-box title="Pedidos de los clientes" description="Jamones" default-color>
      <button v-for="order in packageOrders"
              :key="order.orderId" type="button"
              @click="editCustomerOrder(order)"
              :class="[
                    cListBoxCSSM.item,
                    oFlexCSSM.betweenCenter
                    ]">
        <div>
          <h2>{{ order.name }}</h2>
          <div v-if="packageData.hamPrice" :class="textCSSM.sizeSmall">
              <span :class="[textCSSM.light, colorCSSM.fontSoft]">
                Precio aprox: <b>{{ packageData.hamPrice * 3 }}€</b>
              </span>
          </div>
        </div>
        <h4 :class="[colorCSSM.fontProduct, textCSSM.sizeBig]">
          3
        </h4>
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
import {Package} from "../types/Package.ts";
import {PackageOrder} from "../types/PackageOrder.ts";
import PriceBanner from "@components/ham/PriceBanner.vue";
import ShippingBanner from "@components/ham/ShippingBanner.vue";
import TheBanner from "@components/shared/TheBanner.vue";
import CustomerOrderDialog from "@components/ham/CustomerOrderDialog.vue";
import oSectionCSSM from "@css/objects/o-section.module.css";
import oStackCSSM from "@css/objects/o-stack.module.css";
import cListBoxCSSM from "@css/components/molecules/c-list-box.module.css";
import oFlexCSSM from "@css/objects/o-flex.module.css";
import textCSSM from "@css/utilities/text.module.css";
import colorCSSM from "@css/utilities/colors.module.css";
import ListBox from "@components/shared/ListBox.vue";
import type {Customer} from "../types/Customer.ts";
import {ClosedModal} from "../types/ClosedModal.ts";
import {useOverlay} from "@composables/useOverlay.ts";

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
