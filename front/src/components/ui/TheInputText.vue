<template>
  <label :class="[
      cInputCSSM.cInput,
      big ? cInputCSSM.big : '',
      oStackCSSM.xxs]">
    <span v-if="label">{{ label }}</span>
    <input :value="modelValue"
           @change.prevent="(event) => emit('update:model-value', event.target.value)"
           :class="cInputCSSM.field"
           ref="inputField"
           :placeholder="placeholder"
           type="text">
  </label>
</template>

<script setup lang="ts">
import cInputCSSM from "@css/components/atoms/c-input.module.css";
import oStackCSSM from '@css/objects/o-stack.module.css';

interface Props {
  modelValue: string
  placeholder?: string
  label?: string
  big?: boolean
}

interface Emits {
  (ev: 'update:model-value', result: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
