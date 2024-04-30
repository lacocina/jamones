<template>
  <div :class="[
      cShadowContainer.cShadowContainer,
      onlyBottom ? cShadowContainer.onlyBottom : ''
      ]">
    <div :class="cShadowContainer.main">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import cShadowContainer from '@css/components/molecules/c-shadow-container.module.css'

interface Props {
  onlyBottom?: boolean
}

withDefaults(defineProps<Props>(), {
  onlyBottom: false
})
</script>
