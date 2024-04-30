<template>
  <label :class="cSwitchCSSM.cSwitch">
    <input :checked="modelValue"
           :disabled="disabled"
           @change="(event) => emit('update:model-value', event.target.checked)"
           type="checkbox">
    <span :class="cSwitchCSSM.ball"/>
  </label>
</template>

<script setup lang="ts">
import cSwitchCSSM from "@css/components/atoms/c-switch.module.css"

interface Props {
  modelValue: boolean,
  disabled?: boolean
}

interface Emits {
  (ev: 'update:model-value', result: boolean): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

</script>
