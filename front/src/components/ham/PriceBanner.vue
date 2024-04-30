<template>
  <the-banner title="Precio del jamón"
              price="39€/kg"
              button-text="Cambiar precio del jamón"
              @click="openDialog">
    Puedes cambiar el precio del jamón en este pedido. Esto afectará a todos los cálculos en los pedidos de clientes.
  </the-banner>
</template>

<script setup lang="tsx">
import { ClosedModal } from "../../types/ClosedModal.ts";
import { useOverlay } from "@composables/useOverlay.ts";

import TheBanner from "@components/shared/TheBanner.vue";
import PriceDialog from "@components/ham/PriceDialog.vue";

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
