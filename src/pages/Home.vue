<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import type { Product } from "../types/product"
import { getAllProducts } from "../services/productService"
import ProductCard from "../components/ProductCard.vue"
import { useSearchStore } from "../stores/searchStore"

const allProducts = ref<Product[]>([])
const searchStore = useSearchStore()

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
  <section id="products" class="py-6">
    <div class="flex items-center justify-between gap-3 mb-4">
      <h2 class="text-2xl font-bold text-gray-900">Products</h2>

      <p v-if="!loading && !error" class="text-sm text-gray-500">
        Showing <span class="font-semibold text-gray-700">{{ filteredCount }}</span>
        of <span class="font-semibold text-gray-700">{{ totalCount }}</span>
      </p>
    </div>

    <p v-if="loading" class="text-gray-600">Loading products...</p>
    <p v-else-if="error" class="text-red-600">{{ error }}</p>

    <div v-else>
      <p
        v-if="hasQuery && filteredCount === 0"
        class="text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-4"
      >
        No products found for
        <span class="font-semibold text-gray-800">"{{ searchStore.query }}"</span>.
        Try a different keyword.
      </p>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
      </div>
    </div>
  </section>
</template>


