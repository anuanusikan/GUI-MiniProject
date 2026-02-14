<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import ProductCard from "../components/ProductCard.vue"
import type { Product } from "../types/product"
import { getProductsByCategory } from "../services/productService"

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const loading = ref(true)
const error = ref<string | null>(null)
const products = ref<Product[]>([])

onMounted(async () => {
  try {
    products.value = await getProductsByCategory(slug.value)
  } catch {
    error.value = "Unable to load category products"
  } finally {
    loading.value = false
  }
})

function prettify(s: string) {
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}
</script>

<template>
  <section class="py-6">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">
      {{ prettify(slug) }}
    </h1>

    <p v-if="loading" class="text-gray-600">Loading...</p>
    <p v-else-if="error" class="text-red-600">{{ error }}</p>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
  </section>
</template>
