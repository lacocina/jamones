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

interface Props {
  packageId: number
  price?: number
}

const props = defineProps<Props>()

const disabledMessage = computed(() => !!(props.price) ? '' : 'Aún no has añadido los gastos de envío.' )
const priceLabel = computed(() => !!(props.price) ? `${props.price}€` : '' )
const buttonLabel = computed(() => !!(props.price) ? 'Cambiar' : 'Añadir' )


const { open } = useOverlay()
async function openDialog() {
  try {
    const response = await open(<ShippingDialog/>)
    console.log(response)
  } catch (e) {
    if (e !== ClosedModal) {
      console.log('Err')
    }
  }
}
</script>
