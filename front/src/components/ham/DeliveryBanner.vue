<template>
  <section :class="[cBannerCSSM.soft, cBannerCSSM.reverseBorder]" class="delivery-banner">
    <LottieAnimation :animationData="lottieDelivery" :height="150" :width="150" no-margin/>
    <div :class="[oStackCSSM.xxs, uAlignContentCSSM.center]">
      <h3>En camino</h3>
      <p :class="[colorCSSM.fontSoft, textCSSM.light]">
        Aún puedes cambiar la cantidad de jamones de los clientes.
      </p>
    </div>
  </section>
</template>

<script setup lang="tsx">
import cBannerCSSM from "@css/components/molecules/c-banner.module.css";
import lottieDelivery from '@assets/lottie/delivery.json';

import oStackCSSM from "@css/objects/o-stack.module.css";
import textCSSM from "@css/utilities/text.module.css";
import colorCSSM from "@css/utilities/colors.module.css";
import uAlignContentCSSM from "@css/utilities/u-align-content.module.css";
</script>

<style lang="scss">
.delivery-banner {
  padding-right: 2rem;
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: .5rem;
}
</style>
