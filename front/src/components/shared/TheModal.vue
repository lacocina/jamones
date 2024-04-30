<template>
  <dialog ref="dialog" :class="cModalCSSM.cModal" @close="handleClose">
    <shadow-container :class="cShadowContainerCSSM.darkColor">
      <slot/>
    </shadow-container>
    <div :class="oFlexCSSM.endCenter">
      <the-button @click="handleClose" secondary>
        Cancelar
      </the-button>
      <the-button @click="handleConfirm">
        {{ submitText }}
      </the-button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useOverlay } from "@composables/useOverlay.ts";
import { ClosedModal } from "../../types/ClosedModal.ts";
import TheButton from "@components/ui/TheButton.vue";
import ShadowContainer from "@components/shared/ShadowContainer.vue";

import oFlexCSSM from "@css/objects/o-flex.module.css";
import cModalCSSM from "@css/components/molecules/c-modal.module.css";
import cShadowContainerCSSM from "@css/components/molecules/c-shadow-container.module.css";

interface Props {
  submitText?: String
}

withDefaults(defineProps<Props>(), {
  submitText: 'Guardar'
})

interface Emits {
  (ev: 'close', result: void): void,
  (ev: 'confirm', result: void): void
}

const emit = defineEmits<Emits>()
const dialog = ref<HTMLDialogElement | undefined>()

const { reject } = useOverlay()

function handleClose() {
  reject(ClosedModal)
}

function handleConfirm() {
  emit('confirm')
}

watch(dialog, () => {
  dialog.value?.showModal()
})
</script>
