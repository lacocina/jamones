<template>
  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">

    <list-box title="Pedidos de los clientes" description="Jamones" default-color>
      <button v-for="order in packageOrders"
              :key="order.orderId" type="button"
              @click="clickOrder(order)"
              :class="[
                    cListBoxCSSM.item,
                    oFlexCSSM.betweenCenter
                    ]">
        <div :class="oStackCSSM.xxs">
          <h2>{{ order.name }}</h2>
          <div v-if="$slots.subtitle" :class="[textCSSM.sizeSmall, textCSSM.light, colorCSSM.fontSoft]">
            <slot name="subtitle" v-bind="order"/>
          </div>
        </div>
        <slot name="value" v-bind="order"/>
      </button>
    </list-box>

    <list-box>
      <div :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
        <div>
          <h2>Total jamones</h2>
          <div :class="textCSSM.sizeSmall">
              <span :class="[textCSSM.light, colorCSSM.fontSoft]">
                Total aprox: <b>720€</b>
              </span>
          </div>
        </div>
        <h4 :class="[textCSSM.sizeBig,colorCSSM.fontProduct]">4</h4>
      </div>
    </list-box>

  </section>
</template>

<script setup lang="ts">
import oSectionCSSM from "@css/objects/o-section.module.css";
import oStackCSSM from "@css/objects/o-stack.module.css";
import cListBoxCSSM from "@css/components/molecules/c-list-box.module.css";
import oFlexCSSM from "@css/objects/o-flex.module.css";
import textCSSM from "@css/utilities/text.module.css";
import colorCSSM from "@css/utilities/colors.module.css";
import ListBox from "@components/shared/ListBox.vue";
import {PackageOrder} from "../../types/PackageOrder.ts";

interface Props {
  packageOrders: PackageOrder[]
  hamPrice?: number
}

defineProps<Props>()

interface Emits {
  (ev: 'click-order', result: PackageOrder): void
}

const emit = defineEmits<Emits>()

function clickOrder(order: PackageOrder) {
  emit('click-order', order)
}
</script>

<style>

</style>
