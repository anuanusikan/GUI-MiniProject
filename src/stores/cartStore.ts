import { defineStore } from "pinia"
import { computed, ref, watch } from "vue"
import type { Product } from "../types/product"

export type CartItem = {
  id: number
  title: string
  price: number
  thumbnail?: string
  qty: number
}

const LS_KEY = "shopinhaven_cart"

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>(loadCart())

  watch(
    items,
    (val) => localStorage.setItem(LS_KEY, JSON.stringify(val)),
    { deep: true }
  )

  const totalItems = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))
  const totalPrice = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))

  function addToCart(product: Product, qty = 1) {
    const found = items.value.find((i) => i.id === product.id)
    if (found) found.qty += qty
    else {
      items.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: (product as any).thumbnail, // safe if your Product has thumbnail
        qty,
      })
    }
  }

  function removeFromCart(id: number) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function setQty(id: number, qty: number) {
    const item = items.value.find((i) => i.id === id)
    if (!item) return
    item.qty = Math.max(1, qty)
  }

  function inc(id: number) {
    const item = items.value.find((i) => i.id === id)
    if (item) item.qty += 1
  }

  function dec(id: number) {
    const item = items.value.find((i) => i.id === id)
    if (!item) return
    item.qty = Math.max(1, item.qty - 1)
  }

  function clearCart() {
    items.value = []
  }

  return { items, totalItems, totalPrice, addToCart, removeFromCart, setQty, inc, dec, clearCart }
})