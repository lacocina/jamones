<template>
  <the-hero/>

  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">

    <list-box title="Pedidos de los clientes" description="Jamones" default-color>
      <button v-for="customer in customers"
              :key="customer.id" type="button"
              @click="editCustomerOrder(customer)"
              :class="[
                  cListBoxCSSM.item,
                  oFlexCSSM.betweenCenter,
                  customer.hams > 0 ? '' : colorCSSM.fontSoft
                  ]">
        <div>
          <h2>{{ customer.name }}</h2>
          <div v-if="customer.hams > 0" :class="textCSSM.sizeSmall">
            <span :class="[textCSSM.light, colorCSSM.fontSoft]">
              Precio aprox: <b>720€</b>
            </span>
          </div>
        </div>
        <h4 :class="[customer.hams > 0 ? [colorCSSM.fontProduct] : '', textCSSM.sizeBig]">
          {{ customer.hams }}
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

  <price-banner/>

  <shipping-banner/>

  <the-banner title="¿Ya está todo listo?" button-text="Confirmar pedido" disabled-message="Falta añadir medio jamón" soft>
    Si ya está todo preparado para pedir puedes continuar para indicar que el pedido está de camino.
  </the-banner>

</template>

<script setup lang="tsx">
import type { Customer } from "../types/Customer.ts";
import { useOverlay } from "@composables/useOverlay.ts";

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
import {ClosedModal} from "../types/ClosedModal.ts";

const customers : Customer[] = [{
  id: 1,
  name: 'Teresa',
  hams: 3
},{
  id: 2,
  name: 'Miquel',
  hams: 0
},{
  id: 3,
  name: 'Cholo',
  hams: 1
}]

const { open } = useOverlay()

async function editCustomerOrder(customer) {
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
