<template>
  <the-modal @confirm="handleConfirm">
    <default-modal-content title="Resumen del pedido">
      <div :class="oStackCSSM.sm">
        <div v-for="order in orderList"
             :key="order.orderId"
             :class="oFlexCSSM.betweenCenter">
          <span>{{ order.name }}</span>
          <span :class="colorCSSM.default">{{ order.preLines }}</span>
        </div>
        <div :class="[oFlexCSSM.betweenCenter, colorCSSM.fontProduct]">
          <span>Total de jamones</span>
          <span :class="textCSSM.sizeBig">13</span>
        </div>
      </div>
    </default-modal-content>
  </the-modal>
</template>

<script setup lang="ts">
import { useOverlay } from "@composables/useOverlay.ts";
import TheModal from "@components/shared/TheModal.vue";
import DefaultModalContent from "@components/shared/DefaultModalContent.vue";

import { PackageOrder } from "../../types/PackageOrder.ts";

import oStackCSSM from '@css/objects/o-stack.module.css';
import oFlexCSSM from "@css/objects/o-flex.module.css";
import colorCSSM from "@css/utilities/colors.module.css";
import textCSSM from "@css/utilities/text.module.css";

interface Props {
  orderList?: PackageOrder[]
}

defineProps<Props>()

const { close } = useOverlay()

function handleConfirm () {
  close({
    reason: 'confirm'
  })
}
</script>
