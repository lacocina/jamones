<template>
  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">
    <the-hero
        v-if="currentPackage"
        :title="titlePage"
        :subtitle="subtitlePage"
        :status="currentPackage.status"
        :to="{ name: 'package', params: { packageId: currentPackage.id } }"/>

    <list-box v-if="previousPackages.length" default-color>
      <router-link v-for="order in previousPackages" :key="order.id"
                   :to="{ name: 'package', params: { packageId: order.id } }"
                   :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
        <div>
          <h2 :class="uTextTransformCSSM.capitalize">
            {{ format(order.dateReceived, 'LLLL yyyy', {locale: es}) }}
          </h2>
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

<script setup lang="ts">
import {computed} from "vue";
import { useRouter } from "vue-router";
import {usePackageStore} from "../store/packages.ts";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import {PackageStatusOptions} from "../types/PackageStatus.ts";

import TheHero from "@components/shared/TheHero.vue";
import TheBanner from "@components/shared/TheBanner.vue";
import ListBox from "@components/shared/ListBox.vue";

import oFlexCSSM from "@css/objects/o-flex.module.css";
import oSectionCSSM from "@css/objects/o-section.module.css";
import cListBoxCSSM from '@css/components/molecules/c-list-box.module.css';
import textCSSM from "@css/utilities/text.module.css";
import colorCSSM from "@css/utilities/colors.module.css";
import oStackCSSM from "@css/objects/o-stack.module.css";
import uTextTransformCSSM from "@css/utilities/u-text-transform.module.css";

const router = useRouter()
const packageStore = usePackageStore()

const currentPackage = computed(() => packageStore.currentPackage)
const previousPackages = computed(() => packageStore.closedPackages)

const titlePage = computed(() => {
  if (!currentPackage.value) return 'Nuevo paquete'
  if (currentPackage.value.status === PackageStatusOptions.Opened) {
    return 'Pedido activo'
  }
  if (currentPackage.value.status === PackageStatusOptions.OnTheWay) {
    return 'Pedido en camino'
  }
  if (currentPackage.value.status === PackageStatusOptions.Pending) {
    return 'Pendiente de pago'
  }
  return format(currentPackage.value.dateReceived!, 'LLLL yyyy', {locale: es})
})

const subtitlePage = computed(() => {
  if (!currentPackage.value) return

  let subtitle = `${currentPackage.value?.orders.length} pedidos`
  const totalLines = packageStore.totalPackagesOrdersLines(currentPackage.value?.id || 0)
  subtitle += ` - ${totalLines} Jamones`
  return subtitle
})
</script>
