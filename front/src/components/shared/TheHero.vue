<template>
  <shadow-container :only-bottom="!isLinkComponent">
    <MainComponent :class="[
        cHeroCSSM.hero,
        inactive ? cHeroCSSM.inactive : '',
        !isLinkComponent ? cHeroCSSM.isHeader : ''
        ]">
      <div :class="cHeroCSSM.container">
        <div :class="[
            oFlexCSSM.betweenStart,
            isHome ? uFlexDirectionCSSM.rowReverse : ''
            ]">
          <router-link v-if="!isHome"
                       :to="{ name: 'home' }"
                       :class="cHeroCSSM.back">
            <span class="material-symbols-rounded">
              arrow_back_ios_new
            </span>
          </router-link>
          <order-status v-if="status" :status="status"/>
        </div>
        <div>
          <h2 :class="textCSSM.sizeBiggest">Titulo</h2>
          <h4 :class="textCSSM.light">Subtitulo</h4>
        </div>
      </div>
      <figure :class="cHeroCSSM.imgWrapper">
        <img src="../../assets/img/bg-image-ham.jpg" alt="alt">
      </figure>
    </MainComponent>
  </shadow-container>
</template>

<script setup lang="tsx">
import { computed, useSlots } from "vue";
import { RouterLink, useRoute, RouteLocationNamedRaw } from "vue-router";
import { PackageStatusOptions } from "../../types/PackageStatus.ts";

import ShadowContainer from "@components/shared/ShadowContainer.vue";
import OrderStatus from "@components/ham/OrderStatus.vue";

import cHeroCSSM from "@css/components/organisms/c-hero.module.css";
import oFlexCSSM from "@css/objects/o-flex.module.css";
import textCSSM from "@css/utilities/text.module.css";
import uFlexDirectionCSSM from "@css/utilities/u-flex-direction.module.css";

const route = useRoute()

const isHome = route.name === 'home'
interface Props {
  status?: PackageStatusOptions
  inactive?: boolean
  to?: RouteLocationNamedRaw
}

const props = withDefaults(defineProps<Props>(), {
  inactive: false
})

const isLinkComponent = computed(() => !!props.to)

const slots = useSlots()

const MainComponent = computed(() => {
  if (!!props.to) {
    return <RouterLink to={ props.to }>{slots.default ? slots.default() : null}</RouterLink>
  }
  return <header>{slots.default ? slots.default() : null}</header>
})
</script>
