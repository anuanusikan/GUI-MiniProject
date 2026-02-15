<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import { useFavoritesStore } from "../stores/favoritesStore"
import { useCartStore } from "../stores/cartStore"
import { useToastStore } from "../stores/toastStore"
import type { Product } from "../types/product"


const router = useRouter()
const favs = useFavoritesStore()
const cart = useCartStore()
const toast = useToastStore()

const items = computed(() => favs.items)

function addToCart(item: Product) {
  cart.addToCart(item, 1)
  toast.show("Added to cart", "success")
}

function remove(id: number) {
  favs.remove(id)
  toast.show("Removed from favorites", "info")
}

function clearAll() {
  if (confirm("Remove all items from favorites?")) {
    favs.clear()
    toast.show("All favorites cleared", "info")
  }
}

function goToProduct(id: number) {
  router.push(`/product/${id}`)
}
</script>

<template>
  <section class="py-6 min-h-screen">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">
        My Favorites
      </h1>

      <button
        v-if="items.length > 0"
        @click="clearAll"
        class="px-4 py-2 rounded-xl text-sm font-semibold
               border-2 border-red-300 dark:border-red-700
               text-red-600 dark:text-red-400
               hover:bg-red-50 dark:hover:bg-red-900/20
               transition-all"
      >
        Clear All
      </button>
    </div>

    <!-- Count -->
    <p v-if="items.length > 0" class="text-sm text-gray-600 dark:text-gray-400 mb-4">
      {{ items.length }} item{{ items.length !== 1 ? "s" : "" }} in your favorites
    </p>

    <!-- Empty State -->
    <div
      v-if="items.length === 0"
      class="text-center py-16 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 
             bg-gray-50 dark:bg-gray-800/50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-24 w-24 mx-auto text-gray-400 dark:text-gray-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">No favorites yet</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">Start adding products you love!</p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold
               bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500
               text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        Browse Products
      </router-link>
    </div>

    <!-- Favorites Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <article
        v-for="item in items"
        :key="item.id"
        class="group rounded-2xl overflow-hidden shadow-sm
               hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
               bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-800 dark:to-gray-900
               border border-gray-200 dark:border-gray-700"
      >
        <!-- Image -->
        <button 
          type="button"
          @click="goToProduct(item.id)"
          class="relative w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 block"
        >
          <div class="aspect-square p-5 flex items-center justify-center">
            <img
              :src="item.thumbnail"
              :alt="item.title"
              class="max-h-[200px] w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          <!-- Discount Badge -->
          <span
            v-if="(item as any).discountPercentage > 0"
            class="absolute left-3 top-3 inline-flex items-center rounded-full 
                   bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600
                   px-3 py-1.5 text-xs font-bold text-white shadow-lg"
          >
            -{{ Math.round((item as any).discountPercentage) }}%
          </span>
        </button>

        <!-- Content -->
        <div class="p-5">
          <button 
            type="button"
            @click="goToProduct(item.id)"
            class="text-left w-full"
          >
            <h3 class="font-extrabold text-gray-900 dark:text-white leading-snug line-clamp-2 min-h-[3rem]
                       group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {{ item.title }}
            </h3>
          </button>

          <!-- Category & Rating -->
          <div class="mt-3 flex items-center gap-2 text-sm flex-wrap">
            <div class="flex items-center gap-1">
              <span class="text-yellow-500 dark:text-yellow-400">⭐</span>
              <span class="font-bold text-gray-900 dark:text-white">
                {{ ((item as any).rating ?? 0).toFixed(1) }}
              </span>
            </div>
            <span class="text-gray-400 dark:text-gray-500">|</span>
            <span class="text-xs font-semibold px-3 py-1 rounded-full 
                         bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950
                         border border-indigo-200 dark:border-indigo-800
                         text-indigo-700 dark:text-indigo-300">
              {{ item.category }}
            </span>
          </div>

          <!-- Price -->
          <div class="mt-4">
            <p class="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 
                      bg-clip-text text-transparent">
              ${{ item.price }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="mt-4 flex gap-2">
            <button
              @click="addToCart(item)"
              class="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500
                     text-white px-4 py-2.5 text-sm font-bold
                     hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200
                     flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Add
            </button>

            <button
              @click="remove(item.id)"
              class="flex-shrink-0 px-4 py-2.5 rounded-xl
                     border-2 border-red-300 dark:border-red-700
                     text-red-600 dark:text-red-400
                     hover:bg-red-50 dark:hover:bg-red-900/20
                     transition-all hover:scale-105 active:scale-95"
              title="Remove from favorites"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 21s-7.2-4.35-9.33-8.28C.8 9.1 2.09 5.97 5.2 4.75c2.02-.8 4.17.02 5.52 1.52C12.06 4.77 14.2 3.95 16.22 4.75c3.11 1.22 4.4 4.35 2.53 7.97C19.2 16.65 12 21 12 21z"
                />
              </svg>
            </button>
          </div>

          <!-- View Details Link -->
          <button
            type="button"
            @click="goToProduct(item.id)"
            class="mt-3 w-full rounded-xl py-2.5 text-sm font-bold
                   relative overflow-hidden
                   bg-white dark:bg-gray-900
                   hover:shadow-md transition-all duration-200
                   border-2 border-transparent
                   view-details-btn"
          >
            <span class="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 
                         bg-clip-text text-transparent font-bold">
              View Details
            </span>
          </button>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
/* Gradient border for View Details button */
.view-details-btn {
  position: relative;
  background: white;
}

.dark .view-details-btn {
  background: rgb(17, 24, 39);
}

.view-details-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  padding: 2px;
  background: linear-gradient(to right, rgb(79, 70, 229), rgb(147, 51, 234));
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.dark .view-details-btn::before {
  background: linear-gradient(to right, rgb(129, 140, 248), rgb(192, 132, 252));
}
</style>