<template>
  <div :class="textCSSM.alignCenter">
    <LottieAnimation :animationData="lottieLoading" :height="200" :width="200" />
    <slot></slot>
    <template v-if="!$slots.default">
      Cargando...
    </template>
  </div>
</template>

<script setup lang="ts">
import textCSSM from "@css/utilities/text.module.css";
import lottieLoading from "@assets/lottie/1717083061969.json";

</script>

<style>

</style>
