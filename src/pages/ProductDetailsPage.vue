<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import type { Product } from "../types/product"
import { getProductById } from "../services/productService"
import { useCartStore } from "../stores/cartStore"
import { useToastStore } from "../stores/toastStore"
import { useFavoritesStore } from "../stores/favoritesStore"

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

/**
 * Currency: USD -> LKR
 * Change this rate anytime you want.
 */
const USD_TO_LKR = 320

function formatLKR(value: number) {
  const lkr = value * USD_TO_LKR
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(lkr)
}

onMounted(async () => {
  const id = Number(route.params.id)
  if (!id) {
    error.value = "Invalid product ID"
    loading.value = false
    return
  }

  try {
    product.value = await getProductById(id)
  } catch {
    error.value = "Failed to load product"
  } finally {
    loading.value = false
  }

  // keyboard support for lightbox
  window.addEventListener("keydown", handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown)
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

const originalUsdPrice = computed(() => {
  if (!product.value || discount.value === 0) return null
  // original = price / (1 - discount%)
  return product.value.price / (1 - discount.value / 100)
})

const priceLKR = computed(() => (product.value ? formatLKR(product.value.price) : ""))
const originalPriceLKR = computed(() =>
  originalUsdPrice.value ? formatLKR(originalUsdPrice.value) : null
)

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
</script>

<template>
  <!-- PAGE BACKGROUND
       Light: silver/gray + warm gold glow
       Dark: black + gold glow (your old premium dark vibe)
  -->
  <section
    class="py-6 min-h-screen rounded-2xl
           bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(245,205,95,0.35),transparent_55%),radial-gradient(900px_circle_at_90%_40%,rgba(120,120,120,0.20),transparent_55%),linear-gradient(135deg,#f5f6f7, #eef1f4, #f3f4f6)]
           dark:bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(245,205,95,0.18),transparent_55%),radial-gradient(900px_circle_at_85%_55%,rgba(255,255,255,0.06),transparent_55%),linear-gradient(135deg,#070708,#0b0b0e,#0f1014)]
           px-0 sm:px-2"
  >
    <!-- Back Button -->
    <button
      @click="router.back()"
      class="mb-6 inline-flex items-center gap-2 text-sm font-semibold
             text-[#7a5a12] hover:text-[#5f450e]
             dark:text-[#f5d06a] dark:hover:text-[#ffe2a3]
             transition-colors group px-2"
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
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-4
               border-[#b88a16] border-t-transparent
               dark:border-[#f5d06a] dark:border-t-transparent"
      ></div>
      <p class="mt-4 text-gray-700 dark:text-gray-300">Loading product...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-600 dark:text-red-400 text-lg font-semibold">{{ error }}</div>
    </div>

    <!-- Product Details -->
    <div
      v-else-if="product"
      class="grid lg:grid-cols-2 gap-8"
    >
      <!-- LEFT: Images -->
      <div>
        <!-- Main Image (Light: silver glass, Dark: black glass) -->
        <div
          class="rounded-2xl border shadow-xl overflow-hidden mb-4 cursor-pointer group
                 border-black/10 bg-white/55 backdrop-blur-md
                 dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-xl"
          @click="openLightbox"
        >
          <div class="aspect-square p-6 sm:p-8 flex items-center justify-center relative">
            <img
              :src="images[selectedImageIndex]"
              :alt="product.title"
              class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />

            <!-- Zoom Overlay -->
            <div
              class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity
                     bg-black/5 dark:bg-black/35"
            >
              <div
                class="rounded-full p-3 shadow-lg
                       bg-white/90 text-gray-800
                       dark:bg-black/55 dark:text-white
                       border border-black/10 dark:border-white/10 backdrop-blur-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>

            <!-- Discount Badge -->
            <span
              v-if="discount > 0"
              class="absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-extrabold
                     bg-gradient-to-r from-[#c79a1d] to-[#f1d38a] text-[#1b1405] shadow-lg
                     dark:from-[#b88a16] dark:to-[#f5d06a]"
            >
              Save {{ discount }}%
            </span>
          </div>
        </div>

        <!-- Thumbnail Gallery -->
        <div v-if="images.length > 1" class="flex gap-3 overflow-x-auto pb-2">
          <button
            v-for="(img, idx) in images"
            :key="idx"
            @click="selectImage(Number(idx))"
            class="flex-shrink-0 w-20 h-20 rounded-xl border overflow-hidden transition-all
                   bg-white/65 border-black/10
                   dark:bg-white/5 dark:border-white/10"
            :class="
              idx === selectedImageIndex
                ? 'ring-2 ring-[#c79a1d] shadow-lg scale-105 dark:ring-[#f5d06a]'
                : 'hover:border-[#c79a1d]/60 dark:hover:border-[#f5d06a]/60'
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
            class="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide
                   bg-white/70 border border-black/10 text-gray-800
                   dark:bg-white/5 dark:border-white/10 dark:text-white/90 backdrop-blur-md"
          >
            {{ product.category }}
          </span>
        </div>

        <!-- Title -->
        <h1
          class="text-3xl lg:text-4xl font-extrabold leading-tight
                 text-gray-900
                 dark:text-white"
        >
          {{ product.title }}
        </h1>

        <!-- Rating & Stock -->
        <div class="flex items-center gap-4 flex-wrap">
          <div
            class="flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md
                   bg-white/70 border-black/10 text-gray-900
                   dark:bg-white/5 dark:border-white/10 dark:text-white"
          >
            <span class="text-[#c79a1d] dark:text-[#f5d06a]">⭐</span>
            <span class="font-extrabold">{{ rating.toFixed(1) }}</span>
            <span class="text-sm text-gray-700 dark:text-gray-300">rating</span>
          </div>

          <div
            class="px-4 py-2 rounded-full font-semibold text-sm border backdrop-blur-md"
            :class="
              stock > 50
                ? 'bg-emerald-50/80 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800'
                : stock > 0
                ? 'bg-orange-50/80 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800'
                : 'bg-red-50/80 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
            "
          >
            {{ stock > 50 ? "In Stock" : stock > 0 ? `Only ${stock} left` : "Out of Stock" }}
          </div>
        </div>

        <!-- Price (LKR) -->
        <div class="flex items-baseline gap-3 flex-wrap">
          <span
            class="text-4xl font-extrabold
                   bg-gradient-to-r from-[#a63527] via-[#c79a1d] to-[#6b6b6b]
                   dark:from-[#f5d06a] dark:via-[#c79a1d] dark:to-[#cfcfcf]
                   bg-clip-text text-transparent"
          >
            {{ priceLKR }}
          </span>

          <span v-if="originalPriceLKR" class="text-xl text-gray-600 line-through dark:text-white/50">
            {{ originalPriceLKR }}
          </span>

          <span
            v-if="discount > 0"
            class="px-3 py-1 rounded-full text-sm font-extrabold
                   bg-gradient-to-r from-[#c79a1d] to-[#f1d38a] text-[#1b1405]
                   dark:from-[#b88a16] dark:to-[#f5d06a]"
          >
            Limited Deal
          </span>
        </div>

        <!-- Description -->
        <div
          class="p-5 rounded-xl border backdrop-blur-md
                 bg-white/70 border-black/10
                 dark:bg-white/5 dark:border-white/10"
        >
          <h3
            class="text-sm font-extrabold uppercase tracking-wide mb-2
                   text-gray-900 dark:text-white"
          >
            Description
          </h3>
          <p class="text-gray-700 dark:text-white/80 leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <!-- Quantity Selector -->
        <div class="flex items-center gap-4 flex-wrap">
          <label class="text-sm font-extrabold uppercase tracking-wide text-gray-900 dark:text-white">
            Quantity:
          </label>

          <div class="flex items-center gap-2">
            <button
              @click="qty > 1 ? qty-- : null"
              :disabled="qty <= 1"
              class="w-10 h-10 rounded-lg border
                     bg-white/70 border-black/10 text-gray-900
                     hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed
                     dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10
                     font-extrabold text-lg transition-all"
            >
              -
            </button>

            <input
              v-model.number="qty"
              type="number"
              min="1"
              :max="stock"
              class="w-20 h-10 text-center font-extrabold text-lg rounded-lg border
                     bg-white/70 border-black/10 text-gray-900
                     dark:bg-white/5 dark:border-white/10 dark:text-white
                     focus:ring-2 focus:ring-[#c79a1d] dark:focus:ring-[#f5d06a] focus:border-transparent"
            />

            <button
              @click="qty < stock ? qty++ : null"
              :disabled="qty >= stock"
              class="w-10 h-10 rounded-lg border
                     bg-white/70 border-black/10 text-gray-900
                     hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed
                     dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10
                     font-extrabold text-lg transition-all"
            >
              +
            </button>
          </div>
        </div>

        <!-- Action Buttons (Add to Cart SHORTER) -->
        <div class="flex gap-3 flex-wrap items-center">
          <!-- Shorter width: not flex-1 -->
          <button
            @click="addToCart"
            :disabled="stock === 0"
            class="px-8 py-4 rounded-xl font-extrabold text-lg
                   bg-gradient-to-r from-[#c79a1d] to-[#f1d38a]
                   text-[#1b1405] shadow-lg
                   hover:shadow-xl hover:scale-[1.02] active:scale-[0.99]
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200
                   inline-flex items-center justify-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Add to Cart
          </button>

          <button
            @click="toggleFav"
            class="px-8 py-4 rounded-xl font-extrabold border
                   transition-all duration-200 hover:scale-[1.02] active:scale-[0.99]
                   inline-flex items-center justify-center gap-2"
            :class="
              isFav
                ? 'border-[#c79a1d] bg-[#fff4d0] text-[#6a4a0a] dark:bg-[#c79a1d]/15 dark:text-[#f5d06a] dark:border-[#f5d06a]/40'
                : 'border-black/10 bg-white/70 text-gray-800 hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10'
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
        <div class="grid sm:grid-cols-3 gap-4 pt-2">
          <div
            class="p-4 rounded-xl border backdrop-blur-md
                   bg-white/70 border-black/10
                   dark:bg-white/5 dark:border-white/10"
          >
            <p class="text-xs font-extrabold uppercase tracking-wide text-[#8a6a14] dark:text-[#f5d06a]">
              Fast Delivery
            </p>
            <p class="mt-1 text-sm text-gray-700 dark:text-white/75">
              Island-wide options
            </p>
          </div>

          <div
            class="p-4 rounded-xl border backdrop-blur-md
                   bg-white/70 border-black/10
                   dark:bg-white/5 dark:border-white/10"
          >
            <p class="text-xs font-extrabold uppercase tracking-wide text-[#8a6a14] dark:text-[#f5d06a]">
              Secure Checkout
            </p>
            <p class="mt-1 text-sm text-gray-700 dark:text-white/75">
              Safe payment flow
            </p>
          </div>

          <div
            class="p-4 rounded-xl border backdrop-blur-md
                   bg-white/70 border-black/10
                   dark:bg-white/5 dark:border-white/10"
          >
            <p class="text-xs font-extrabold uppercase tracking-wide text-[#8a6a14] dark:text-[#f5d06a]">
              Premium Deals
            </p>
            <p class="mt-1 text-sm text-gray-700 dark:text-white/75">
              Gold-tier offers
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="isLightboxOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4
               bg-black/90 backdrop-blur-sm"
        @click="closeLightbox"
      >
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 p-3 rounded-full
                 bg-white/10 hover:bg-white/20 text-white
                 backdrop-blur-md transition-all hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="relative max-w-6xl max-h-[90vh]" @click.stop>
          <img
            :src="images[selectedImageIndex]"
            :alt="product?.title"
            class="max-w-full max-h-[90vh] object-contain rounded-lg"
          />

          <button
            v-if="images.length > 1"
            @click="prevImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full
                   bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            v-if="images.length > 1"
            @click="nextImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full
                   bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            v-if="images.length > 1"
            class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full
                   bg-black/50 text-white text-sm font-semibold backdrop-blur-md"
          >
            {{ selectedImageIndex + 1 }} / {{ images.length }}
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>