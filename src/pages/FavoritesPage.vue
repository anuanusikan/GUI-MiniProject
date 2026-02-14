<script setup lang="ts">
import { useFavoritesStore } from "../stores/favoritesStore"
import { useCartStore } from "../stores/cartStore"
import { useToastStore } from "../stores/toastStore"

const favs = useFavoritesStore()
const cart = useCartStore()
const toast = useToastStore()

function addToCart(item: any) {
  cart.addToCart(item, 1)
  toast.show("Added to cart", "success")
}

function remove(id: number) {
  favs.remove(id)
  toast.show("Removed from favorites", "info")
}
</script>

<template>
  <section class="py-6">
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-bold text-gray-900">Your Favorites</h1>

      <button
        v-if="favs.items.length"
        class="text-sm font-semibold text-red-600 hover:underline"
        @click="favs.clear()"
      >
        Clear all
      </button>
    </div>

    <!-- Empty -->
    <div
      v-if="!favs.items.length"
      class="rounded-xl border border-gray-200 bg-white p-6 text-gray-700"
    >
      You haven't added any favorites yet ❤️
    </div>

    <!-- Favorites grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="item in favs.items"
        :key="item.id"
        class="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
      >
        <img
          :src="item.thumbnail"
          class="h-44 w-full object-cover"
        />

        <div class="p-4">
          <h3 class="font-bold text-gray-900 line-clamp-1">
            {{ item.title }}
          </h3>

          <p class="text-sm text-gray-500 mt-1">
            {{ item.category }}
          </p>

          <div class="mt-3 flex items-center justify-between">
            <span class="font-bold text-gray-900">
              ${{ item.price }}
            </span>

            <span class="text-sm font-semibold text-gray-700">
              ⭐ {{ item.rating?.toFixed(1) }}
            </span>
          </div>

          <div class="mt-4 flex gap-2">
            <button
              class="flex-1 rounded-lg bg-indigo-600 text-white py-2 text-sm font-semibold hover:bg-indigo-700"
              @click="addToCart(item)"
            >
              Add
            </button>

            <button
              class="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold hover:bg-gray-50"
              @click="remove(item.id)"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>