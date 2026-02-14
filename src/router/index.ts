import { createRouter, createWebHistory } from "vue-router"

import Home from "../pages/Home.vue"
import CategoriesPage from "../pages/CategoriesPage.vue"
import CategoryProducts from "../pages/CategoryProducts.vue"
import CartPage from "../pages/CartPage.vue"
import OffersPage from "../pages/OffersPage.vue"
import ProductDetailsPage from "../pages/ProductDetailsPage.vue"
import FavoritesPage from "../pages/FavoritesPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/categories", name: "categories", component: CategoriesPage },
    { path: "/category/:slug", name: "category-products", component: CategoryProducts, props: true },
    { path: "/cart", name: "cart", component: CartPage },
    { path: "/offers", name: "offers", component: OffersPage },
    { path: "/product/:id", name: "product-details", component: ProductDetailsPage, props: true },
    { path: "/favorites", name: "favorites", component: FavoritesPage },
  ],
})

export default router
