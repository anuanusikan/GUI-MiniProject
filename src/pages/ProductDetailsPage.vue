<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import type { Product } from "../types/product"
import { getProductById } from "../services/productService"
import { useCartStore } from "../stores/cartStore"
import { useToastStore } from "../stores/toastStore"
import { useFavoritesStore } from "../stores/favoritesStore"
import { onBeforeUnmount } from "vue"

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown)
})

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const toast = useToastStore()
const favs = useFavoritesStore()

const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const qty = ref(1)
const selectedImageIndex = ref(0)
const isLightboxOpen = ref(false)

onMounted(async () => {
  const id = Number(route.params.id)
  if (!id) {
    error.value = "Invalid product ID"
    loading.value = false
    return
  }

  try {
    product.value = await getProductById(id)
  } catch (e) {
    error.value = "Failed to load product"
  } finally {
    loading.value = false
  }
})

const discount = computed(() => {
  if (!product.value) return 0
  return Math.round((product.value as any).discountPercentage ?? 0)
})

const rating = computed(() => {
  if (!product.value) return 0
  return Number((product.value as any).rating ?? 0)
})

const stock = computed(() => {
  if (!product.value) return 0
  return Number((product.value as any).stock ?? 0)
})

const images = computed(() => {
  if (!product.value) return []
  return (product.value as any).images ?? [product.value.thumbnail]
})

const isFav = computed(() => {
  if (!product.value) return false
  return favs.has(product.value.id)
})

const originalPrice = computed(() => {
  if (!product.value || discount.value === 0) return null
  return (product.value.price / (1 - discount.value / 100)).toFixed(2)
})

function addToCart() {
  if (!product.value) return
  cart.addToCart(product.value, qty.value)
  toast.show(`Added ${qty.value} item(s) to cart`, "success")
  qty.value = 1
}

function toggleFav() {
  if (!product.value) return
  favs.toggle(product.value)
  toast.show(isFav.value ? "Added to favorites" : "Removed from favorites", "info")
}

function selectImage(index: number) {
  selectedImageIndex.value = index
}

function openLightbox() {
  isLightboxOpen.value = true
}

function closeLightbox() {
  isLightboxOpen.value = false
}

function nextImage() {
  selectedImageIndex.value = (selectedImageIndex.value + 1) % images.value.length
}

function prevImage() {
  selectedImageIndex.value = (selectedImageIndex.value - 1 + images.value.length) % images.value.length
}

function handleKeydown(e: KeyboardEvent) {
  if (!isLightboxOpen.value) return
  if (e.key === "Escape") closeLightbox()
  if (e.key === "ArrowLeft") prevImage()
  if (e.key === "ArrowRight") nextImage()
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown)
})
</script>

<template>
  <section class="py-6 min-h-screen">
    <!-- Back Button -->
    <button
      @click="router.back()"
      class="mb-6 inline-flex items-center gap-2 text-sm font-semibold 
             text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300
             transition-colors group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 transition-transform group-hover:-translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading product...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-600 dark:text-red-400 text-lg font-semibold">{{ error }}</div>
    </div>

    <!-- Product Details -->
    <div v-else-if="product" class="grid lg:grid-cols-2 gap-8">
      <!-- LEFT: Images -->
      <div>
        <!-- Main Image -->
        <div
          class="rounded-2xl border-2 border-gray-200 dark:border-gray-700 
                 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950
                 shadow-lg overflow-hidden mb-4 cursor-pointer group"
          @click="openLightbox"
        >
          <div class="aspect-square p-8 flex items-center justify-center relative">
            <img
              :src="images[selectedImageIndex]"
              :alt="product.title"
              class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            
            <!-- Zoom Icon Overlay -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 dark:bg-black/20">
              <div class="bg-white/90 dark:bg-gray-800/90 rounded-full p-3 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Thumbnail Gallery -->
        <div v-if="images.length > 1" class="flex gap-3 overflow-x-auto pb-2">
          <button
            v-for="(img, idx) in images"
            :key="idx"
            @click="selectImage(Number(idx))"
            class="flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden transition-all
                   bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950"
            :class="
              idx === selectedImageIndex
                ? 'border-indigo-600 dark:border-indigo-400 shadow-lg scale-105'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500'
            "
          >
            <img :src="img" :alt="`${product.title} - ${Number(idx) + 1}`" class="w-full h-full object-contain p-2" />
          </button>
        </div>
      </div>

      <!-- RIGHT: Product Info -->
      <div class="space-y-6">
        <!-- Category Badge -->
        <div>
          <span
            class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold
                   bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950
                   border border-indigo-200 dark:border-indigo-800
                   text-indigo-700 dark:text-indigo-300"
          >
            {{ product.category }}
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
          {{ product.title }}
        </h1>

        <!-- Rating & Stock -->
        <div class="flex items-center gap-4 flex-wrap">
          <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <span class="text-yellow-500 dark:text-yellow-400">⭐</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ rating.toFixed(1) }}</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">rating</span>
          </div>

          <div
            class="px-4 py-2 rounded-full font-semibold text-sm"
            :class="
              stock > 50
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                : stock > 0
                ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800'
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
            "
          >
            {{ stock > 50 ? "In Stock" : stock > 0 ? `Only ${stock} left` : "Out of Stock" }}
          </div>
        </div>

        <!-- Price -->
        <div class="flex items-baseline gap-3">
          <span class="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            ${{ product.price }}
          </span>
          <span v-if="originalPrice" class="text-xl text-gray-500 dark:text-gray-400 line-through">
            ${{ originalPrice }}
          </span>
          <span
            v-if="discount > 0"
            class="px-3 py-1 rounded-full text-sm font-bold text-white
                   bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600"
          >
            Save {{ discount }}%
          </span>
        </div>

        <!-- Description -->
        <div class="p-5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 class="text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">Description</h3>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <!-- Quantity Selector -->
        <div class="flex items-center gap-4">
          <label class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Quantity:</label>
          <div class="flex items-center gap-2">
            <button
              @click="qty > 1 ? qty-- : null"
              :disabled="qty <= 1"
              class="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
                     font-bold text-lg transition-all hover:scale-105 active:scale-95"
            >
              -
            </button>

            <input
              v-model.number="qty"
              type="number"
              min="1"
              :max="stock"
              class="w-20 h-10 text-center font-bold text-lg rounded-lg
                     border-2 border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
            />

            <button
              @click="qty < stock ? qty++ : null"
              :disabled="qty >= stock"
              class="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
                     font-bold text-lg transition-all hover:scale-105 active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 flex-wrap">
          <button
            @click="addToCart"
            :disabled="stock === 0"
            class="flex-1 min-w-[200px] px-8 py-4 rounded-xl font-bold text-lg
                   bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500
                   text-white shadow-lg
                   hover:shadow-xl hover:scale-105 active:scale-95
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200
                   flex items-center justify-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Add to Cart
          </button>

          <button
            @click="toggleFav"
            class="px-8 py-4 rounded-xl font-bold border-2
                   transition-all duration-200 hover:scale-105 active:scale-95
                   flex items-center justify-center gap-2"
            :class="
              isFav
                ? 'border-rose-500 dark:border-rose-400 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-rose-400 dark:hover:border-rose-500'
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              :fill="isFav ? 'currentColor' : 'none'"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {{ isFav ? "Saved" : "Save" }}
          </button>
        </div>

        <!-- Extra Info Cards -->
        <div class="grid sm:grid-cols-2 gap-4 pt-4">
          <div class="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-200 dark:border-blue-800">
            <div class="flex items-start gap-3">
              <div class="p-2 rounded-lg bg-blue-500 dark:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              </div>
              <div>
                <p class="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide mb-1">Free Delivery</p>
                <p class="text-sm text-blue-900 dark:text-blue-300 font-medium">On orders over $50</p>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-800">
            <div class="flex items-start gap-3">
              <div class="p-2 rounded-lg bg-green-500 dark:bg-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wide mb-1">Secure Payment</p>
                <p class="text-sm text-green-900 dark:text-green-300 font-medium">100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="isLightboxOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 dark:bg-black/98 p-4 backdrop-blur-sm"
        @click="closeLightbox"
      >
        <!-- Close Button -->
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Image -->
        <div class="relative max-w-6xl max-h-[90vh]" @click.stop>
          <img
            :src="images[selectedImageIndex]"
            :alt="product?.title"
            class="max-w-full max-h-[90vh] object-contain rounded-lg"
          />

          <!-- Navigation -->
          <button
            v-if="images.length > 1"
            @click="prevImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            v-if="images.length > 1"
            @click="nextImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Counter -->
          <div
            v-if="images.length > 1"
            class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm font-semibold backdrop-blur-md"
          >
            {{ selectedImageIndex + 1 }} / {{ images.length }}
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>