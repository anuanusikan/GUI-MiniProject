import { defineStore } from "pinia"
import { computed, ref, watch } from "vue"
import type { Product } from "../types/product"
import { useAuthStore } from "./authStore"
import { useToastStore } from "./toastStore"

const PREFIX = "shopinhaven_favorites"
const LEGACY_KEY = "shopinhaven_favorites" // old single-key

function safeEmailKey(email: string) {
  return email.trim().toLowerCase().replace(/[^a-z0-9]/g, "_")
}

export const useFavoritesStore = defineStore("favorites", () => {
  const auth = useAuthStore()
  const items = ref<Product[]>([])

  function currentKey() {
    const email = auth.user?.email
    if (!auth.isAuthenticated || !email) return `${PREFIX}_guest`
    return `${PREFIX}_${safeEmailKey(email)}`
  }

  function tryParseArray(raw: string | null): Product[] | null {
    if (!raw) return null
    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : null
    } catch {
      return null
    }
  }

  function migrateIfNeeded(targetKey: string) {
    // If target already has data, don't migrate
    const already = tryParseArray(localStorage.getItem(targetKey))
    if (already && already.length) return already

    // 1) migrate legacy -> target
    const legacy = tryParseArray(localStorage.getItem(LEGACY_KEY))
    if (legacy && legacy.length) {
      localStorage.setItem(targetKey, JSON.stringify(legacy))
      return legacy
    }

    // 2) migrate guest -> target (optional nice behavior)
    const guest = tryParseArray(localStorage.getItem(`${PREFIX}_guest`))
    if (guest && guest.length) {
      localStorage.setItem(targetKey, JSON.stringify(guest))
      return guest
    }

    return null
  }

  function load() {
    const key = currentKey()

    // normal load
    const stored = tryParseArray(localStorage.getItem(key))
    if (stored) {
      items.value = stored
      return
    }

    // migrate then load
    const migrated = migrateIfNeeded(key)
    items.value = migrated ?? []
  }

  function save() {
    localStorage.setItem(currentKey(), JSON.stringify(items.value))
  }

  watch(items, save, { deep: true })

  // reload when auth changes
  watch(
    () => [auth.isAuthenticated, auth.user?.email],
    () => load(),
    { immediate: true }
  )

  const count = computed(() => items.value.length)

  function has(id: number) {
    return items.value.some((p) => p.id === id)
  }

  function toggle(product: Product): boolean {
    const toast = useToastStore()

    // keep your rule: must be logged in to add favorites
    if (!auth.isAuthenticated) {
      toast.show("Please sign in to add favorites", "error")
      window.location.href = "/signin"
      return false
    }

    const idx = items.value.findIndex((p) => p.id === product.id)
    if (idx === -1) {
      items.value.push(product)
      return true
    } else {
      items.value.splice(idx, 1)
      return false
    }
  }

  function remove(id: number) {
    const idx = items.value.findIndex((p) => p.id === id)
    if (idx !== -1) items.value.splice(idx, 1)
  }

  function clear() {
    items.value = []
  }

  // init
  load()

  return { items, count, has, toggle, remove, clear, load }
})
