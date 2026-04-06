<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"
import type { Product } from "../types/product"
import { getAllProducts } from "../services/productService"
import ProductCard from "../components/ProductCard.vue"
import { useToastStore } from "../stores/toastStore"

const toast = useToastStore()

const loading = ref(true)
const error = ref<string | null>(null)
const allProducts = ref<Product[]>([])

/** Minimum discount filter */
const minDiscount = ref(15)



/** ---------------- Persistent Countdown ---------------- */
const LS_DEAL_END = "shopinhaven_deal_end"
const DEAL_DURATION_SECONDS = 2 * 60 * 60 + 15 * 60 + 20 // demo: 2:15:20

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

/** Helpers */
function pct(v: any) {
  const n = Number(v ?? 0)
  return Math.round(n)
}

function moneyUSD(n: number) {
  // Keep USD here (your ProductCard might show LKR already—this is just for Offers “save” badge text)
  return `$${n.toFixed(2)}`
}

/** Offer products computed */
const offerProducts = computed(() => {
  const filtered = allProducts.value.filter((p: any) => (p.discountPercentage ?? 0) >= minDiscount.value)

  const sorted = [...filtered].sort(
  (a: any, b: any) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0)
)

  return sorted.slice(0, 40)
})

/** “Deal of the Moment” = top discount from offerProducts */
const featuredDeal = computed(() => {
  return offerProducts.value.length ? (offerProducts.value[0] as any) : null
})

/** Quick stats */
const stats = computed(() => {
  const items = offerProducts.value as any[]
  if (!items.length) {
    return { count: 0, avgDiscount: 0, bestDiscount: 0 }
  }
  const bestDiscount = Math.max(...items.map((p) => Number(p.discountPercentage ?? 0)))
  const avgDiscount = items.reduce((sum, p) => sum + Number(p.discountPercentage ?? 0), 0) / items.length
  return { count: items.length, avgDiscount: Math.round(avgDiscount), bestDiscount: Math.round(bestDiscount) }
})

/** Copy promo code feature (demo) */
function copyCode(code: string) {
  navigator.clipboard
    .writeText(code)
    .then(() => toast.show(`Copied promo code: ${code}`, "success"))
    .catch(() => toast.show("Copy failed (browser blocked)", "error"))
}

/** Savings helper (approx, based on discount%) */
function estimateSavings(p: any) {
  const price = Number(p?.price ?? 0)
  const d = Number(p?.discountPercentage ?? 0) / 100
  if (!price || !d) return 0
  // Original - price ≈ price/(1-d) - price
  const original = price / (1 - d)
  return Math.max(0, original - price)
}

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
    <!-- HERO (Light: silver+gold+blue, Dark: gold+black+silver) -->
    <div
      class="rounded-2xl overflow-hidden border shadow-lg
             border-gray-200 dark:border-white/10"
    >
      <div
        class="p-6 sm:p-8 text-gray-900 dark:text-white
               bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.20),_transparent_60%),linear-gradient(135deg,_#f8fafc_0%,_#fde68a_40%,_#dbeafe_100%)]
               dark:bg-[radial-gradient(ellipse_at_top,_rgba(250,204,21,0.18),_transparent_60%),linear-gradient(135deg,_#000000_0%,_#111827_45%,_#a3a3a3_120%)]"
      >
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <!-- Left -->
          <div>
            <p
              class="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase
                     text-gray-700/80 dark:text-white/80"
            >
              ⚡ Flash Deals
              <span class="h-1 w-1 rounded-full bg-gray-700/50 dark:bg-white/50"></span>
              Limited Time
            </p>

            <h1 class="mt-2 text-2xl sm:text-4xl font-extrabold leading-tight">
              Today’s Offers
              <span class="block text-base sm:text-lg font-semibold opacity-80 mt-2">
                Premium picks • Big savings • Fast checkout
              </span>
            </h1>

            <!-- Promo codes -->
            <div class="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                class="px-4 py-2 rounded-full text-sm font-bold
                       bg-white/70 hover:bg-white/90 text-gray-900
                       border border-gray-200
                       dark:bg-white/10 dark:hover:bg-white/15 dark:text-white dark:border-white/15 transition"
                @click="copyCode('SAVE10')"
              >
                Copy: SAVE10
              </button>

              <button
                type="button"
                class="px-4 py-2 rounded-full text-sm font-bold
                       bg-white/70 hover:bg-white/90 text-gray-900
                       border border-gray-200
                       dark:bg-white/10 dark:hover:bg-white/15 dark:text-white dark:border-white/15 transition"
                @click="copyCode('SAVE100')"
              >
                Copy: SAVE100
              </button>
            </div>
          </div>

          <!-- Right: Countdown + Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <!-- Countdown -->
            <div
              class="rounded-xl border p-4
                     border-gray-200 bg-white/60
                     dark:border-white/15 dark:bg-white/10 backdrop-blur"
            >
              <p class="text-xs font-bold uppercase tracking-wider opacity-80">Deals end in</p>
              <p class="mt-1 text-2xl font-extrabold tabular-nums">{{ countdownText }}</p>
              <p class="mt-1 text-xs opacity-80">Timer stays saved (localStorage)</p>
            </div>

            <!-- Stats -->
            <div
              class="rounded-xl border p-4
                     border-gray-200 bg-white/60
                     dark:border-white/15 dark:bg-white/10 backdrop-blur"
            >
              <p class="text-xs font-bold uppercase tracking-wider opacity-80">Quick stats</p>
              <div class="mt-2 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p class="text-lg font-extrabold">{{ stats.count }}</p>
                  <p class="text-[11px] opacity-80">items</p>
                </div>
                <div>
                  <p class="text-lg font-extrabold">{{ stats.avgDiscount }}%</p>
                  <p class="text-[11px] opacity-80">avg off</p>
                </div>
                <div>
                  <p class="text-lg font-extrabold">{{ stats.bestDiscount }}%</p>
                  <p class="text-[11px] opacity-80">best</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Deal of the Moment -->
        <div
          v-if="featuredDeal"
          class="mt-6 rounded-2xl border p-4 sm:p-5
                 border-gray-200 bg-white/70
                 dark:border-white/15 dark:bg-black/30 backdrop-blur"
        >
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div class="min-w-0">
              <p class="text-xs font-extrabold uppercase tracking-wider opacity-80">Deal of the moment</p>
              <p class="mt-1 text-lg sm:text-xl font-extrabold truncate">
                {{ featuredDeal.title }}
              </p>
              <p class="mt-1 text-sm opacity-80 line-clamp-2">
                {{ featuredDeal.description }}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <span
                class="px-3 py-1.5 rounded-full text-sm font-extrabold
                       bg-black/10 text-gray-900 border border-gray-200
                       dark:bg-white/10 dark:text-white dark:border-white/15"
              >
                -{{ pct(featuredDeal.discountPercentage) }}%
              </span>

              <span
                class="px-3 py-1.5 rounded-full text-sm font-extrabold
                       bg-emerald-500/15 text-emerald-900 border border-emerald-200
                       dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/20"
              >
                Save {{ moneyUSD(estimateSavings(featuredDeal)) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Filters + Sort -->
        <div class="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <!-- Filter chips -->
          <div class="flex flex-wrap gap-2">
            <button
              class="px-4 py-2 rounded-full text-sm font-bold border transition
                     border-gray-200 bg-white/70 hover:bg-white/90 text-gray-900
                     dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white"
              :class="minDiscount === 10 ? 'ring-2 ring-amber-400/60' : ''"
              @click="minDiscount = 10"
            >
              10%+ Deals
            </button>

            <button
              class="px-4 py-2 rounded-full text-sm font-bold border transition
                     border-gray-200 bg-white/70 hover:bg-white/90 text-gray-900
                     dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white"
              :class="minDiscount === 15 ? 'ring-2 ring-amber-400/60' : ''"
              @click="minDiscount = 15"
            >
              15%+ Deals
            </button>

            <button
              class="px-4 py-2 rounded-full text-sm font-bold border transition
                     border-gray-200 bg-white/70 hover:bg-white/90 text-gray-900
                     dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white"
              :class="minDiscount === 20 ? 'ring-2 ring-amber-400/60' : ''"
              @click="minDiscount = 20"
            >
              20%+ Flash Deals
            </button>

            <button
              class="px-4 py-2 rounded-full text-sm font-bold border transition
                     border-gray-200 bg-white/70 hover:bg-white/90 text-gray-900
                     dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white"
              :class="minDiscount === 30 ? 'ring-2 ring-amber-400/60' : ''"
              @click="minDiscount = 30"
            >
              30%+ Mega Deals
            </button>
          </div>

          
        </div>
      </div>
    </div>

    <!-- Status -->
    <div class="mt-6">
      <!-- Skeleton loading -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="i in 8"
          :key="i"
          class="h-[340px] rounded-2xl border border-gray-200 dark:border-gray-700
                 bg-gray-100 dark:bg-gray-800 animate-pulse"
        />
      </div>

      <p v-else-if="error" class="mt-2 text-red-600 dark:text-red-400 font-semibold">
        {{ error }}
      </p>

      <!-- Empty state -->
      <div
        v-else-if="offerProducts.length === 0"
        class="rounded-2xl border border-gray-200 dark:border-gray-700
               bg-white dark:bg-gray-800 p-6 text-center"
      >
        <p class="text-lg font-extrabold text-gray-900 dark:text-white">No deals found</p>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Try a lower discount filter (ex: 10%+).
        </p>
      </div>

      <!-- Deals grid -->
      <div v-else>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <h2 class="text-xl font-extrabold text-gray-900 dark:text-white">Top Deals</h2>

          <p class="text-sm text-gray-600 dark:text-gray-300">
            Showing <span class="font-extrabold text-gray-900 dark:text-white">{{ offerProducts.length }}</span>
            items ({{ minDiscount }}%+ off)
          </p>
        </div>

        <!-- Add a tiny “save” badge above each ProductCard -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="p in offerProducts" :key="p.id" class="relative">
            <span
              v-if="pct((p as any).discountPercentage) > 0"
              class="absolute z-10 left-3 top-3 px-2.5 py-1 rounded-full text-[11px] font-extrabold
                     bg-amber-400/90 text-black shadow
                     dark:bg-amber-300/90 dark:text-black"
            >
              Save {{ moneyUSD(estimateSavings(p)) }}
            </span>

            <ProductCard :product="p" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>