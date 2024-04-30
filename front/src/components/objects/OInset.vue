<template>
<div :class="[oInset.oInset, oInset[size], oInset[modifier]]">
  <slot/>
</div>
</template>

<script lang="ts" setup>
import oInset from '@css/objects/o-inset.module.css';

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl',
  modifier?: 'stretch' | 'squish' | 'section'
}

defineProps<Props>();
</script>

