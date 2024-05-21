<template>
  <template v-if="packageData">
    <the-hero :status="packageData.status"/>

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
                  :price="packageData.hamPrice"/>

    <shipping-banner/>

    <the-banner title="¿Ya está todo listo?"
                button-text="Confirmar pedido"
                disabled
                disabled-message="Falta añadir medio jamón"
                soft>
      Si ya está todo preparado para pedir puedes continuar para indicar que el pedido está de camino.
    </the-banner>
  </template>

  <template else>
    Loading
  </template>
</template>

<script setup lang="tsx">
import { ref } from "vue";
import { useOverlay } from "@composables/useOverlay.ts";
import { useRoute } from "vue-router";
import { api } from "../services/api.ts";
import { ResponsePackageDetail } from "../types/ResponsePackageDetail.ts";
import { Package } from "../types/Package.ts";
import { PackageOrder } from "../types/PackageOrder.ts";
import { ClosedModal } from "../types/ClosedModal.ts";
import type { Customer } from "../types/Customer.ts";

import TheHero from "@components/shared/TheHero.vue";
import ListBox from "@components/shared/ListBox.vue";
import ShippingBanner from "@components/ham/ShippingBanner.vue";
import PriceBanner from "@components/ham/PriceBanner.vue";
import TheBanner from "@components/shared/TheBanner.vue";
import CustomerOrderDialog from "@components/ham/CustomerOrderDialog.vue";

import oFlexCSSM from "@css/objects/o-flex.module.css";
import oSectionCSSM from "@css/objects/o-section.module.css";
import cListBoxCSSM from "@css/components/molecules/c-list-box.module.css";
import textCSSM from "@css/utilities/text.module.css";
import colorCSSM from "@css/utilities/colors.module.css";
import oStackCSSM from "@css/objects/o-stack.module.css";

const route = useRoute()
const { open } = useOverlay()

const packageOrders = ref<PackageOrder[]>([])
const packageData = ref<Package>()

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

async function fetchPackageDetail() {
  try {
    const { data } : { data: ResponsePackageDetail } = await api.get(`packages/${route.params.packageId}`)
    const { orders, ...responsePackageData } = data
    packageOrders.value = orders
    packageData.value = responsePackageData
  } catch (e) {
    console.error(e)
  }
}

fetchPackageDetail()
</script>
