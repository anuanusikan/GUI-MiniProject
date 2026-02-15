<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "../stores/cartStore"
import { useCheckoutStore } from "../stores/checkoutStore"
import { useToastStore } from "../stores/toastStore"

const router = useRouter()
const cart = useCartStore()
const checkout = useCheckoutStore()
const toast = useToastStore()

const allSelected = computed({
  get: () => cart.items.length > 0 && checkout.selectedIds.length === cart.items.length,
  set: (val: boolean) => {
    if (val) {
      checkout.selectedIds = cart.items.map((item) => item.id)
    } else {
      checkout.selectedIds = []
    }
  },
})

function toggleItem(id: number) {
  const idx = checkout.selectedIds.indexOf(id)
  if (idx === -1) {
    checkout.selectedIds.push(id)
  } else {
    checkout.selectedIds.splice(idx, 1)
  }
}

function isSelected(id: number) {
  return checkout.selectedIds.includes(id)
}

function remove(id: number) {
  cart.removeFromCart(id)
  const idx = checkout.selectedIds.indexOf(id)
  if (idx !== -1) checkout.selectedIds.splice(idx, 1)
  toast.show("Item removed from cart", "info")
}

function proceedToCheckout() {
  if (checkout.selectedIds.length === 0) {
    toast.show("Please select items to checkout", "error")
    return
  }
  router.push("/checkout")
}

// Auto-select all on mount if nothing selected
if (cart.items.length > 0 && checkout.selectedIds.length === 0) {
  checkout.selectedIds = cart.items.map((item) => item.id)
}
</script>

<template>
  <section class="py-6 min-h-screen">
    <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
      Shopping Cart
    </h1>

    <!-- Empty State -->
    <div
      v-if="cart.items.length === 0"
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
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">Add some products to get started!</p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold
               bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500
               text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        Start Shopping
      </router-link>
    </div>

    <!-- Cart Items -->
    <div v-else class="grid lg:grid-cols-3 gap-6">
      <!-- LEFT: Items List -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Select All Card -->
        <div
          class="rounded-2xl border-2 border-gray-200 dark:border-gray-700 
                 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 
                 p-5 shadow-sm"
        >
          <label class="flex items-center gap-3 cursor-pointer group">
            <input
              v-model="allSelected"
              type="checkbox"
              class="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 
                     text-indigo-600 dark:text-indigo-500
                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-0
                     cursor-pointer transition-all"
            />
            <span class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
              Select All Items ({{ cart.items.length }})
            </span>
          </label>
        </div>

        <!-- Item Cards -->
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="rounded-2xl border-2 transition-all duration-200
                 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg"
          :class="
            isSelected(item.id)
              ? 'border-indigo-400 dark:border-indigo-500'
              : 'border-gray-200 dark:border-gray-700'
          "
        >
          <div class="p-5">
            <div class="flex gap-4">
              <!-- Checkbox -->
              <div class="flex-shrink-0 pt-1">
                <input
                  :checked="isSelected(item.id)"
                  @change="toggleItem(item.id)"
                  type="checkbox"
                  class="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 
                         text-indigo-600 dark:text-indigo-500
                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-0
                         cursor-pointer transition-all"
                />
              </div>

              <!-- Image -->
              <router-link :to="`/product/${item.id}`" class="flex-shrink-0">
                <div
                  class="w-24 h-24 rounded-xl overflow-hidden 
                         bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950
                         border border-gray-200 dark:border-gray-700 p-2
                         hover:scale-105 transition-transform"
                >
                  <img
                    :src="item.thumbnail"
                    :alt="item.title"
                    class="w-full h-full object-contain"
                  />
                </div>
              </router-link>

              <!-- Details -->
              <div class="flex-1 min-w-0">
                <router-link :to="`/product/${item.id}`">
                  <h3 class="font-bold text-gray-900 dark:text-white mb-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1">
                    {{ item.title }}
                  </h3>
                </router-link>

                <p class="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  ${{ item.price }}
                </p>

                <!-- Quantity Controls -->
                <div class="mt-3 flex items-center gap-2">
                  <button
                    @click="cart.dec(item.id)"
                    class="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           hover:bg-gray-50 dark:hover:bg-gray-600 font-bold
                           transition-all hover:scale-105 active:scale-95"
                  >
                    -
                  </button>

                  <input
                    :value="item.qty"
                    @input="(e) => cart.setQty(item.id, Number((e.target as HTMLInputElement).value))"
                    type="number"
                    min="1"
                    class="w-16 h-8 text-center font-bold rounded-lg
                           border-2 border-gray-300 dark:border-gray-600
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                  />

                  <button
                    @click="cart.inc(item.id)"
                    class="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           hover:bg-gray-50 dark:hover:bg-gray-600 font-bold
                           transition-all hover:scale-105 active:scale-95"
                  >
                    +
                  </button>

                  <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    = <span class="font-bold text-gray-900 dark:text-white">${{ (item.price * item.qty).toFixed(2) }}</span>
                  </span>
                </div>
              </div>

              <!-- Remove Button -->
              <button
                @click="remove(item.id)"
                class="flex-shrink-0 p-2 rounded-lg text-red-600 dark:text-red-400 
                       hover:bg-red-50 dark:hover:bg-red-900/20 transition-all hover:scale-110"
                aria-label="Remove item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Order Summary (Sticky) -->
      <div class="lg:col-span-1">
        <div
          class="rounded-2xl border-2 border-gray-200 dark:border-gray-700 
                 bg-white dark:bg-gray-800 shadow-lg sticky top-24 overflow-hidden"
        >
          <!-- Header -->
          <div class="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
            <h2 class="text-lg font-extrabold text-white">Order Summary</h2>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-4">
            <!-- Items Count -->
            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-600 dark:text-gray-400">Selected Items</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ checkout.selectedCount }}</span>
            </div>

            <!-- Subtotal -->
            <div class="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
              <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span class="text-xl font-bold text-gray-900 dark:text-white">
                ${{ checkout.subtotal.toFixed(2) }}
              </span>
            </div>

            <!-- Total -->
            <div class="flex justify-between items-center pt-2">
              <span class="text-lg font-bold text-gray-900 dark:text-white">Total</span>
              <span class="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                ${{ checkout.subtotal.toFixed(2) }}
              </span>
            </div>

            <!-- Checkout Button -->
            <button
              @click="proceedToCheckout"
              :disabled="checkout.selectedCount === 0"
              class="w-full py-4 rounded-xl font-bold text-lg
                     bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500
                     text-white shadow-lg
                     hover:shadow-xl hover:scale-105 active:scale-95
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                     transition-all duration-200
                     flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Proceed to Checkout
            </button>

            <!-- Continue Shopping -->
            <router-link
              to="/"
              class="block text-center py-3 rounded-xl font-semibold
                     border-2 border-gray-300 dark:border-gray-600
                     text-gray-700 dark:text-gray-300
                     hover:bg-gray-50 dark:hover:bg-gray-700
                     transition-all"
            >
              Continue Shopping
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>