<template>
  <notifications>
    <template #body="props">
      <div :class="[
          oInset.oInset,oInset.squish, notificationCSSM.customNotification,
          props.item.type ? notificationCSSM[props.item.type] : '',
          'vue-notification-wrapper']">
        <p v-if="props.item.title" :class="[notificationCSSM.title]">
          {{ props.item.title.toUpperCase() }}
        </p>
        <div v-html="props.item.text"/>
        <button :class="notificationCSSM.close" @click="props.close">
          <i class="material-symbols-rounded">close_small</i>
        </button>
      </div>
    </template>
  </notifications>
</template>

<script setup lang="ts">
import oInset from "@css/objects/o-inset.module.css";
import notificationCSSM from "@css/components/atoms/vue-notification.module.css";
import { Notifications } from "@kyvg/vue3-notification";
</script>
