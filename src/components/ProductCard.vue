<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import type { Product } from "../types/product"
import { useCartStore } from "../stores/cartStore"
import { useToastStore } from "../stores/toastStore"
import { useFavoritesStore } from "../stores/favoritesStore"
import { useAuthStore } from "../stores/authStore"
import { toLKR, formatLKR } from "../utils/currency"

const props = defineProps<{ product: Product }>()


const router = useRouter()
const cart = useCartStore()
const toast = useToastStore()
const favs = useFavoritesStore()
const auth = useAuthStore()

const discount = computed(() => Math.round(props.product.discountPercentage ?? 0))
const rating = computed(() => Number(props.product.rating ?? 0))
const isFav = computed(() => favs.has(props.product.id))



function goDetails() {
  router.push(`/product/${props.product.id}`)
}

function addToCart() {
  // Check if user is authenticated
  if (!auth.isAuthenticated) {
    toast.show("Please sign in to add items to cart", "error")
    router.push("/signin")
    return
  }

  const ok = cart.addToCart(props.product, 1)
  if (ok) toast.show("Added to cart", "success")
}

function toggleFav() {
  const added = favs.toggle(props.product)
  toast.show(added ? "Added to favorites" : "Removed from favorites", "info")
}
</script>

<template>
  <article class="group overflow-hidden rounded-2xl border transition-all duration-300
         hover:-translate-y-1 hover:shadow-2xl

         bg-gradient-to-br from-[#f2f2f2] via-[#dcdcdc] to-[#f7f7f7]
         border-gray-300

         dark:bg-gradient-to-br dark:from-black dark:via-[#1a1a1a] dark:to-[#0a0a0a]
         dark:border-white/10">
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none
            bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/10">
    </div>
    <!-- ================= IMAGE AREA ================= -->
    <div class="relative overflow-hidden
             bg-gradient-to-br from-[#ffffff] via-[#eeeeee] to-[#dcdcdc]
             dark:bg-gradient-to-br dark:from-[#050505] dark:via-[#141414] dark:to-black">
      <button type="button" class="block w-full text-left" @click="goDetails" aria-label="Open product details">
        <div class="aspect-square w-full p-6 flex items-center justify-center">
          <img :src="product.thumbnail" :alt="product.title"
            class="max-h-[210px] w-auto object-contain transition-transform duration-300 group-hover:scale-110"
            loading="lazy" />
        </div>
      </button>

      <!-- Discount badge -->
      <span v-if="discount > 0" class="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-extrabold
               bg-gradient-to-r from-[#d4a73a] to-[#f5d27a] text-black shadow-lg">
        -{{ discount }}%
      </span>

      <!-- Favorite button -->
      <button type="button" class="absolute right-3 top-3 h-11 w-11 rounded-full grid place-items-center
               border transition-all duration-200
               bg-white/90 border-black/10 hover:scale-110 hover:bg-white
               dark:bg-black/60 dark:border-white/15 dark:hover:bg-black/80" @click="toggleFav"
        :aria-label="isFav ? 'Remove from favorites' : 'Add to favorites'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 transition-all"
          :class="isFav ? 'text-red-600 dark:text-red-400 scale-110' : 'text-[#7a5a12] dark:text-[#f5d27a]'"
          fill="currentColor">
          <path
            d="M12 21s-7.2-4.35-9.33-8.28C.8 9.1 2.09 5.97 5.2 4.75c2.02-.8 4.17.02 5.52 1.52C12.06 4.77 14.2 3.95 16.22 4.75c3.11 1.22 4.4 4.35 2.53 7.97C19.2 16.65 12 21 12 21z" />
        </svg>
      </button>

      <!-- Soft glow line (theme detail) -->
      <div class="absolute inset-x-0 bottom-0 h-[2px]
               bg-gradient-to-r from-transparent via-[#d4a73a]/70 to-transparent
               dark:via-[#f5d27a]/70"></div>
    </div>

    <!-- ================= CONTENT AREA ================= -->
    <div class="p-5">
      <!-- Category + Rating row -->
      <div class="flex items-center justify-between gap-3">
        <span class="text-xs font-bold px-3 py-1 rounded-full
                 border bg-[#fff8e6] text-[#7a5a12] border-[#e9d39a]
                 dark:bg-black/40 dark:text-[#f5d27a] dark:border-white/10">
          {{ product.category }}
        </span>

        <div class="flex items-center gap-1.5">
          <span class="text-yellow-500 dark:text-yellow-400">⭐</span>
          <span class="text-sm font-extrabold text-gray-900 dark:text-white">
            {{ rating.toFixed(1) }}
          </span>
        </div>
      </div>

      <!-- Product title (UPDATED FONT STYLE) -->
      <button type="button" class="text-left w-full mt-3" @click="goDetails">
        <h3 class="text-[17px] sm:text-[18px] font-extrabold leading-snug tracking-tight
                 text-gray-900 group-hover:text-black
                 dark:text-[#f5d27a] dark:group-hover:text-white
                 line-clamp-2">
          {{ product.title }}
        </h3>

        <p class="mt-2 text-sm leading-relaxed line-clamp-2
                 text-gray-600 dark:text-white/70">
          {{ product.description }}
        </p>
      </button>

      <!-- Price + buttons -->
      <div class="mt-4 flex items-end justify-between gap-3">
        <div>
          <p class="text-2xl font-extrabold bg-gradient-to-r from-red-800 to-purple-600 dark:from-red-800 dark:to-purple-400 
          bg-clip-text text-transparent">
           {{ formatLKR(toLKR(product.price)) }}
          </p>

          <p v-if="discount > 0" class="text-xs text-gray-500 dark:text-gray-400 line-through">
            {{ formatLKR(toLKR(product.price / (1 - discount / 100))) }}
          </p>
        </div>

        <!-- Add to cart -->
        <button class="rounded-xl px-5 py-2.5 text-sm font-extrabold
                 bg-gradient-to-r from-[#d4a73a] to-[#f5d27a]
                 text-black shadow-lg
                 hover:brightness-110 hover:scale-[1.03] active:scale-95 transition-all" @click="addToCart">
          Add
        </button>
      </div>

      <!-- View details button -->
      <button type="button" class="mt-3 w-full rounded-xl py-2.5 text-sm font-extrabold
               border transition-all
               border-black/10 text-gray-900 bg-white hover:bg-[#fff8e6]
               dark:border-white/15 dark:text-[#f5d27a] dark:bg-black/30 dark:hover:bg-black/50" @click="goDetails">
        View Details →
      </button>
    </div>
  </article>
</template>