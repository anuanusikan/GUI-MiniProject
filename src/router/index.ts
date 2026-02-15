import { createRouter, createWebHistory } from "vue-router"

// Pages
import Home from "../pages/Home.vue"
import CategoriesPage from "../pages/CategoriesPage.vue"
import CategoryProducts from "../pages/CategoryProducts.vue"
import ProductDetailsPage from "../pages/ProductDetailsPage.vue"
import OffersPage from "../pages/OffersPage.vue"
import CartPage from "../pages/CartPage.vue"
import CheckoutPage from "../pages/CheckoutPage.vue"
import FavoritesPage from "../pages/FavoritesPage.vue"
import SignInPage from "../pages/SignInPage.vue"
import SignUpPage from "../pages/SignUpPage.vue"
import MyOrdersPage from "../pages/MyOrdersPage.vue"
import MessagesPage from "../pages/MessagesPage.vue"
import PaymentMethodsPage from "../pages/PaymentMethodsPage.vue"
import SettingsPage from "../pages/SettingsPage.vue"

// ✅ Import stores for route protection
import { useAuthStore } from "../stores/authStore"
import { useCheckoutStore } from "../stores/checkoutStore"

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/categories", name: "Categories", component: CategoriesPage },
  { path: "/category/:slug", name: "CategoryProducts", component: CategoryProducts },
  { path: "/product/:id", name: "ProductDetails", component: ProductDetailsPage },
  { path: "/offers", name: "Offers", component: OffersPage },

  // Protected routes (guard will handle access)
  { path: "/cart", name: "Cart", component: CartPage },
  { path: "/checkout", name: "Checkout", component: CheckoutPage },

  { path: "/favorites", name: "Favorites", component: FavoritesPage },
  { path: "/signin", name: "SignIn", component: SignInPage },
  { path: "/signup", name: "SignUp", component: SignUpPage },

  {
    path: "/orders",
    name: "Orders",
    component: MyOrdersPage,
  },
  {
    path: "/messages",
    name: "Messages",
    component: MessagesPage,
  },
  {
    path: "/payment-methods",
    name: "PaymentMethods",
    component: PaymentMethodsPage,
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  // ✅ Smooth UX: always open pages from top
  scrollBehavior() {
    return { top: 0 }
  },
})

/**
 * ✅ Route Guard:
 * - Block /checkout if not signed in
 * - Block /checkout if no selected items
 * - Block /cart if not signed in
 */
router.beforeEach((to) => {
  const auth = useAuthStore()
  const checkout = useCheckoutStore()

  if (to.path === "/checkout") {
    if (!auth.isAuthenticated) return "/signin"
    if (!checkout.selectedIds.length) return "/cart"
  }

  if (to.path === "/cart" && !auth.isAuthenticated) {
    return "/signin"
  }
})

export default router