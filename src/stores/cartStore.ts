import { defineStore } from "pinia"
import { computed, ref, watch } from "vue"
import type { Product } from "../types/product"
import { useAuthStore } from "./authStore"
import { useToastStore } from "./toastStore"

export interface CartItem {
  id: number
  title: string
  price: number
  thumbnail: string
  qty: number
}

const LS_KEY = "shopinhaven_cart"

export const useCartStore = defineStore("cart", () => {
  // -----------------------------
  // State
  // -----------------------------
  const items = ref<CartItem[]>([])

  // -----------------------------
  // LocalStorage helpers
  // -----------------------------
  function load() {
    try {
      const stored = localStorage.getItem(LS_KEY)
      items.value = stored ? JSON.parse(stored) : []
    } catch {
      items.value = []
    }
  }

  function save() {
    localStorage.setItem(LS_KEY, JSON.stringify(items.value))
  }

  // Persist cart whenever items change
  watch(items, save, { deep: true })

  // -----------------------------
  // Computed
  // -----------------------------
  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.qty, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  )

  // -----------------------------
  // Actions
  // -----------------------------

  /**
   * Add a product to the cart.
   * - Requires user to be authenticated.
   * - If not signed in, shows a toast and redirects to /signin.
   *
   * Returns:
   * - true  => item added successfully
   * - false => not added (user not authenticated)
   */
  function addToCart(product: Product, qty = 1): boolean {
    const auth = useAuthStore()
    const toast = useToastStore()

    // Auth guard (stores should NOT use useRouter())
    if (!auth.isAuthenticated) {
      toast.show("Please sign in to add items to cart", "error")
      window.location.href = "/signin" // simple redirect (safe anywhere)
      return false
    }

    const existing = items.value.find((item) => item.id === product.id)

    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        qty,
      })
    }

    return true
  }

  /** Remove an item completely from the cart */
  function removeFromCart(id: number) {
    const idx = items.value.findIndex((item) => item.id === id)
    if (idx !== -1) items.value.splice(idx, 1)
  }

  /** Set item quantity (must be > 0) */
  function setQty(id: number, qty: number) {
    const item = items.value.find((item) => item.id === id)
    if (item && qty > 0) item.qty = qty
  }

  /** Increase quantity by 1 */
  function inc(id: number) {
    const item = items.value.find((item) => item.id === id)
    if (item) item.qty++
  }

  /** Decrease quantity by 1 (minimum 1) */
  function dec(id: number) {
    const item = items.value.find((item) => item.id === id)
    if (item && item.qty > 1) item.qty--
  }

  /** Clear entire cart */
  function clearCart() {
    items.value = []
  }

  // -----------------------------
  // Init
  // -----------------------------
  load()

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    setQty,
    inc,
    dec,
    clearCart,
  }
})