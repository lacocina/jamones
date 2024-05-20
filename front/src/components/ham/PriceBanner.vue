<template>
  <the-banner title="Precio del jamón"
              :price="priceLabel"
              button-text="Cambiar precio del jamón"
              :disabled-message="disabledMessage"
              @click="openDialog">
    Puedes cambiar el precio del jamón en este pedido. Esto afectará a todos los cálculos en los pedidos de clientes.
  </the-banner>
</template>

<script setup lang="tsx">
import { computed } from "vue";
import { ClosedModal } from "../../types/ClosedModal.ts";
import { useOverlay } from "@composables/useOverlay.ts";

import TheBanner from "@components/shared/TheBanner.vue";
import PriceDialog from "@components/ham/PriceDialog.vue";

interface Props {
  price?: number
}

const props = defineProps<Props>()

const disabledMessage = computed(() => !!(props.price) ? '' : 'Aún no has añadido el precio del jamón.' )
const priceLabel = computed(() => !!(props.price) ? `${props.price}€/kg` : '' )

const { open } = useOverlay()

async function openDialog() {
  try {
    const response = await open(<PriceDialog/>)
    console.log(response)
  } catch (e) {
    if (e !== ClosedModal) {
      console.log('Err')
    }
  }
}
</script>
