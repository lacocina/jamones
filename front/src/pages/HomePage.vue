<template>

  <LoadingLottie v-if="loadingPackages || loadingCustomers"/>

  <template v-else>

    <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">
      <the-hero
          v-if="currentPackage"
          :status="currentPackage.status"
          :to="{ name: 'package', params: { packageId: currentPackage.id } }"/>

      <list-box v-if="previousPackages.length" default-color>
        <router-link v-for="order in previousPackages" :key="order.id"
                     :to="{ name: 'package', params: { packageId: order.id } }"
                     :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
          <div>
            <h2>{{ format(order.dateReceived, 'LLLL yyyy', {locale: es}) }}</h2>
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

    </section>

    <the-banner title="Gestionar clientes"
                button-text="Clientes"
                @click="router.push({ name: 'customers' })"
                soft>
      Aquí puedes editar, eliminar o añadir clientes.
    </the-banner>

  </template>
</template>

<script setup lang="ts">
import {computed} from "vue";
import { useRouter } from "vue-router";
import {usePackageStore} from "../store/packages.ts";
import {useCustomerStore} from "../store/customers.ts";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
const packageStore = usePackageStore()
const customerStore = useCustomerStore()

packageStore.fetchPackageList()
const loadingPackages = computed(() => packageStore.loadingPackages)
const currentPackage = computed(() => packageStore.currentPackage)
const previousPackages = computed(() => packageStore.closedPackages)

customerStore.fetchCustomers()
const loadingCustomers = computed(() => customerStore.loadingCustomers)

</script>
