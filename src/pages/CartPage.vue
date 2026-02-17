<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "../stores/cartStore"
import { useToastStore } from "../stores/toastStore"
import { useCheckoutStore } from "../stores/checkoutStore"

const router = useRouter()
const cart = useCartStore()
const toast = useToastStore()
const checkout = useCheckoutStore()

const LKR_RATE = 320 // demo rate (change if you want)

const formatLKR = (usd: number) =>
  new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(Math.round(usd * LKR_RATE))

const selectedSet = computed(() => new Set(checkout.selectedIds))

const allSelected = computed(() => {
  if (!cart.items.length) return false
  return cart.items.every((i) => selectedSet.value.has(i.id))
})

function toggleAll() {
  if (!cart.items.length) return
  if (allSelected.value) checkout.clearSelection()
  else checkout.selectAll()
}

function goCheckout() {
  if (!checkout.selectedIds.length) {
    toast.show("Please select at least 1 item", "error")
    return
  }
  router.push("/checkout")
}
</script>

<template>
  <section class="py-6 min-h-[70vh]">
    <!-- Header -->
    <div
      class="rounded-2xl border shadow-lg overflow-hidden
             border-gray-200 dark:border-white/10"
    >
      <div
        class="p-6 sm:p-8
               bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.20),_transparent_60%),linear-gradient(135deg,_#f8fafc_0%,_#fde68a_40%,_#dbeafe_100%)]
               dark:bg-[radial-gradient(ellipse_at_top,_rgba(250,204,21,0.18),_transparent_60%),linear-gradient(135deg,_#000000_0%,_#111827_45%,_#a3a3a3_120%)]"
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Your Cart</h1>
          <p class="mt-1 text-sm text-gray-700/80 dark:text-white/70">
            Select items and continue to checkout.
          </p>
        </div>

        <button
          v-if="cart.items.length"
          class="px-4 py-2 rounded-xl font-bold border
                 border-gray-200 bg-white/70 hover:bg-white/90 text-gray-900
                 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white transition"
          @click="cart.clearCart(); checkout.clearSelection(); toast.show('Cart cleared', 'info')"
        >
          Clear
        </button>
      </div>
    </div>
    </div>
    

    <!-- Empty -->
    <div
      v-if="!cart.items.length"
      class="mt-6 rounded-2xl border border-gray-200 dark:border-white/10
             bg-white dark:bg-gray-900 p-8 text-center"
    >
      <p class="text-xl font-extrabold text-gray-900 dark:text-white">Your cart is empty 🛒</p>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">Add products to continue.</p>
      <button
        class="mt-5 px-6 py-3 rounded-xl font-extrabold text-white
               bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-90 transition"
        @click="router.push('/')"
      >
        Continue Shopping
      </button>
    </div>

    <!-- Items -->
    <div v-else class="mt-6 grid lg:grid-cols-3 gap-6">
      <!-- Left: items -->
      <div class="lg:col-span-2 space-y-4">
        <div class="flex items-center justify-between">
          <label class="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
            <input type="checkbox" :checked="allSelected" @change="toggleAll" />
            Select all
          </label>

          <p class="text-sm text-gray-600 dark:text-gray-300">
            Items: <span class="font-extrabold">{{ cart.totalItems }}</span>
          </p>
        </div>

        <div
          v-for="item in cart.items"
          :key="item.id"
          class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/30 backdrop-blur p-4"
        >
          <div class="flex gap-4">
            <input
              type="checkbox"
              class="mt-2"
              :checked="selectedSet.has(item.id)"
              @change="checkout.toggle(item.id)"
            />

            <img
              :src="item.thumbnail"
              :alt="item.title"
              class="w-20 h-20 rounded-xl object-contain bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-white/10"
            />

            <div class="flex-1 min-w-0">
              <p class="font-extrabold text-gray-900 dark:text-white truncate">
                {{ item.title }}
              </p>

              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {{ formatLKR(item.price) }} <span class="opacity-70">(LKR)</span>
              </p>

              <div class="mt-3 flex items-center justify-between gap-3 flex-wrap">
                <!-- qty -->
                <div class="flex items-center gap-2">
                  <button
                    class="w-10 h-10 rounded-xl font-extrabold border
                           border-gray-200 bg-white hover:bg-gray-50
                           dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white transition"
                    @click="cart.dec(item.id)"
                  >
                    -
                  </button>

                  <div class="w-12 text-center font-extrabold text-gray-900 dark:text-white">
                    {{ item.qty }}
                  </div>

                  <button
                    class="w-10 h-10 rounded-xl font-extrabold border
                           border-gray-200 bg-white hover:bg-gray-50
                           dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white transition"
                    @click="cart.inc(item.id)"
                  >
                    +
                  </button>
                </div>

                <!-- remove -->
                <button
                  class="px-4 py-2 rounded-xl font-bold text-red-600 dark:text-red-300
                         hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  @click="cart.removeFromCart(item.id); checkout.selectedIds = checkout.selectedIds.filter(x => x !== item.id)"
                >
                  Remove
                </button>
              </div>
            </div>

            <div class="text-right">
              <p class="text-sm text-gray-500 dark:text-gray-400">Total</p>
              <p class="font-extrabold text-gray-900 dark:text-white">
                {{ formatLKR(item.price * item.qty) }}
              </p>
            </div>
          </div>
        </div>
      
      </div>

      <!-- Right: summary -->
      <div class="space-y-4">
        <div class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/30 backdrop-blur p-5">
          <h3 class="text-lg font-extrabold text-gray-900 dark:text-white">Summary</h3>

          <div class="mt-4 space-y-2 text-sm">
            <div class="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Selected items</span>
              <span class="font-bold">{{ checkout.selectedCount }}</span>
            </div>

            <div class="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Subtotal</span>
              <span class="font-bold">{{ formatLKR(checkout.subtotal) }}</span>
            </div>

            <div class="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Delivery</span>
              <span class="font-bold">{{ formatLKR(checkout.deliveryFee) }}</span>
            </div>

            <div class="border-t border-gray-200 dark:border-white/10 pt-3 flex justify-between">
              <span class="font-extrabold text-gray-900 dark:text-white">Total</span>
              <span class="font-extrabold text-gray-900 dark:text-white">{{ formatLKR(checkout.total) }}</span>
            </div>
          </div>

          <button
            class="mt-5 w-full py-3 rounded-xl font-extrabold text-black
                   bg-gradient-to-r from-amber-400 to-yellow-300 hover:opacity-90 transition"
            @click="goCheckout"
          >
            Continue to Checkout
          </button>

          <p class="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Tip: select items before checkout.
          </p>
        </div>
      </div>
    </div>
    
  </section>
</template>