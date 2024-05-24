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
        <select v-model="quantity" name="0">
          <option selected :value="0">Ninguno</option>
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="3">3</option>
          <option :value="4">4</option>
          <option :value="5">5</option>
          <option :value="6">6</option>
          <option :value="7">7</option>
          <option :value="8">8</option>
          <option :value="9">9</option>
          <option :value="10">10</option>
        </select>
      </div>
    </default-modal-content>
  </the-modal>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
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

const quantity = ref<number>(0)

const { close } = useOverlay()
function handleConfirm() {
  close({
    reason: 'confirm',
    value: quantity.value
  })
}
</script>
