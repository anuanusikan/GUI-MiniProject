import { defineStore } from "pinia"
import { computed, ref, watch } from "vue"
import type { Product } from "../types/product"
import { useAuthStore } from "./authStore"
import { useToastStore } from "./toastStore"

const LS_KEY = "shopinhaven_favorites"

export const useFavoritesStore = defineStore("favorites", () => {
  // -----------------------------
  // State
  // -----------------------------
  const items = ref<Product[]>([])

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

  // Persist favorites whenever items change
  watch(items, save, { deep: true })

  // -----------------------------
  // Computed
  // -----------------------------
  const count = computed(() => items.value.length)

  // -----------------------------
  // Helpers
  // -----------------------------
  /** Check if a product is already in favorites */
  function has(id: number): boolean {
    return items.value.some((item) => item.id === id)
  }

  // -----------------------------
  // Actions
  // -----------------------------

  /**
   * Toggle a product in favorites.
   * - Requires user to be authenticated.
   * - If not signed in, shows a toast and redirects to /signin.
   *
   * Returns:
   * - true  => added to favorites
   * - false => removed from favorites OR blocked (not authenticated)
   */
  function toggle(product: Product): boolean {
    const auth = useAuthStore()
    const toast = useToastStore()

    // Auth guard (stores should NOT use useRouter())
    if (!auth.isAuthenticated) {
      toast.show("Please sign in to add favorites", "error")
      window.location.href = "/signin" // simple redirect (safe anywhere)
      return false
    }

    const idx = items.value.findIndex((item) => item.id === product.id)

    if (idx === -1) {
      items.value.push(product)
      return true
    } else {
      items.value.splice(idx, 1)
      return false
    }
  }

  /** Remove a single favorite by id */
  function remove(id: number) {
    const idx = items.value.findIndex((item) => item.id === id)
    if (idx !== -1) items.value.splice(idx, 1)
  }

  /** Clear all favorites */
  function clear() {
    items.value = []
  }

  // -----------------------------
  // Init
  // -----------------------------
  load()

  return {
    items,
    count,
    has,
    toggle,
    remove,
    clear,
  }
})