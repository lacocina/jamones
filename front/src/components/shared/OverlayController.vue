<script setup lang="tsx">
import { useOverlay } from '@composables/useOverlay.ts'
import { ClosedModal } from "../../types/ClosedModal.ts";
import { computed } from 'vue'

const { visible, component, reject } = useOverlay()
const ComponenOverlay = computed(() => {
  if (visible.value && component.value) {
    return () => <component.value onClose={(result: any) => reject(ClosedModal)} />
  }
  return () => null
})
</script>

<template>
  <ComponenOverlay></ComponenOverlay>
</template>
