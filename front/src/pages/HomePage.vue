<template>

  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">

    <the-hero :to="{ name: 'package', params: { packageId: 22 } }"/>

    <list-box default-color>
      <router-link v-for="order in previousOrders" :key="order.id"
                   :to="{ name: 'package', params: { packageId: order.id } }"
                   :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
        <div>
          <h2>{{ order.date_received }}</h2>
          <div :class="textCSSM.sizeSmall">
            <span :class="[colorCSSM.fontProduct, colorCSSM.ham]">
              {{ order.shipping_cost }}€
            </span>
            <span :class="[textCSSM.light, colorCSSM.fontSoft]">
              - {{ order.price }}€
            </span>
          </div>
        </div>
        <span class="material-symbols-rounded" :class="colorCSSM.fontSoft">
          chevron_right
        </span>
      </router-link>
    </list-box>

  </section>

  <the-banner title="Gestionar clientes"
              button-text="Clientes"
              @click="router.push({ name: 'customers' })"
              soft>
    Aquí puedes editar, eliminar o añadir clientes.
  </the-banner>

</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { api } from "../services/api.ts";

import TheHero from "@components/shared/TheHero.vue";
import TheBanner from "@components/shared/TheBanner.vue";
import ListBox from "@components/shared/ListBox.vue";

import oFlexCSSM from "@css/objects/o-flex.module.css";
import oSectionCSSM from "@css/objects/o-section.module.css";
import cListBoxCSSM from '@css/components/molecules/c-list-box.module.css';
import textCSSM from "@css/utilities/text.module.css";
import colorCSSM from "@css/utilities/colors.module.css";
import oStackCSSM from "@css/objects/o-stack.module.css";
import { ref } from "vue";

const router = useRouter()
const previousOrders = ref([])

async function fetchPackages() {
  try {
    const { data } = await api.get('/packages')
    previousOrders.value = data.filter((item: any) => item.opened === false)
  } catch (e) {
    console.error(e)
  }
}

fetchPackages()
</script>
