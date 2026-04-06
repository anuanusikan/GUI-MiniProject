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
  size?: string //  optional for clothes/shoes
}

const LS_PREFIX = "shopinhaven_cart"

function safeEmailKey(email: string) {
  return email.trim().toLowerCase().replace(/[^a-z0-9]/g, "_")
}

export const useCartStore = defineStore("cart", () => {
  const auth = useAuthStore()
  const toast = useToastStore()

  const items = ref<CartItem[]>([])

  function currentKey() {
    const email = auth.user?.email
    if (!auth.isAuthenticated || !email) return `${LS_PREFIX}_guest`
    return `${LS_PREFIX}_${safeEmailKey(email)}`
  }

  function load() {
    try {
      const stored = localStorage.getItem(currentKey())
      items.value = stored ? (JSON.parse(stored) as CartItem[]) : []
    } catch {
      items.value = []
    }
  }

  function save() {
    localStorage.setItem(currentKey(), JSON.stringify(items.value))
  }

  // save whenever cart changes
  watch(items, save, { deep: true })

  //  switch cart when login/logout happens
  watch(
    () => [auth.isAuthenticated, auth.user?.email],
    () => load(),
    { immediate: true }
  )

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price * item.qty, 0))

 // Add to cart (authentication required)
  function addToCart(product: Product, qty = 1, size?: string): boolean {
    if (!auth.isAuthenticated) {
    toast.show("Please sign in to add items to cart", "error")
    return false
  }

    const existing = items.value.find((item) => item.id === product.id && item.size === size)

    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        qty,
        size,
      })
    }

    toast.show("Added to cart", "success")
    return true
  }

  function removeFromCart(id: number, size?: string) {
    items.value = items.value.filter((item) => !(item.id === id && item.size === size))
  }

  function setQty(id: number, qty: number, size?: string) {
    const item = items.value.find((x) => x.id === id && x.size === size)
    if (item && qty > 0) item.qty = qty
  }

  function inc(id: number, size?: string) {
    const item = items.value.find((x) => x.id === id && x.size === size)
    if (item) item.qty++
  }

  function dec(id: number, size?: string) {
    const item = items.value.find((x) => x.id === id && x.size === size)
    if (item && item.qty > 1) item.qty--
  }

  function clearCart() {
    items.value = []
  }

  // init
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
    load,
  }
})
