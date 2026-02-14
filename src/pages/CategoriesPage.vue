<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useSearchStore } from "../stores/searchStore"
import { useFilterStore } from "../stores/filterStore"
import type { Product } from "../types/product"
import { getAllProducts } from "../services/productService"
import CategoriesBar from "../components/CategoriesBar.vue"
import ProductCard from "../components/ProductCard.vue"

const searchStore = useSearchStore()
const filterStore = useFilterStore()

const allProducts = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    allProducts.value = await getAllProducts()
  } catch {
    error.value = "Unable to load products"
  } finally {
    loading.value = false
  }
})

const filteredProducts = computed(() => {
const q = searchStore.query.toLowerCase().trim()
const selected = (filterStore.selectedCategory ?? "").toLowerCase().trim()

  return allProducts.value.filter((p) => {
    const matchesCategory = !selected || p.category.toLowerCase() === selected
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)

    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <section class="py-6">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">Categories</h1>

    <!-- Always visible -->
    <CategoriesBar />

    <p v-if="loading" class="text-gray-600">Loading products...</p>
    <p v-else-if="error" class="text-red-600">{{ error }}</p>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
    </div>
  </section>
</template>

