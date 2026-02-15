<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"
import type { Product } from "../types/product"
import { getAllProducts } from "../services/productService"
import ProductCard from "../components/ProductCard.vue"

const loading = ref(true)
const error = ref<string | null>(null)
const allProducts = ref<Product[]>([])

const minDiscount = ref(15)

// ---------------- Persistent Countdown ----------------
const LS_DEAL_END = "shopinhaven_deal_end"
const DEAL_DURATION_SECONDS = 2 * 60 * 60 + 15 * 60 + 20 // 2:15:20 demo

const secondsLeft = ref(0)
let timer: number | undefined

function pad(n: number) {
  return String(n).padStart(2, "0")
}

const countdownText = computed(() => {
  const s = Math.max(0, secondsLeft.value)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${pad(h)}:${pad(m)}:${pad(sec)}`
})

function getOrCreateDealEnd(): number {
  const raw = localStorage.getItem(LS_DEAL_END)
  const now = Date.now()

  if (raw) {
    const end = Number(raw)
    if (!Number.isNaN(end) && end > now) return end
  }

  const newEnd = now + DEAL_DURATION_SECONDS * 1000
  localStorage.setItem(LS_DEAL_END, String(newEnd))
  return newEnd
}

function startCountdown() {
  const endTime = getOrCreateDealEnd()

  const tick = () => {
    const diffMs = endTime - Date.now()
    secondsLeft.value = Math.max(0, Math.floor(diffMs / 1000))
  }

  tick()

  if (timer) window.clearInterval(timer)
  timer = window.setInterval(tick, 1000)
}

// (Optional demo helper)
// function resetDealsTimer() {
//   localStorage.removeItem(LS_DEAL_END)
//   startCountdown()
// }

// ---------------- Sorting ----------------
type SortKey = "discount" | "priceAsc" | "priceDesc" | "rating"

const sortBy = ref<SortKey>("discount")

function fmtPct(v: any) {
  const n = Number(v ?? 0)
  return `${Math.round(n)}%`
}

const offerProducts = computed(() => {
  const filtered = allProducts.value.filter((p: any) => (p.discountPercentage ?? 0) >= minDiscount.value)

  const sorted = [...filtered].sort((a: any, b: any) => {
    if (sortBy.value === "discount") return (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0)
    if (sortBy.value === "rating") return (b.rating ?? 0) - (a.rating ?? 0)
    if (sortBy.value === "priceAsc") return (a.price ?? 0) - (b.price ?? 0)
    if (sortBy.value === "priceDesc") return (b.price ?? 0) - (a.price ?? 0)
    return 0
  })

  return sorted.slice(0, 40)
})

onMounted(async () => {
  try {
    allProducts.value = await getAllProducts()
  } catch {
    error.value = "Unable to load offers"
  } finally {
    loading.value = false
  }

  startCountdown()
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<template>
  <section class="py-6">
    <!-- Hero -->
    <div class="rounded-2xl bg-gradient-to-r from-[#7a1f1f] to-indigo-700 text-white p-6 sm:p-8">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold">Today’s Offers</h1>
          <p class="mt-2 text-white/90">
            Grab limited-time discounts across popular products.
          </p>
        </div>

        <!-- Countdown -->
        <div class="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
          <p class="text-xs uppercase tracking-wider text-white/80">Flash deals end in</p>
          <p class="text-2xl font-extrabold tabular-nums">{{ countdownText }}</p>

          <!-- Optional demo button -->
          <!--
          <button
            class="mt-2 text-xs font-semibold text-white/90 hover:text-white underline underline-offset-4"
            type="button"
            @click="resetDealsTimer"
          >
            Reset timer (demo)
          </button>
          -->
        </div>
      </div>

      <!-- Filters + Sort -->
      <div class="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <!-- Filter chips -->
        <div class="flex flex-wrap gap-2">
          <button
            class="px-4 py-2 rounded-full text-sm font-semibold border border-white/20 hover:bg-white/10 transition"
            :class="minDiscount === 10 ? 'bg-white/15' : ''" @click="minDiscount = 10">
            10%+ Deals
          </button>

          <button
            class="px-4 py-2 rounded-full text-sm font-semibold border border-white/20 hover:bg-white/10 transition"
            :class="minDiscount === 15 ? 'bg-white/15' : ''" @click="minDiscount = 15">
            15%+ Deals
          </button>

          <button
            class="px-4 py-2 rounded-full text-sm font-semibold border border-white/20 hover:bg-white/10 transition"
            :class="minDiscount === 20 ? 'bg-white/15' : ''" @click="minDiscount = 20">
            20%+ Flash Deals
          </button>

          <button
            class="px-4 py-2 rounded-full text-sm font-semibold border border-white/20 hover:bg-white/10 transition"
            :class="minDiscount === 30 ? 'bg-white/15' : ''" @click="minDiscount = 30">
            30%+ Mega Deals
          </button>
        </div>

        <!-- Sort dropdown -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-semibold text-white/90">Sort:</label>

          <select v-model="sortBy" class="rounded-lg border border-white/20 bg-white/10 text-white px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-white/30">
            <option class="text-gray-900" value="discount">Highest discount</option>
            <option class="text-gray-900" value="rating">Top rated</option>
            <option class="text-gray-900" value="priceAsc">Price: low to high</option>
            <option class="text-gray-900" value="priceDesc">Price: high to low</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Status -->
    <p v-if="loading" class="mt-6 text-gray-600">Loading offers...</p>
    <p v-else-if="error" class="mt-6 text-red-600">{{ error }}</p>

    <!-- Deals grid -->
    <div v-else class="mt-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 class="text-xl font-bold text-gray-900">Top Deals</h2>

        <p class="text-sm text-gray-600">
          Showing <span class="font-semibold text-gray-900">{{ offerProducts.length }}</span>
          items ({{ fmtPct(minDiscount) }}+ off)
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard v-for="p in offerProducts" :key="p.id" :product="p" />
      </div>
    </div>
  </section>
</template>