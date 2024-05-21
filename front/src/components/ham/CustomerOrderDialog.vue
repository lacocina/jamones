<template>
  <the-modal @confirm="handleConfirm">
    <default-modal-content :title="dialogTitle">
      <div :class="oFlexCSSM.betweenCenter">
        <div :class="textCSSM.light">
          <div :class="[textCSSM.sizeSmall]">
            39€/kg - 8kg el jamón
          </div>
          Precio aprox: <b>720€</b>
        </div>
        input
      </div>
    </default-modal-content>
  </the-modal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Customer } from "../../types/Customer.ts";
import TheModal from "@components/shared/TheModal.vue";
import DefaultModalContent from "@components/shared/DefaultModalContent.vue";

import oFlexCSSM from "@css/objects/o-flex.module.css";
import textCSSM from "@css/utilities/text.module.css";
import {useOverlay} from "@composables/useOverlay.ts";

interface Props {
  customer: Customer
}

const props = defineProps<Props>()
const dialogTitle = computed(() => `¿Cuántos jamones quiere ${props.customer.name}?`)

const { close } = useOverlay()
function handleConfirm() {
  close({
    reason: 'confirm',
    value: 2
  })
}
</script>
