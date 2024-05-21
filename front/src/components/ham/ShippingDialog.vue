<template>
  <the-modal @confirm="handleConfirm">
    <default-modal-content title="¿Cuánto han costado los portes?">
      <div :class="oStackCSSM.xxs">
        <the-input-number v-model.number="shippingPrice"
                          @update:model-value="shippingPrice = $event"
                          unity="€" big/>
        <div :class="textCSSM.sizeSmall">
          <span :class="textCSSM.light">
            Hay 4 jamones en este pedido, serán
          </span>
          3€
          <span :class="textCSSM.light">
            por jamón
          </span>
        </div>
      </div>
    </default-modal-content>
  </the-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOverlay } from "@composables/useOverlay.ts";

import TheModal from "@components/shared/TheModal.vue";
import TheInputNumber from "@components/ui/TheInputNumber.vue";
import DefaultModalContent from "@components/shared/DefaultModalContent.vue";

import oStackCSSM from '@css/objects/o-stack.module.css';
import textCSSM from "@css/utilities/text.module.css";

const shippingPrice = ref<number>(12)
const { close } = useOverlay()

function handleConfirm() {
  close({
    reason: 'confirm',
    value: shippingPrice.value
  })
}
</script>
