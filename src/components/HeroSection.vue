<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import type { Product } from "../types/product"

const props = defineProps<{
  featuredProduct: Product | null
}>()

const router = useRouter()

function goFeatured() {
  if (!props.featuredProduct) return
  router.push(`/product/${props.featuredProduct.id}`)
}

const discount = computed(() =>
  props.featuredProduct
    ? Math.round((props.featuredProduct as any).discountPercentage ?? 0)
    : 0
)

const rating = computed(() =>
  props.featuredProduct
    ? Number((props.featuredProduct as any).rating ?? 0)
    : 0
)

const category = computed(() =>
  props.featuredProduct
    ? String((props.featuredProduct as any).category ?? "")
    : ""
)
</script>

<template>
  <section class="mb-6">
    <div class="rounded-3xl overflow-hidden border shadow-lg border-black/10 dark:border-yellow-500/20">
      <div
        class="p-6 sm:p-8 relative
               bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.22),transparent_55%),linear-gradient(135deg,#f7fafc,#eef2f7,#f6e7b0)]
               dark:bg-[radial-gradient(circle_at_top_left,rgba(255,215,0,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_55%),linear-gradient(135deg,#0a0a0a,#111827,#000000)]"
      >
        <!-- glow -->
        <div class="pointer-events-none absolute inset-0 opacity-40 dark:opacity-30">
          <div class="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/40 blur-3xl dark:bg-yellow-500/10"></div>
          <div class="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl dark:bg-white/5"></div>
        </div>

        <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <!-- LEFT SIDE -->
          <div>
            <p class="text-xs font-bold tracking-widest uppercase text-black/70 dark:text-yellow-200/80">
              🔥 Featured Today
            </p>

            <h1 class="mt-3 text-2xl sm:text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Shop in
              <span class="bg-gradient-to-r from-yellow-600 to-amber-500 dark:from-yellow-300 dark:to-amber-200 bg-clip-text text-transparent">
                Gold Deals
              </span>
            </h1>

            <p class="mt-3 text-gray-700 dark:text-gray-300 max-w-xl">
              Premium shopping experience with daily flash sales and rewards.
            </p>

            <!-- Buttons -->
            <div class="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                class="rounded-full px-6 py-3 font-bold
                       bg-gradient-to-r from-yellow-600 to-amber-500 text-black
                       hover:brightness-110 transition shadow-md"
                @click="goFeatured"
              >
                View Product
              </button>

              <a
                href="#products"
                class="rounded-full px-6 py-3 font-bold text-center
                       border border-black/20 text-gray-900 bg-white/60
                       hover:bg-white/80 transition
                       dark:border-white/15 dark:text-white dark:bg-black/20 dark:hover:bg-black/30"
              >
                Browse Products
              </a>
            </div>

            <!-- BENEFIT BOXES -->
            <div class="mt-6 space-y-3">
              <div class="rounded-xl p-4 border border-black/10 bg-white/60 dark:border-yellow-500/15 dark:bg-black/30">
                <p class="font-bold text-gray-900 dark:text-white">🚚 Free Delivery</p>
                <p class="text-sm text-gray-700 dark:text-gray-300">Orders above $50</p>
              </div>

              <div class="rounded-xl p-4 border border-black/10 bg-white/60 dark:border-yellow-500/15 dark:bg-black/30">
                <p class="font-bold text-gray-900 dark:text-white">🎁 Gifts & Rewards</p>
                <p class="text-sm text-gray-700 dark:text-gray-300">Seasonal bonuses & perks</p>
              </div>

              <div class="rounded-xl p-4 border border-black/10 bg-white/60 dark:border-yellow-500/15 dark:bg-black/30">
                <p class="font-bold text-gray-900 dark:text-white">⚡ Flash Sales</p>
                <p class="text-sm text-gray-700 dark:text-gray-300">Limited-time deals daily</p>
              </div>
            </div>
          </div>

          <!-- RIGHT SIDE — FEATURED PRODUCT -->
          <div
            class="p-6 rounded-3xl border
                   border-black/10 bg-white/60 backdrop-blur
                   dark:border-yellow-500/15 dark:bg-black/30"
          >
            <div v-if="featuredProduct" class="text-center">
              
              <!-- LARGE IMAGE -->
              <div
                class="mx-auto h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64
                       rounded-2xl overflow-hidden
                       bg-white/80 dark:bg-white/5
                       border border-black/10 dark:border-white/10
                       flex items-center justify-center"
              >
                <img
                  :src="(featuredProduct as any).thumbnail"
                  :alt="featuredProduct.title"
                  class="h-full w-full object-contain p-4"
                />
              </div>

              <p class="mt-4 text-xs font-bold text-gray-500 dark:text-gray-400">
                {{ category }}
              </p>

              <h3 class="text-xl font-extrabold text-gray-900 dark:text-white">
                {{ featuredProduct.title }}
              </h3>

              <div class="mt-2 flex justify-center gap-2">
                <span class="px-3 py-1 text-xs rounded-full bg-yellow-200/70 dark:bg-yellow-500/15">
                  ⭐ {{ rating.toFixed(1) }}
                </span>
                <span v-if="discount" class="px-3 py-1 text-xs rounded-full bg-emerald-200/70 dark:bg-emerald-500/15">
                  Save {{ discount }}%
                </span>
              </div>

              <button
                class="mt-5 px-6 py-2 rounded-full font-bold
                       bg-black text-white hover:bg-gray-800 transition
                       dark:bg-yellow-500/15 dark:text-yellow-200 dark:hover:bg-yellow-500/25"
                @click="goFeatured"
              >
                View Details →
              </button>
            </div>

            <div v-else class="text-gray-700 dark:text-gray-300 text-center">
              Loading featured product...
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>