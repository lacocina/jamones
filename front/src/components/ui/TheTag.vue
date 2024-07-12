<template>
  <span :class="[cTagCSSM.cTag, statusClass]">
    {{ pending ? 'Pendiente' : 'Pagado' }}
  </span>
</template>

<script setup lang="ts">
import cTagCSSM from "@css/components/atoms/c-tag.module.css";
import {computed} from "vue";

interface Props {
  pending?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pending: false
})

const statusClass = computed(() => !props.pending || cTagCSSM.pending)

</script>
