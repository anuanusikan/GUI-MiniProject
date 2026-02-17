<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "../stores/cartStore"
import { useCheckoutStore } from "../stores/checkoutStore"
import { useToastStore } from "../stores/toastStore"

const router = useRouter()
const cart = useCartStore()
const checkout = useCheckoutStore()
const toast = useToastStore()


const step = ref<1 | 2>(1)

function money(n: number) {
  return new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(n)
}

const canContinue = computed(() => {
  const a = checkout.address
  return (
    a.fullName.trim() &&
    a.phone.trim() &&
    a.province.trim() &&
    a.district.trim() &&
    a.city.trim() &&
    a.address.trim()
  )
})

function next() {
  if (!checkout.selectedItems.length) {
    toast.show("No items selected. Go back to cart.", "error")
    router.push("/cart")
    return
  }
  if (!canContinue.value) {
    toast.show("Please fill required address fields", "error")
    return
  }
  step.value = 2
}

function back() {
  step.value = 1
}

function applyPromo() {
  checkout.applyPromo()
  toast.show(checkout.promoDiscount > 0 ? "Promo applied (demo)" : "Invalid promo (demo)", checkout.promoDiscount > 0 ? "success" : "error")
}

function placeOrder() {
  checkout.selectedItems.forEach((it) => {
    cart.removeFromCart(it.id)
  })

  toast.show("Order placed successfully (demo)", "success")
  checkout.resetCheckout()
  router.push("/")
}
</script>

<template>
  <section class="py-6">
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-2xl font-extrabold text-gray-900">Checkout</h1>
      <button class="text-sm font-semibold text-indigo-700 hover:underline" @click="router.push('/cart')">
        ← Back to cart
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- LEFT -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Stepper -->
        <div class="rounded-2xl border border-gray-200 bg-white p-4 flex items-center gap-3">
          <div class="flex items-center gap-2">
            <span :class="step === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'" class="h-8 w-8 rounded-full grid place-items-center font-bold">1</span>
            <span class="font-semibold text-gray-900">Delivery</span>
          </div>
          <span class="text-gray-300">—</span>
          <div class="flex items-center gap-2">
            <span :class="step === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'" class="h-8 w-8 rounded-full grid place-items-center font-bold">2</span>
            <span class="font-semibold text-gray-900">Review</span>
          </div>
        </div>

        <!-- STEP 1: Address -->
        <div v-if="step === 1" class="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div class="px-5 py-4 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-900">Delivery Information</h2>
          </div>

          <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-semibold text-gray-700">Full name *</label>
              <input v-model="checkout.address.fullName" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:outline-none" />
            </div>

            <div>
              <label class="text-sm font-semibold text-gray-700">Phone *</label>
              <input v-model="checkout.address.phone" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:outline-none" />
            </div>

            <div>
              <label class="text-sm font-semibold text-gray-700">Province *</label>
              <input v-model="checkout.address.province" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:outline-none" />
            </div>

            <div>
              <label class="text-sm font-semibold text-gray-700">District *</label>
              <input v-model="checkout.address.district" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:outline-none" />
            </div>

            <div>
              <label class="text-sm font-semibold text-gray-700">City *</label>
              <input v-model="checkout.address.city" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:outline-none" />
            </div>

            <div>
              <label class="text-sm font-semibold text-gray-700">House / Street</label>
              <input v-model="checkout.address.house" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:outline-none" />
            </div>

            <div class="md:col-span-2">
              <label class="text-sm font-semibold text-gray-700">Address *</label>
              <input v-model="checkout.address.address" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:outline-none" />
            </div>

            <div class="md:col-span-2">
              <label class="text-sm font-semibold text-gray-700">Label</label>
              <div class="mt-2 flex gap-3">
                <button
                  class="rounded-xl border px-4 py-2 font-semibold text-sm"
                  :class="checkout.address.label === 'HOME' ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white'"
                  @click="checkout.address.label = 'HOME'"
                  type="button"
                >
                  🏠 HOME
                </button>
                <button
                  class="rounded-xl border px-4 py-2 font-semibold text-sm"
                  :class="checkout.address.label === 'OFFICE' ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white'"
                  @click="checkout.address.label = 'OFFICE'"
                  type="button"
                >
                  🏢 OFFICE
                </button>
              </div>
            </div>
          </div>

          <div class="px-5 pb-5">
            <button
              class="w-full rounded-xl bg-[#7a1f1f] text-white py-3 font-semibold hover:brightness-110 transition"
              @click="next"
            >
              Continue to Review
            </button>
          </div>
        </div>

        <!-- STEP 2: Review -->
        <div v-else class="space-y-6">
          <div class="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 class="text-lg font-bold text-gray-900">Delivery Address</h2>
              <button class="text-sm font-semibold text-indigo-700 hover:underline" @click="back">Edit</button>
            </div>

            <div class="p-5 text-sm text-gray-700 space-y-1">
              <p><span class="font-semibold">Name:</span> {{ checkout.address.fullName }}</p>
              <p><span class="font-semibold">Phone:</span> {{ checkout.address.phone }}</p>
              <p><span class="font-semibold">Area:</span> {{ checkout.address.city }}, {{ checkout.address.district }}, {{ checkout.address.province }}</p>
              <p><span class="font-semibold">Address:</span> {{ checkout.address.address }}</p>
              <p><span class="font-semibold">Label:</span> {{ checkout.address.label }}</p>
            </div>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div class="px-5 py-4 border-b border-gray-100">
              <h2 class="text-lg font-bold text-gray-900">Selected Items</h2>
            </div>

            <div class="p-5 space-y-3">
              <div v-for="it in checkout.selectedItems" :key="it.id" class="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                <img v-if="it.thumbnail" :src="it.thumbnail" class="h-14 w-14 object-contain bg-gray-50 rounded-lg border" />
                <div class="flex-1">
                  <p class="font-semibold text-gray-900 line-clamp-1">{{ it.title }}</p>
                  <p class="text-sm text-gray-600">{{ it.qty }} × {{ money(it.price) }}</p>
                </div>
                <p class="font-bold text-gray-900">{{ money(it.qty * it.price) }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
            <button
              class="w-full rounded-xl bg-[#7a1f1f] text-white py-3 font-semibold hover:brightness-110 transition"
              @click="placeOrder"
            >
              Place Order (Demo)
            </button>
            <p class="mt-2 text-xs text-gray-500">Frontend-only: this is a demo order.</p>
          </div>
        </div>
      </div>

      <!-- RIGHT: summary always visible -->
      <aside class="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 h-fit lg:sticky lg:top-28">
        <h2 class="text-lg font-bold text-gray-900">Order Summary</h2>

        <div class="mt-4 space-y-3 text-sm">
          <div class="flex justify-between text-gray-700">
            <span>Items</span>
            <span class="font-semibold">{{ checkout.selectedCount }}</span>
          </div>

          <div class="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span class="font-semibold">{{ money(checkout.subtotal) }}</span>
          </div>

          <div class="flex justify-between text-gray-700">
            <span>Delivery Fee</span>
            <span class="font-semibold">{{ money(checkout.deliveryFee) }}</span>
          </div>

          <!-- Promo -->
          <div class="pt-2">
            <p class="text-xs font-semibold text-gray-600 mb-2">Promotion (demo)</p>
            <div class="flex gap-2">
              <input v-model="checkout.promoCode" class="flex-1 rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-200 focus:outline-none" placeholder="SAVE10 / SAVE100" />
              <button class="rounded-lg bg-indigo-600 text-white px-4 py-2 font-semibold hover:bg-indigo-700" @click="applyPromo">
                Apply
              </button>
            </div>
            <p v-if="checkout.promoDiscount" class="mt-2 text-emerald-700 font-semibold">
              Discount: -{{ money(checkout.promoDiscount) }}
            </p>
          </div>

          <div class="pt-3 border-t border-gray-100 flex justify-between text-gray-900">
            <span class="font-bold">Total</span>
            <span class="font-extrabold text-lg">{{ money(checkout.total) }}</span>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>