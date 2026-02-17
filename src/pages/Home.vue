<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useSearchStore } from "../stores/searchStore"
import { useFilterStore } from "../stores/filterStore"
import type { Product } from "../types/product"
import { getAllProducts } from "../services/productService"

import ProductCard from "../components/ProductCard.vue"
import CategoriesBar from "../components/CategoriesBar.vue"
import HeroSection from "../components/HeroSection.vue"

const searchStore = useSearchStore()
const filterStore = useFilterStore()

const allProducts = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    allProducts.value = await getAllProducts()
  } catch (e) {
    error.value = "Unable to load products"
  } finally {
    loading.value = false
  }
})

/**
 * ✅ Combined filtering:
 * - Category (from filterStore.selectedCategory)
 * - Search query (from searchStore.query)
 */
const filteredProducts = computed(() => {
  let list = allProducts.value

  // Category filter (if selected)
  const selected = (filterStore.selectedCategory ?? "").trim().toLowerCase()
  if (selected) {
    list = list.filter((p) => String(p.category).toLowerCase() === selected)
  }

  // Search filter
  const q = searchStore.query.toLowerCase().trim()
  if (!q) return list

  return list.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      String(p.category).toLowerCase().includes(q)
    )
  })
})

/**
 * ✅ Featured product:
 * - Use first item from filteredProducts
 * - Fallback to first item from allProducts
 * - Otherwise null (safe)
 */
const featuredProduct = computed<Product | null>(() => {
  return filteredProducts.value[0] ?? allProducts.value[0] ?? null
})

const totalCount = computed(() => allProducts.value.length)
const filteredCount = computed(() => filteredProducts.value.length)
const hasQuery = computed(() => searchStore.query.trim().length > 0)
</script>

<template>
  <section class="py-6">
    <!-- ✅ HERO (only shows when product exists) -->
    <HeroSection v-if="featuredProduct" :featuredProduct="featuredProduct" />

    <!-- ✅ Categories -->
    <CategoriesBar v-if="filterStore.showCategories" />

    <!-- ✅ Products -->
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

      <!-- ✅ Loading skeleton -->
      <div
        v-if="loading"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="i in 8"
          :key="i"
          class="h-72 rounded-2xl animate-pulse
                 bg-gray-200/80 dark:bg-gray-800/80 border border-gray-300/60 dark:border-gray-700/60"
        />
      </div>

      <p v-else-if="error" class="text-red-600 dark:text-red-400">{{ error }}</p>

      <div v-else>
        <p
          v-if="(hasQuery || filterStore.selectedCategory) && filteredCount === 0"
          class="text-gray-700 dark:text-gray-300
                 bg-gray-50 dark:bg-gray-800
                 border border-gray-200 dark:border-gray-700
                 rounded-lg p-4"
        >
          No products found.
          <span v-if="hasQuery">
            Try a different keyword:
            <span class="font-semibold text-gray-900 dark:text-white">"{{ searchStore.query }}"</span>
          </span>
        </p>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </section>
  </section>
</template>