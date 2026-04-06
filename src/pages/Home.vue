<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import { useSearchStore } from "../stores/searchStore"
import type { Product } from "../types/product"
import { getAllProducts } from "../services/productService"

import ProductCard from "../components/ProductCard.vue"
import HeroSection from "../components/HeroSection.vue"

/** Sorting */
type SortKey = "discount" | "priceAsc" | "priceDesc" | "rating"
const sortBy = ref<SortKey>("discount")

const searchStore = useSearchStore()

const allProducts = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// featured rotation state
const featuredIndex = ref(0)
let featuredTimer: ReturnType<typeof window.setInterval> | null = null

//  filtered + sorted products based on search query and selected sort
const filteredProducts = computed(() => {
  const q = searchStore.query.toLowerCase().trim()

  // Step 1: filter
  let result = !q
    ? allProducts.value
    : allProducts.value.filter((p) => {
        const title = p.title?.toLowerCase() ?? ""
        const desc = p.description?.toLowerCase() ?? ""
        const cat = String((p as any).category ?? "").toLowerCase()

        return title.includes(q) || desc.includes(q) || cat.includes(q)
      })

  // Step 2: sort
  const sorted = [...result].sort((a: any, b: any) => {
    if (sortBy.value === "discount") return (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0)
    if (sortBy.value === "rating") return (b.rating ?? 0) - (a.rating ?? 0)
    if (sortBy.value === "priceAsc") return (a.price ?? 0) - (b.price ?? 0)
    if (sortBy.value === "priceDesc") return (b.price ?? 0) - (a.price ?? 0)
    return 0
  })

  return sorted
})


const hasQuery = computed(() => searchStore.query.trim().length > 0)

const featuredProduct = computed<Product | null>(() => {
  if (!allProducts.value.length) return null

  //  while searching, show first search result
  if (hasQuery.value) return filteredProducts.value[0] ?? null

  //  keep index always valid
  const idx = featuredIndex.value % allProducts.value.length
  return allProducts.value[idx] ?? null
})

const totalCount = computed(() => allProducts.value.length)
const filteredCount = computed(() => filteredProducts.value.length)

function stopFeaturedRotation() {
  if (featuredTimer) {
    clearInterval(featuredTimer)
    featuredTimer = null
  }
}

function startFeaturedRotation() {
  stopFeaturedRotation()

  // don't rotate while searching
  if (hasQuery.value) return

  //  rotate only when products exist and not loading/error
  if (loading.value) return
  if (error.value) return
  if (!allProducts.value.length) return

  featuredTimer = window.setInterval(() => {
    if (!allProducts.value.length) return
    featuredIndex.value = (featuredIndex.value + 1) % allProducts.value.length
  }, 5000)
}

onMounted(async () => {
  loading.value = true
  error.value = null

  try {
    const data: any = await getAllProducts()

    //  support BOTH: array OR { products: array }
    const list = Array.isArray(data) ? data : Array.isArray(data?.products) ? data.products : []

    allProducts.value = list
    featuredIndex.value = 0
  } catch (e) {
    console.error(e)
    error.value = "Unable to load products"
  } finally {
    loading.value = false
  }

  startFeaturedRotation()
})


onUnmounted(() => {
  stopFeaturedRotation()
})

//  If user types search -> stop rotation. If cleared -> start again.
watch(
  () => searchStore.query,
  () => {
    // reset featuredIndex when search cleared (optional, looks nicer)
    if (!hasQuery.value) featuredIndex.value = 0
    startFeaturedRotation()
  }
)
</script>

<template>
  <section class="py-6">
    <!--  HERO -->
    <HeroSection v-if="featuredProduct" :featuredProduct="featuredProduct" />

    <div class="flex items-center justify-between gap-3 mb-4">
  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Products</h2>

  <div class="flex items-center gap-2">
    <label class="text-sm font-bold opacity-90">Sort:</label>

  <select
  v-model="sortBy"
  class="rounded-lg border px-3 py-2 text-sm font-semibold
         border-gray-300 bg-white text-gray-900
         dark:border-white/20 dark:bg-gray-800 dark:text-white
         focus:outline-none focus:ring-2 focus:ring-amber-400/60"
>
  <option value="discount" class="text-black dark:text-white bg-white dark:bg-gray-800">
    Highest discount
  </option>
  <option value="rating" class="text-black dark:text-white bg-white dark:bg-gray-800">
    Top rated
  </option>
  <option value="priceAsc" class="text-black dark:text-white bg-white dark:bg-gray-800">
    Price: low to high
  </option>
  <option value="priceDesc" class="text-black dark:text-white bg-white dark:bg-gray-800">
    Price: high to low
  </option>
</select>
  </div>
</div>

    <!--  Products -->
    <section id="products" class="pt-6 scroll-mt-32">
      <div class="flex items-center justify-between gap-3 mb-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Products</h2>

        <p v-if="!loading && !error" class="text-sm text-gray-500 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-700 dark:text-gray-200">{{ filteredCount }}</span>
          of
          <span class="font-semibold text-gray-700 dark:text-gray-200">{{ totalCount }}</span>
        </p>
      </div>

      <!--  Loading skeleton -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="h-72 rounded-2xl animate-pulse
                 bg-gray-200/80 dark:bg-gray-800/80 border border-gray-300/60 dark:border-gray-700/60" />
      </div>

      <!-- ❌ Error -->
      <p v-else-if="error" class="text-red-600 dark:text-red-400">
        {{ error }}
      </p>

      <!--  Content -->
      <div v-else>
        <!--  No results only when searching -->
        <p v-if="hasQuery && filteredCount === 0" class="text-gray-700 dark:text-gray-300
                 bg-gray-50 dark:bg-gray-800
                 border border-gray-200 dark:border-gray-700
                 rounded-lg p-4">
          No products found.
          Try a different keyword:
          <span class="font-semibold text-gray-900 dark:text-white">"{{ searchStore.query }}"</span>
        </p>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </section>
  </section>
</template>
