<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import type { Product } from "../types/product"
import { useCartStore } from "../stores/cartStore"
import { useToastStore } from "../stores/toastStore"
import { useFavoritesStore } from "../stores/favoritesStore"
import QuickViewModal from "../QuickViewModal.vue"

const props = defineProps<{ product: Product }>()

const router = useRouter()
const cart = useCartStore()
const toast = useToastStore()
const favs = useFavoritesStore()

const isQuickOpen = ref(false)

const discount = computed(() => Math.round((props.product as any).discountPercentage ?? 0))
const rating = computed(() => Number((props.product as any).rating ?? 0))
const isFav = computed(() => favs.has(props.product.id))

function addToCart() {
  cart.addToCart(props.product, 1)
  toast.show("Added to cart", "success")
}

function toggleFav() {
  favs.toggle(props.product)
  toast.show(isFav.value ? "Added to favorites" : "Removed from favorites", "info")
}

function openQuick() {
  isQuickOpen.value = true
}
function closeQuick() {
  isQuickOpen.value = false
}

function goDetails() {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <article class="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm
           hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
    <!-- Image -->
    <div class="relative bg-gray-50">
      <button type="button" class="block w-full text-left" @click="goDetails" aria-label="Open product details">
        <div class="relative bg-gradient-to-b from-gray-50 to-white">
          <div class="aspect-[4/3] w-full p-4">
            <img :src="(product as any).thumbnail" :alt="product.title"
              class="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              loading="lazy" />
          </div>
        </div>
      </button>

      <!-- Discount badge -->
      <span v-if="discount > 0" class="absolute left-3 top-3 inline-flex items-center rounded-full bg-emerald-600
               px-2.5 py-1 text-xs font-bold text-white shadow">
        -{{ discount }}%
      </span>

      <!-- Wishlist heart -->
      <button type="button" class="absolute right-3 top-3 h-10 w-10 rounded-full border border-gray-200 bg-white/95
               grid place-items-center shadow-sm hover:bg-white transition" @click="toggleFav"
        :aria-label="isFav ? 'Remove from favorites' : 'Add to favorites'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5"
          :class="isFav ? 'text-rose-600' : 'text-gray-500'" fill="currentColor">
          <path
            d="M12 21s-7.2-4.35-9.33-8.28C.8 9.1 2.09 5.97 5.2 4.75c2.02-.8 4.17.02 5.52 1.52C12.06 4.77 14.2 3.95 16.22 4.75c3.11 1.22 4.4 4.35 2.53 7.97C19.2 16.65 12 21 12 21z" />
        </svg>
      </button>

      <!-- Quick view button (shows on hover) -->
      <button type="button" class="absolute left-3 bottom-3 opacity-0 group-hover:opacity-100 transition
               rounded-full bg-black/70 text-white text-xs font-semibold px-3 py-2" @click="openQuick">
        Quick View
      </button>
    </div>

    <!-- Content -->
    <div class="p-4">
      <button type="button" class="text-left w-full" @click="goDetails">
        <h3 class="font-extrabold text-gray-900 leading-snug line-clamp-1">
          {{ product.title }}
        </h3>

        <p class="mt-1 text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
          {{ product.description }}
        </p>
      </button>

      <!-- Rating -->
      <div class="mt-3 flex items-center gap-2 text-sm">
        <span class="font-semibold text-gray-900">⭐ {{ rating.toFixed(1) }}</span>
        <span class="text-gray-500">rating</span>
        <span
          class="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200 text-gray-700 bg-gray-50">
          {{ (product as any).category }}
        </span>
      </div>

      <!-- Price row -->
      <div class="mt-4 flex items-end justify-between">
        <p class="text-lg font-extrabold text-gray-900">${{ product.price }}</p>

        <button class="rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm font-semibold
                 hover:bg-indigo-700 active:scale-[0.99] transition" @click="addToCart">
          Add
        </button>
      </div>

      <!-- Details link -->
      <button type="button" class="mt-3 w-full rounded-xl border border-gray-200 py-2 text-sm font-semibold text-gray-900
               hover:bg-gray-50 transition" @click="goDetails">
        View Details
      </button>
    </div>

    <!-- Quick view modal -->
    <QuickViewModal :open="isQuickOpen" :product="product" @close="closeQuick" @add="addToCart" @details="goDetails" />
  </article>
</template>