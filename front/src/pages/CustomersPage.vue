<template>
  <the-hero title="Listado de clientes"
            subtitle="Añade o edita cualquier cliente"/>

  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">

    <list-box title="Listado de clientes"
              description="Editar"
              default-color>
      <template v-if="customers?.length">
        <button v-for="customer in customers"
                :key="customer.customerId"
                @click="editCustomer(customer)"
                :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
          <h2>{{ customer.name }}</h2>
          <span class="material-symbols-rounded" :class="colorCSSM.fontSoft">
            chevron_right
          </span>
        </button>
      </template>
      <div :class="[cListBoxCSSM.item, colorCSSM.fontSoft]" v-else>
        Aún no hay ningún cliente añadido
      </div>
    </list-box>

    <the-button @click="newCustomer()">
      Añadir cliente
    </the-button>

  </section>

</template>

<script setup lang="tsx">
import {computed} from "vue";

import { useOverlay } from "@composables/useOverlay.ts";
import { ClosedModal } from "../types/ClosedModal.ts";
import type { Customer } from "../types/Customer.ts";

import TheHero from "@components/shared/TheHero.vue";
import TheButton from "@components/ui/TheButton.vue";
import ListBox from "@components/shared/ListBox.vue";
import CustomerDialog from "@components/customers/CustomerDialog.vue";

import oSectionCSSM from "@css/objects/o-section.module.css";
import oStackCSSM from "@css/objects/o-stack.module.css";
import cListBoxCSSM from "@css/components/molecules/c-list-box.module.css";
import oFlexCSSM from "@css/objects/o-flex.module.css";
import colorCSSM from "@css/utilities/colors.module.css";
import {useCustomerStore} from "../store/customers.ts";

const { open } = useOverlay()

async function editCustomer(customer: Customer) {
  try {
    const response = await open(<CustomerDialog customer-name={customer.name}/>)
    console.log('editCustomer: ', response)
  } catch (e) {
    if (e !== ClosedModal) {
      console.error("ERROR")
    }
  }
}

async function newCustomer() {
  try {
    const response = await open(<CustomerDialog/>)
    console.log('newCustomer: ', response)
  } catch (e) {
    if (e !== ClosedModal) {
      console.error("ERROR")
    }
  }
}

const customerStore = useCustomerStore()
const customers = computed(() => customerStore.customersList)

</script>
