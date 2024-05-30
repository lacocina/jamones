<template>
  <the-banner title="Precio de los portes"
              :price="priceLabel"
              :disabled-message="disabledMessage"
              :button-text="buttonLabel"
              @click="openDialog">
    Puedes cambiar el precio de los portes del pedido. Esto afectará a todos los cálculos en los pedidos de clientes.
  </the-banner>
</template>

<script setup lang="tsx">
import { computed } from "vue";
import { useOverlay } from "@composables/useOverlay.ts";
import { ClosedModal } from "../../types/ClosedModal.ts";
import TheBanner from "@components/shared/TheBanner.vue";
import ShippingDialog from "@components/ham/ShippingDialog.vue";
import {api} from "../../services/api.ts";

interface Props {
  modelValue?: number
  packageId: number
}
interface Emits {
  (ev: 'update:model-value', result: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const disabledMessage = computed(() => !!(props.modelValue) ? '' : 'Aún no has añadido los gastos de envío.' )
const priceLabel = computed(() => !!(props.modelValue) ? `${props.modelValue}€` : '' )
const buttonLabel = computed(() => !!(props.modelValue) ? 'Cambiar' : 'Añadir' )


const { open } = useOverlay()
async function openDialog() {
  try {
    const response = await open(<ShippingDialog price={props.modelValue}/>)
    if (response.reason === 'confirm' && response.value) {
      try {
        const { data } = await api.patch(
            `packages/updatePackage/${props.packageId}`,
            { shippingCost: response.value }
        )
        emit('update:model-value', data.shippingCost)
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
