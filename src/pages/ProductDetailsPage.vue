<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import type { Product } from "../types/product"
import { getProductById } from "../services/productService"
import { useCartStore } from "../stores/cartStore"
import { useFavoritesStore } from "../stores/favoritesStore"
import { useToastStore } from "../stores/toastStore"

const route = useRoute()
const router = useRouter()

const cart = useCartStore()
const favs = useFavoritesStore()
const toast = useToastStore()

const loading = ref(true)
const error = ref<string | null>(null)
const product = ref<Product | null>(null)

const id = computed(() => Number(route.params.id))

onMounted(async () => {
  try {
    product.value = await getProductById(id.value)
  } catch {
    error.value = "Unable to load product details"
  } finally {
    loading.value = false
  }
})

function addToCart() {
  if (!product.value) return
  cart.addToCart(product.value, 1)
  toast.show("Added to cart", "success")
}

function toggleFav() {
  if (!product.value) return
  favs.toggle(product.value)
  toast.show(favs.has(product.value.id) ? "Added to favorites" : "Removed from favorites", "info")
}
</script>

<template>
  <section class="py-6">
    <button
      class="text-sm font-semibold text-indigo-700 hover:underline"
      @click="router.back()"
    >
      ← Back
    </button>

    <p v-if="loading" class="mt-4 text-gray-600">Loading...</p>
    <p v-else-if="error" class="mt-4 text-red-600">{{ error }}</p>

    <div v-else-if="product" class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden">
        <img
          :src="(product as any).thumbnail"
          :alt="product.title"
          class="w-full h-[360px] object-cover"
        />
      </div>

      <div>
        <p class="text-sm text-gray-500">{{ (product as any).category }}</p>
        <h1 class="mt-1 text-3xl font-extrabold text-gray-900">{{ product.title }}</h1>

        <div class="mt-3 flex items-center gap-3">
          <span class="text-2xl font-extrabold text-gray-900">${{ product.price }}</span>
          <span
            v-if="(product as any).discountPercentage"
            class="text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1"
          >
            -{{ Math.round((product as any).discountPercentage) }}%
          </span>
          <span class="text-sm font-semibold text-gray-800">
            ⭐ {{ Number((product as any).rating ?? 0).toFixed(1) }}
          </span>
        </div>

        <p class="mt-4 text-gray-700 leading-relaxed">
          {{ product.description }}
        </p>

        <div class="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            class="flex-1 rounded-xl bg-indigo-600 text-white py-3 font-semibold hover:bg-indigo-700 transition"
            @click="addToCart"
          >
            Add to Cart
          </button>

          <button
            class="flex-1 rounded-xl border border-gray-200 py-3 font-semibold text-gray-900 hover:bg-gray-50 transition"
            @click="toggleFav"
          >
            {{ favs.has(product.id) ? "Remove Favorite" : "Add to Favorites" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>