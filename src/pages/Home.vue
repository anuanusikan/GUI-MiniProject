<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useSearchStore } from "../stores/searchStore"
import { useFilterStore } from "../stores/filterStore"
import type { Product } from "../types/product"
import { getAllProducts } from "../services/productService"
import ProductCard from "../components/ProductCard.vue"
import CategoriesBar from "../components/CategoriesBar.vue"
import PromoTicker from "../components/PromoTicker.vue"

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

const filteredProducts = computed(() => {
  const q = searchStore.query.toLowerCase().trim()
  if (!q) return allProducts.value

  return allProducts.value.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  })
})

const totalCount = computed(() => allProducts.value.length)
const filteredCount = computed(() => filteredProducts.value.length)
const hasQuery = computed(() => searchStore.query.trim().length > 0)
</script>

<template>
  <section class="py-6">
    <PromoTicker />
    <CategoriesBar v-if="filterStore.showCategories" />

    <section id="products" class="pt-6 scroll-mt-32">
      <div class="flex items-center justify-between gap-3 mb-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Products</h2>

        <p v-if="!loading && !error" class="text-sm text-gray-500 dark:text-gray-400">
          Showing <span class="font-semibold text-gray-700 dark:text-gray-300">{{ filteredCount }}</span>
          of <span class="font-semibold text-gray-700 dark:text-gray-300">{{ totalCount }}</span>
        </p>
      </div>

      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="i in 8" :key="i" class="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 rounded-xl"></div>
      </div>
      <p v-else-if="error" class="text-red-600 dark:text-red-400">{{ error }}</p>

      <div v-else>
        <p v-if="hasQuery && filteredCount === 0" class="text-gray-600 dark:text-gray-400 
                 bg-gray-50 dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-700 
                 rounded-lg p-4">
          No products found for
          <span class="font-semibold text-gray-800 dark:text-gray-200">"{{ searchStore.query }}"</span>.
          Try a different keyword.
        </p>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </section>
  </section>
</template>