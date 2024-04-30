<template>
  <div :class="[cModalCSSM.container, oStackCSSM.xl]">
    <h3 :class="textCSSM.sizeBig">{{ title }}</h3>
    <div :class="colorCSSM.fontSoft">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import cModalCSSM from "@css/components/molecules/c-modal.module.css";
import oStackCSSM from "@css/objects/o-stack.module.css";
import textCSSM from "@css/utilities/text.module.css";
import colorCSSM from "@css/utilities/colors.module.css";

interface Props {
  title: String
}

defineProps<Props>()
</script>
