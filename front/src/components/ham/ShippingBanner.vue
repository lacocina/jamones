<template>
  <the-banner title="Precio de los portes"
              price="12€"
              button-text="Cambiar precio de los portes"
              @click="openDialog">
    Puedes cambiar el precio de los portes del pedido. Esto afectará a todos los cálculos en los pedidos de clientes.
  </the-banner>
</template>

<script setup lang="tsx">
import { useOverlay } from "@composables/useOverlay.ts";
import { ClosedModal } from "../../types/ClosedModal.ts";
import TheBanner from "@components/shared/TheBanner.vue";
import ShippingDialog from "@components/ham/ShippingDialog.vue";

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
