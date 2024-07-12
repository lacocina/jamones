<template>
  <the-modal @confirm="handleConfirm">
    <default-modal-content title="Pon el precio de cada jamón">
      Ticket
    </default-modal-content>
  </the-modal>
</template>

<script setup lang="ts">
import { useOverlay } from "@composables/useOverlay.ts";

import TheModal from "@components/shared/TheModal.vue";
import DefaultModalContent from "@components/shared/DefaultModalContent.vue";

import {PackageOrder} from "../../types/PackageOrder.ts";

interface Props {
  orders?: PackageOrder
}

defineProps<Props>()

const { close } = useOverlay()

function handleConfirm() {
  close({
    reason: 'confirm',
    value: [{ orderId: 1, price: 230.4 }, { orderId: 2, price: 290.3 }]
  })
}
</script>
