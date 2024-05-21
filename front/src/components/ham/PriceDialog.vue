<template>
  <the-modal @confirm="handleConfirm">
    <default-modal-content title="¿A cuánto estará el jamón en este pedido?">
      <div :class="oStackCSSM.xxs">
        <the-input-number v-model.number="hamPrice" @update:model-value="hamPrice = $event" unity="€/kg" big/>
        <div :class="textCSSM.sizeSmall">
          <span :class="textCSSM.light">
            Precio en el anterior pedido:
          </span>
          29€/kg
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

interface Props {
  price?: number
}

const props = defineProps<Props>()

const hamPrice = ref(props.price)
const { close } = useOverlay()

function handleConfirm () {
  close({
    reason: 'confirm',
    value: hamPrice.value || null
  })
}
</script>
