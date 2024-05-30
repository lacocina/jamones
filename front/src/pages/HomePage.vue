<template>

  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">

    <LoadingLottie v-if="isLoading" />

    <template v-else>
      <the-hero
          v-if="currentPackage"
          :status="currentPackage.status"
          :to="{ name: 'package', params: { packageId: currentPackage.id } }"/>

      <list-box v-if="previousPackages.length" default-color>
        <router-link v-for="order in previousPackages" :key="order.id"
                     :to="{ name: 'package', params: { packageId: order.id } }"
                     :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
          <div>
            <h2>{{ format(order.dateReceived, 'LLLL yyyy', { locale: es } ) }}</h2>
            <div :class="textCSSM.sizeSmall">
              <span :class="[colorCSSM.fontProduct, colorCSSM.ham]">
                {{ order.shippingCost }}€
              </span>
              <span :class="[textCSSM.light, colorCSSM.fontSoft]">
                - {{ order.hamPrice }}€
              </span>
            </div>
          </div>
          <span class="material-symbols-rounded" :class="colorCSSM.fontSoft">
            chevron_right
          </span>
        </router-link>
      </list-box>
    </template>

  </section>

  <the-banner title="Gestionar clientes"
              button-text="Clientes"
              @click="router.push({ name: 'customers' })"
              soft>
    Aquí puedes editar, eliminar o añadir clientes.
  </the-banner>

</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { format } from "date-fns";
import { es } from "date-fns/locale";

import { api } from "../services/api.ts";
import {Package} from "../types/Package.ts";

import TheHero from "@components/shared/TheHero.vue";
import TheBanner from "@components/shared/TheBanner.vue";
import ListBox from "@components/shared/ListBox.vue";

import oFlexCSSM from "@css/objects/o-flex.module.css";
import oSectionCSSM from "@css/objects/o-section.module.css";
import cListBoxCSSM from '@css/components/molecules/c-list-box.module.css';
import textCSSM from "@css/utilities/text.module.css";
import colorCSSM from "@css/utilities/colors.module.css";
import oStackCSSM from "@css/objects/o-stack.module.css";
import LoadingLottie from "@components/shared/LoadingLottie.vue";

const router = useRouter()

const isLoading = ref(true)
const currentPackage = ref<Package>()
const previousPackages = ref<Package[]>([])

async function fetchPackages() {
  try {
    const { data } = await api.get('/packages/list')
    await new Promise(resolve => setTimeout(resolve, 1000))
    previousPackages.value = data.filter((item: Package) => !!item.dateClosing)
    currentPackage.value = data.find((item: Package) => !(!!item.dateClosing))
  } catch (e) {
    console.error('fetchPackages: ', e)
  } finally {
    isLoading.value = false
  }
}

fetchPackages()
</script>
