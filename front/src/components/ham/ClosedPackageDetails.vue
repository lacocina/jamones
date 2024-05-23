<template>
<the-banner title="Detalles del pedido">
  <div :class="oStackCSSM.sm">
    <div :class="oFlexCSSM.betweenCenter">
      <b :class="[textCSSM.sizeSmall, colorCSSM.fontSoft]">Precio del jamón</b>
      <b :class="colorCSSM.default">{{ package.hamPrice }}€/kg</b>
    </div>
    <div :class="oFlexCSSM.betweenCenter">
      <b :class="[textCSSM.sizeSmall, colorCSSM.fontSoft]">Gastos de envío</b>
      <b :class="colorCSSM.default">{{ package.shippingCost }}€</b>
    </div>
    <div :class="oFlexCSSM.betweenCenter">
      <b :class="[textCSSM.sizeSmall, colorCSSM.fontSoft]">Gastos por jamón</b>
      <b :class="colorCSSM.default">{{ Math.floor(package.shippingCost! / 15) }}€</b>
    </div>
<!--    <div :class="oFlexCSSM.betweenCenter">-->
<!--      <b :class="[textCSSM.sizeSmall, colorCSSM.fontSoft]">Llegada del pedido</b>-->
<!--      <b :class="colorCSSM.default">{{ format(package.dateReceived, 'd LLLL yyyy', { locale: es }) }}</b>-->
<!--    </div>-->
<!--    <div :class="oFlexCSSM.betweenCenter">-->
<!--      <b :class="[textCSSM.sizeSmall, colorCSSM.fontSoft]">Pedido cerrado</b>-->
<!--      <b :class="colorCSSM.default">{{ format(package.dateClosing, 'd LLLL yyyy', { locale: es }) }}</b>-->
<!--    </div>-->
  </div>
</the-banner>
</template>

<script setup lang="ts">
import { Package } from "../../types/Package.ts";
import TheBanner from "@components/shared/TheBanner.vue";

import oStackCSSM from '@css/objects/o-stack.module.css';
import oFlexCSSM from "@css/objects/o-flex.module.css";
import colorCSSM from "@css/utilities/colors.module.css";
import textCSSM from "@css/utilities/text.module.css";
// import { format } from "date-fns";
// import { es } from "date-fns/locale";

interface Props {
  package: Package
}

defineProps<Props>()
</script>

<style>

</style>
