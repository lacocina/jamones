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
  price?: number
}

const props = defineProps<Props>()

interface Emits {
  (ev: 'update-price', result: number): void
}

const emit = defineEmits<Emits>()

const disabledMessage = computed(() => !!(props.price) ? '' : 'Aún no has añadido el precio del jamón.' )
const priceLabel = computed(() => !!(props.price) ? `${props.price}€/kg` : '' )
const buttonLabel = computed(() => !!(props.price) ? 'Cambiar' : 'Añadir' )

const { open } = useOverlay()

async function openDialog() {
  try {
    const response = await open(<PriceDialog price={props.price}/>)
    if (response.reason === 'confirm' && response.value) {
      try {
        const { data } = await api.patch(`packages/updateHamPrice/${props.packageId}`, { hamPrice: response.value })
        emit('update-price', data.hamPrice)
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
