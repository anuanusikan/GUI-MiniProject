import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "./router"
import App from "./App.vue"
import "./style.css"

// ✅ normal imports (top of file)
import { useAuthStore } from "./stores/authStore"
import { useCheckoutStore } from "./stores/checkoutStore"

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

// ✅ guard AFTER pinia is installed
router.beforeEach((to) => {
  const auth = useAuthStore()
  const checkout = useCheckoutStore()

  if (to.path === "/checkout") {
    if (!auth.isAuthenticated) return "/signin"
    if (!checkout.selectedIds.length) return "/cart"
  }
})

app.use(router)
app.mount("#app")