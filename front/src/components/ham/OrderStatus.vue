<template>
  <div :class="[oFlexCSSM.startCenter, uTextTransformCSSM.uppercase]">
    {{ currentStatusInfo.text }}
    <span class="material-symbols-rounded">
      {{ currentStatusInfo.icon }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { StatusInfo, PackageStatusOptions } from "../../types/PackageStatus.ts";

import oFlexCSSM from "@css/objects/o-flex.module.css";
import uTextTransformCSSM from "@css/utilities/u-text-transform.module.css";

interface Props {
  status?: PackageStatusOptions
}

const props = withDefaults(defineProps<Props>(), {
  status: PackageStatusOptions.Opened
})

const statusMap: {[key: PackageStatusOptions]: StatusInfo } = {
  [PackageStatusOptions.Opened]: { text: 'Abierto', icon: 'storefront' },
  [PackageStatusOptions.OnTheWay]: { text: 'De camino', icon: 'local_shipping' },
  [PackageStatusOptions.Pending]: { text: 'Pendiente de pago', icon: 'payments' },
  [PackageStatusOptions.Closed]: { text: 'Cerrado', icon: 'lock' }
}

const currentStatusInfo = computed<StatusInfo>(() => statusMap[props.status])

</script>
