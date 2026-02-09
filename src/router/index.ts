import { createRouter, createWebHistory } from "vue-router"

import Home from "../pages/Home.vue"
import CategoriesPage from "../pages/CategoriesPage.vue"
import CategoryProducts from "../pages/CategoryProducts.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/categories", name: "categories", component: CategoriesPage },
    { path: "/category/:slug", name: "category-products", component: CategoryProducts, props: true },
  ],
})

export default router
