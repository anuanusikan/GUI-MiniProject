import { defineStore } from "pinia"
import { computed, ref, watch } from "vue"
import type { Product } from "../types/product"

type FavoriteItem = {
  id: number
  title: string
  price: number
  thumbnail?: string
  rating?: number
  category?: string
}

const LS_KEY = "shopinhaven_favorites"

function loadFavs(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? (JSON.parse(raw) as FavoriteItem[]) : []
  } catch {
    return []
  }
}

export const useFavoritesStore = defineStore("favorites", () => {
  const items = ref<FavoriteItem[]>(loadFavs())

  watch(items, (v) => localStorage.setItem(LS_KEY, JSON.stringify(v)), { deep: true })

  const count = computed(() => items.value.length)
  const has = (id: number) => items.value.some((i) => i.id === id)

  function toggle(product: Product) {
    const id = product.id
    if (has(id)) {
      items.value = items.value.filter((i) => i.id !== id)
      return
    }

    items.value.unshift({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: (product as any).thumbnail,
      rating: (product as any).rating,
      category: (product as any).category,
    })
  }

  function remove(id: number) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, count, has, toggle, remove, clear }
})