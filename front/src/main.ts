import { createApp } from 'vue'
import { createPinia } from "pinia";
import { router } from "./router"
import '@css/styles.scss'
import App from './App.vue'
import Vue3Lottie from 'vue3-lottie'

const pinia= createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(Vue3Lottie, { name: 'LottieAnimation' })
    .mount('#app')
