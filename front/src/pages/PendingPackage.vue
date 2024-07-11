<template>

  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">
    {{ packageData }}
  </section>
</template>

<script setup lang="tsx">
import type {ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";
import oSectionCSSM from "@css/objects/o-section.module.css";
import oStackCSSM from "@css/objects/o-stack.module.css";

interface Props {
  packageData: ResponsePackageDetail
}
defineProps<Props>()
</script>
