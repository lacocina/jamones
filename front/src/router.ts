import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

import HomePage from "./pages/HomePage.vue"
import PackagePage from "./pages/PackagePage.vue";
import CustomersPage from "./pages/CustomersPage.vue";

const routes : RouteRecordRaw[] = [
    { path: '/' , name: 'home', component: HomePage },
    { path: '/paquete/:packageId' , name: 'package', component: PackagePage },
    { path: '/clientes' , name: 'customers', component: CustomersPage }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
