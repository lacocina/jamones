<template>

  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">

    <the-hero to="package"/>

    <list-box default-color>
      <router-link v-for="order in previousOrders" :key="order.id"
                   :to="{ name: 'package', params: { packageId: order.id } }"
                   :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
        <div>
          <h2>{{ order.shopName }}</h2>
          <div :class="textCSSM.sizeSmall">
            <span :class="[colorCSSM.fontProduct, colorCSSM[order.type]]">
              {{ order.order }}
            </span>
            <span :class="[textCSSM.light, colorCSSM.fontSoft]">
              - {{ order.date }}
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

import TheHero from "@components/shared/TheHero.vue";
import TheBanner from "@components/shared/TheBanner.vue";
import ListBox from "@components/shared/ListBox.vue";

import oFlexCSSM from "@css/objects/o-flex.module.css";
import oSectionCSSM from "@css/objects/o-section.module.css";
import cListBoxCSSM from '@css/components/molecules/c-list-box.module.css';
import textCSSM from "@css/utilities/text.module.css";
import colorCSSM from "@css/utilities/colors.module.css";
import oStackCSSM from "@css/objects/o-stack.module.css";

const router = useRouter()

const previousOrders = [
  {
    id: 1,
    shopName: 'Juan García',
    date: '04/12/2023',
    order: '9 Jamones',
    type: 'ham'
  },
  {
    id: 2,
    shopName: 'Juan García',
    date: '05/02/2023',
    order: '10 Jamones',
    type: 'ham',
  },
  {
    id: 3,
    shopName: 'Juan García',
    date: '29/11/2022',
    order: '5 Jamones',
    type: 'ham'
  }
]

</script>
