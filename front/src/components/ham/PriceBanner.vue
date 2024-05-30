<template>
  <the-banner title="Precio del jamón"
              :button-text="buttonLabel"
              :price="priceLabel"
              :disabled-message="disabledMessage"
              @click="openDialog">
    Puedes cambiar el precio del jamón en este pedido. Esto afectará a todos los cálculos en los pedidos de clientes.
  </the-banner>
</template>

<script setup lang="tsx">
import { computed } from "vue";
import { ClosedModal } from "../../types/ClosedModal.ts";
import { useOverlay } from "@composables/useOverlay.ts";
import { api } from "../../services/api.ts";

import TheBanner from "@components/shared/TheBanner.vue";
import PriceDialog from "@components/ham/PriceDialog.vue";

interface Props {
  packageId: number
  modelValue?: number
}

interface Emits {
  (ev: 'update:model-value', result: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const disabledMessage = computed(() => !!(props.modelValue) ? '' : 'Aún no has añadido el precio del jamón.' )
const priceLabel = computed(() => !!(props.modelValue) ? `${props.modelValue}€/kg` : '' )
const buttonLabel = computed(() => !!(props.modelValue) ? 'Cambiar' : 'Añadir' )

const { open } = useOverlay()

async function openDialog() {
  try {
    const response = await open(<PriceDialog price={props.modelValue}/>)
    if (response.reason === 'confirm' && response.value) {
      try {
        const { data } = await api.patch(`packages/updatePackage/${props.packageId}`, { hamPrice: response.value })
        emit('update:model-value', data.hamPrice)
      } catch (e) {
        console.error(e)
      }
    }
  } catch (e) {
    if (e !== ClosedModal) {
      console.log('Err')
    }
  }
}
</script>
