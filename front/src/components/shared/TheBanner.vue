<template>
  <section :class="[
      oSectionCSSM.oSection,
      cBannerCSSM.cBanner,
      oStackCSSM.xl,
      reverseBorder ? cBannerCSSM.reverseBorder : '',
      soft ? cBannerCSSM.soft : ''
      ]">
    <div :class="oStackCSSM.md">
      <div v-if="title" :class="oFlexCSSM.betweenEnd">
        <div :class="oFlexCSSM.startCenter">
          <span v-if="symbol" class="material-symbols-rounded">
            {{ symbol }}
          </span>
          <h3>{{ title }}</h3>
        </div>
        <h3 :class="[textCSSM.sizeBig, colorsCSSM.fontProduct]">
          {{ price }}
        </h3>
      </div>
      <p :class="textCSSM.light">
        <slot/>
      </p>
      <p v-if="disabledMessage" :class="colorsCSSM.fontError">
        {{ disabledMessage }}
      </p>
    </div>
    <the-button v-if="buttonText" :secondary="!soft" @click="onClick" :disabled="disabled">
      {{ buttonText }}
    </the-button>
  </section>
</template>

<script setup lang="ts">
import TheButton from "../ui/TheButton.vue";

import oSectionCSSM from "@css/objects/o-section.module.css";
import cBannerCSSM from "@css/components/molecules/c-banner.module.css";
import colorsCSSM from "@css/utilities/colors.module.css";
import textCSSM from "@css/utilities/text.module.css";
import oFlexCSSM from "@css/objects/o-flex.module.css";
import oStackCSSM from "@css/objects/o-stack.module.css";


interface Props {
  title?: string
  buttonText?: string
  reverseBorder?: boolean
  soft?: boolean
  price?: string
  symbol?: string
  disabled?: boolean
  disabledMessage?: string
}

withDefaults(defineProps<Props>(), {
  reverseBorder: false,
  disabled: false,
  soft: false
})
interface Emits {
  (ev: 'click', result: void): void
}

const emit = defineEmits<Emits>()
function onClick() {
  emit('click')
}
</script>
