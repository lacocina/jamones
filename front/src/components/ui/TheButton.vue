<template>
  <button :class="[
            cButtonCSSM.cButton,
            secondary ? cButtonCSSM.secondary : ''
          ]"
          :disabled="disabled"
          type="button">
    <slot/>
  </button>
</template>

<script setup lang="ts">
import cButtonCSSM from "@css/components/atoms/c-button.module.css"
interface Props {
  secondary?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  secondary: false,
  disabled: false
})

</script>
