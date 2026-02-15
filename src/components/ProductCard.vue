<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import type { Product } from "../types/product"
import { useCartStore } from "../stores/cartStore"
import { useToastStore } from "../stores/toastStore"
import { useFavoritesStore } from "../stores/favoritesStore"

const props = defineProps<{ product: Product }>()

const router = useRouter()
const cart = useCartStore()
const toast = useToastStore()
const favs = useFavoritesStore()

const discount = computed(() => Math.round((props.product as any).discountPercentage ?? 0))
const rating = computed(() => Number((props.product as any).rating ?? 0))
const isFav = computed(() => favs.has(props.product.id))

function goDetails() {
  router.push(`/product/${props.product.id}`)
}

function addToCart() {
  const ok = cart.addToCart(props.product, 1)
  if (ok) toast.show("Added to cart", "success")
}

function toggleFav() {
  const added = favs.toggle(props.product)
  toast.show(added ? "Added to favorites" : "Removed from favorites", "info")
}
</script>

<template>
  <article
    class="group rounded-2xl overflow-hidden
           bg-white dark:bg-gray-900
           border border-gray-200 dark:border-gray-700
           shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <!-- IMAGE AREA -->
    <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <!-- Whole image is clickable -->
      <button
        type="button"
        class="block w-full text-left"
        @click="goDetails"
        aria-label="Open product details"
      >
        <div class="aspect-square w-full p-4 sm:p-5 flex items-center justify-center">
          <img
            :src="(product as any).thumbnail"
            :alt="product.title"
            class="max-h-[190px] sm:max-h-[210px] w-auto object-contain
                   transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </button>

      <!-- Discount Badge -->
      <span
        v-if="discount > 0"
        class="absolute left-3 top-3 inline-flex items-center rounded-full
               bg-gradient-to-r from-emerald-500 to-teal-500
               px-3 py-1.5 text-xs font-extrabold text-white shadow-lg"
      >
        -{{ discount }}%
      </span>

      <!-- Favorite button: BIG tap target for mobile -->
      <button
        type="button"
        class="absolute right-3 top-3 h-11 w-11 rounded-full
               backdrop-blur-md bg-white/90 dark:bg-gray-800/90
               border border-gray-200/60 dark:border-gray-600/50
               grid place-items-center shadow-md
               active:scale-95 hover:scale-105 transition"
        @click="toggleFav"
        :aria-label="isFav ? 'Remove from favorites' : 'Add to favorites'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-5 w-5"
          :class="isFav ? 'text-rose-500 dark:text-rose-400' : 'text-gray-400 dark:text-gray-500'"
          fill="currentColor"
        >
          <path
            d="M12 21s-7.2-4.35-9.33-8.28C.8 9.1 2.09 5.97 5.2 4.75c2.02-.8 4.17.02 5.52 1.52C12.06 4.77 14.2 3.95 16.22 4.75c3.11 1.22 4.4 4.35 2.53 7.97C19.2 16.65 12 21 12 21z"
          />
        </svg>
      </button>
    </div>

    <!-- CONTENT -->
    <div class="p-4 sm:p-5">
      <!-- Title -->
      <button type="button" class="text-left w-full" @click="goDetails">
        <h3
          class="font-extrabold text-gray-900 dark:text-white leading-snug
                 line-clamp-2 min-h-[2.75rem]
                 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition"
        >
          {{ product.title }}
        </h3>
      </button>

      <!-- Small description (mobile-friendly) -->
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
        {{ product.description }}
      </p>

      <!-- Rating + Category -->
      <div class="mt-3 flex items-center gap-2 text-sm flex-wrap">
        <div class="flex items-center gap-1">
          <span class="text-yellow-500 dark:text-yellow-400">⭐</span>
          <span class="font-bold text-gray-900 dark:text-white">{{ rating.toFixed(1) }}</span>
        </div>

        <span class="text-gray-300 dark:text-gray-600">•</span>

        <span
          class="text-xs font-semibold px-3 py-1 rounded-full
                 bg-indigo-50 dark:bg-indigo-950/40
                 border border-indigo-200 dark:border-indigo-800
                 text-indigo-700 dark:text-indigo-300"
        >
          {{ (product as any).category }}
        </span>
      </div>

      <!-- PRICE + CTA (Mobile first) -->
      <div class="mt-4 flex items-end justify-between gap-3">
        <div class="min-w-0">
          <p class="text-2xl font-extrabold text-gray-900 dark:text-white">
            ${{ product.price }}
          </p>
          <p v-if="discount > 0" class="text-xs text-gray-500 dark:text-gray-400 line-through">
            ${{ (product.price / (1 - discount / 100)).toFixed(2) }}
          </p>
        </div>
      </div>

      <!-- Buttons: stacked on mobile, row on bigger screens -->
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          class="w-full rounded-xl py-3 sm:py-2.5 text-sm font-bold
                 bg-gradient-to-r from-indigo-600 to-purple-600
                 text-white shadow-md
                 hover:shadow-lg active:scale-[0.99] transition
                 flex items-center justify-center gap-2"
          @click="addToCart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            />
          </svg>
          Add to Cart
        </button>

        <button
          type="button"
          class="w-full rounded-xl py-3 sm:py-2.5 text-sm font-bold
                 border border-gray-200 dark:border-gray-700
                 bg-white dark:bg-gray-950
                 text-gray-900 dark:text-white
                 hover:bg-gray-50 dark:hover:bg-gray-900
                 active:scale-[0.99] transition"
          @click="goDetails"
        >
          View Details
        </button>
      </div>
    </div>
  </article>
</template>