<template>
  <label :class="[
      cInputCSSM.cInput,
      big ? cInputCSSM.big : '',
      oStackCSSM.xxs]">
    <span v-if="label">{{ label }}</span>
    <span :class="cInputCSSM.fieldWrapper">

      <span v-if="unity" ref="unitySpan" :class="cInputCSSM.unity" class="c-input__unity">{{ unity }}</span>
      <input :value="modelValue"
             @change.prevent="(event) => emit('update:model-value', (event.target as HTMLInputElement)?.valueAsNumber)"
             :class="cInputCSSM.field"
             ref="inputField"
             placeholder="0"
             type="number" inputmode="numeric"
             pattern="\d(?:\.\d){0,2}" min="0" step=".1">
    </span>
  </label>
</template>

<script setup lang="ts">
import cInputCSSM from "@css/components/atoms/c-input.module.css";
import oStackCSSM from '@css/objects/o-stack.module.css';
import { ref, watch } from "vue";

interface Props {
  modelValue?: number
  unity?: string
  label?: string
  big?: boolean
}

interface Emits {
  (ev: 'update:model-value', result: number): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const inputField = ref<HTMLElement | null>(null)
const unitySpan = ref<HTMLElement | null>(null)

watch([inputField, unitySpan],() => {
  if (unitySpan.value) {
    const width = unitySpan.value.offsetWidth
    inputField.value!.style.paddingRight = `${width + 16}px`
  }
})

</script>
