<template>
  <section :class="[oSectionCSSM.oSection, oStackCSSM.sm]">
    <list-box title="Pedidos de los clientes" description="Jamones" default-color>
      <button v-for="order in packageData.orders"
              :key="order.orderId" type="button"
              :class="[cListBoxCSSM.item, oFlexCSSM.betweenCenter]">
        <div :class="oStackCSSM.xxs">
          <h2>{{ order.name }}</h2>
          <div :class="textCSSM.sizeSmall">
              <span :class="[textCSSM.light, colorCSSM.fontSoft]">
                {{ order.preLines }} {{ order.preLines === 1 ? 'Jamón' : 'Jamones' }}
              </span>
          </div>
        </div>
        <the-tag :pending="!order.paid"/>
      </button>
    </list-box>

    <list-box>
      <div :class="[cListBoxCSSM.item, oStackCSSM.lg]">
        <div :class="oFlexCSSM.betweenCenter">
          <div>
            <h2>Total jamones</h2>
            <div :class="textCSSM.sizeSmall">
                <span :class="[textCSSM.light, colorCSSM.fontSoft]">
                  Total aprox: <b>3.333€</b>
                </span>
            </div>
          </div>
          <h4 :class="[textCSSM.sizeBig,colorCSSM.fontProduct]">
            23
          </h4>
        </div>
        <div :class="cListBoxCSSM.separator"/>
        <div :class="oFlexCSSM.betweenCenter" class="pending">
          <span :class="[textCSSM.sizeSmall]">Pendiente a cobrar:</span>
          <span :class="[colorCSSM.fontProduct]">3450€</span>
        </div>
      </div>
    </list-box>

  </section>

  <slot/>

  <div>banner de confirmación</div>

</template>

<script setup lang="tsx">
import type {ResponsePackageDetail} from "../types/ResponsePackageDetail.ts";

import ListBox from "@components/shared/ListBox.vue";
import TheTag from "@components/ui/TheTag.vue";

import oSectionCSSM from "@css/objects/o-section.module.css";
import oStackCSSM from "@css/objects/o-stack.module.css";
import cListBoxCSSM from "@css/components/molecules/c-list-box.module.css";
import oFlexCSSM from "@css/objects/o-flex.module.css";
import textCSSM from "@css/utilities/text.module.css";
import colorCSSM from "@css/utilities/colors.module.css";

interface Props {
  packageData: ResponsePackageDetail
}
defineProps<Props>()
</script>
