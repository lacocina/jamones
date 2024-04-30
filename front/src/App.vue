<template>
  <main :class="oPageCSSM.oPage">
    <router-view/>
  </main>
  <OverlayController />
</template>

<script lang="ts" setup>
import oPageCSSM from '@css/objects/o-page.module.css'
import OverlayController from '@components/shared/OverlayController.vue';
</script>

<style>
#app {
  display: grid;
  grid-template-columns: var(--page-max-width);
  justify-content: center;
  padding: var(--spacing-rem-md) 0;

  --product-color: var(--color-brand-ham);
}
</style>
