<template>
<div :class="[oStack.oStack, oStack[size]]">
  <slot/>
</div>
</template>

<script lang="ts" setup>
import oStack from '@css/objects/o-stack.module.css';

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl',
}

defineProps<Props>()

</script>

