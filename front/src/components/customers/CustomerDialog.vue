<template>
  <the-modal submit-text="Guardar cliente"
             @confirm="handleConfirm">
    <default-modal-content :title="titleDialog">
      <the-input-text label="Nombre"
                      :model-value="customerName"
                      @update:model-value="customerName = $event"/>
      <button @click="deleteCustomer">Eliminar</button>
    </default-modal-content>
  </the-modal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useOverlay } from "@composables/useOverlay.ts";

import TheModal from "@components/shared/TheModal.vue";
import TheInputText from "@components/ui/TheInputText.vue";
import DefaultModalContent from "@components/shared/DefaultModalContent.vue";

interface Props {
  customerName?: string
}

const props = withDefaults(defineProps<Props>(), { customerName: '' })
const titleDialog = computed(() => !!props.customerName ? 'Editar cliente' : 'Nuevo cliente')

const { close, reject } = useOverlay()

function handleConfirm() {
  close({
    reason: 'confirm',
    value: props.customerName,
  })
}
function deleteCustomer() {
  console.log('deleteCustomer')
  reject("ERROR")
}

</script>
