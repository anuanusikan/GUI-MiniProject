<script setup lang="ts">
import type { Product } from "../types/product"

defineProps<{
  product: Product
}>()
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4"
  >
    <img
      :src="product.thumbnail"
      :alt="product.title"
      class="w-full h-40 object-cover rounded"
    />

    <h3 class="mt-3 font-semibold text-gray-800 line-clamp-1">
      {{ product.title }}
    </h3>

    <p class="text-sm text-gray-500 line-clamp-2 mt-1">
      {{ product.description }}
    </p>

    <div class="mt-3 flex items-center justify-between">
      <span class="text-indigo-600 font-bold">
        ${{ product.price }}
      </span>

      <button
        class="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>
