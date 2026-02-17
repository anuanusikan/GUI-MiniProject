<script setup lang="ts">
import { useRouter } from "vue-router"
import { useFavoritesStore } from "../stores/favoritesStore"

const router = useRouter()
const favs = useFavoritesStore()
</script>

<template>
  <section class="py-6 min-h-[70vh]">
    <!-- Header -->
    <div
      class="rounded-2xl border shadow-lg overflow-hidden
             border-gray-200 dark:border-white/10"
    >
    </div>
      <div
        class="p-6 sm:p-8
               bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.18),_transparent_60%),linear-gradient(135deg,_#f8fafc_0%,_#fde68a_40%,_#dbeafe_100%)]
               dark:bg-[radial-gradient(ellipse_at_top,_rgba(250,204,21,0.16),_transparent_60%),linear-gradient(135deg,_#000000_0%,_#111827_45%,_#a3a3a3_120%)]"
    >
      <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
        Favorites ❤️
      </h1>
      <p class="mt-1 text-sm text-gray-700/80 dark:text-white/70">
        Your saved products in one place.
      </p>
    </div>
    

    <!-- Empty -->
    <div
      v-if="!favs.items.length"
      class="mt-6 rounded-2xl border border-gray-200 dark:border-white/10
             bg-white dark:bg-gray-900 p-8 text-center"
    >
      <p class="text-xl font-extrabold text-gray-900 dark:text-white">No favorites yet</p>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">Tap the ❤️ on a product to save it.</p>
      <button
        class="mt-5 px-6 py-3 rounded-xl font-extrabold text-white
               bg-gradient-to-r from-black to-gray-800 dark:from-amber-400 dark:to-yellow-300
               hover:opacity-90 transition"
        @click="router.push('/')"
      >
        Explore Products
      </button>
    </div>

    <!-- Grid -->
    <div v-else class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="p in favs.items"
        :key="p.id"
        class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/30 backdrop-blur overflow-hidden"
      >
        <button class="w-full text-left" @click="router.push(`/product/${p.id}`)">
          <div class="bg-gray-50 dark:bg-gray-900 p-4">
            <img :src="(p as any).thumbnail" :alt="p.title" class="w-full h-44 object-contain" />
          </div>
          <div class="p-4">
            <p class="font-extrabold text-gray-900 dark:text-white line-clamp-1">{{ p.title }}</p>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{{ p.description }}</p>
          </div>
        </button>

        <div class="p-4 pt-0 flex items-center justify-between gap-3">
          <button
            class="px-4 py-2 rounded-xl font-bold
                   border border-gray-200 bg-white hover:bg-gray-50
                   dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white transition"
            @click="router.push(`/product/${p.id}`)"
          >
            View
          </button>

          <button
            class="px-4 py-2 rounded-xl font-bold text-red-600 dark:text-red-300
                   hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            @click="favs.remove(p.id)"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    
  </section>
</template>