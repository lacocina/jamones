<template>
  <div :class="oStackCSSM.md">
    <div v-if="title || description" :class="[cListBoxCSSM.title, oFlexCSSM.betweenCenter]">
      <h3>{{ title }}</h3>
      <span :class="[textCSSM.sizeSmall, textCSSM.light, colorCSSM.fontSoft]">{{ description }}</span>
    </div>
    <shadow-container :class="defaultColor ? cShadowContainer.defaultColor:''">
      <div :class="cListBoxCSSM.cListBox">
        <slot></slot>
      </div>
    </shadow-container>
  </div>
</template>

<script setup lang="ts">
import ShadowContainer from "./ShadowContainer.vue";

import oStackCSSM from '@css/objects/o-stack.module.css';
import oFlexCSSM from "@css/objects/o-flex.module.css";
import cListBoxCSSM from "@css/components/molecules/c-list-box.module.css";
import cShadowContainer from "@css/components/molecules/c-shadow-container.module.css";
import colorCSSM from "@css/utilities/colors.module.css";
import textCSSM from "@css/utilities/text.module.css";

interface Props {
  defaultColor?: boolean
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  defaultColor: false
})
</script>
