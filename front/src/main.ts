import { createApp } from 'vue'
import { createPinia } from "pinia";
import { router } from "./router"
import '@css/styles.scss'
import App from './App.vue'
import Vue3Lottie from 'vue3-lottie'
import Notifications from '@kyvg/vue3-notification'

const pinia= createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(Vue3Lottie, { name: 'LottieAnimation' })
    .use(Notifications)
    .mount('#app')
