<script setup lang="ts">
import { computed } from "vue"
import { useCartStore } from "../stores/cartStore"
import { useToastStore } from "../stores/toastStore"

const toast = useToastStore()
const cart = useCartStore()

const formattedTotal = computed(() =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(cart.totalPrice)
)
</script>

<template>
    <section class="py-6">
        <div class="flex items-center justify-between mb-5">
            <h1 class="text-2xl font-bold text-gray-900">Your Cart</h1>

            <button v-if="cart.items.length" class="text-sm font-semibold text-red-600 hover:underline"
                @click="cart.clearCart(); toast.show('Cart cleared', 'info')">
                Clear cart
            </button>
        </div>

        <!-- Empty state -->
        <div v-if="!cart.items.length" class="rounded-xl border border-gray-200 bg-white p-6 text-gray-700">
            Your cart is empty.
        </div>

        <!-- Cart content -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Items -->
            <div class="lg:col-span-2 space-y-3">
                <div v-for="item in cart.items" :key="item.id"
                    class="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                    <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.title"
                        class="h-16 w-16 rounded-lg object-cover border border-gray-100" />

                    <div class="flex-1">
                        <p class="font-semibold text-gray-900 line-clamp-1">{{ item.title }}</p>
                        <p class="text-sm text-gray-600">${{ item.price }}</p>
                    </div>

                    <!-- Qty controls -->
                    <div class="flex items-center gap-2">
                        <button class="h-10 w-10 rounded-lg border border-gray-200 hover:bg-gray-50 text-lg"
                            @click="cart.dec(item.id)" aria-label="Decrease quantity">
                            −
                        </button>

                        <input
                            class="h-10 w-16 rounded-lg border border-gray-200 text-center focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            type="number" min="1" :value="item.qty"
                            @input="cart.setQty(item.id, Number(($event.target as HTMLInputElement).value))" />

                        <button class="h-10 w-10 rounded-lg border border-gray-200 hover:bg-gray-50 text-lg"
                            @click="cart.inc(item.id)" aria-label="Increase quantity">
                            +
                        </button>
                    </div>

                    <div class="sm:w-24 text-right font-semibold text-gray-900">
                        ${{ (item.price * item.qty).toFixed(2) }}
                    </div>

                    <button class="text-sm font-semibold text-red-600 hover:underline"
                        @click="cart.removeFromCart(item.id); toast.show('Item removed', 'info')">
                        Remove
                    </button>
                </div>
            </div>

            <!-- Summary (RIGHT side on desktop) -->
            <aside class="rounded-xl border border-gray-200 bg-white p-5 h-fit lg:sticky lg:top-28">
                <h2 class="text-lg font-bold text-gray-900">Order Summary</h2>

                <div class="mt-4 space-y-2 text-sm">
                    <div class="flex justify-between text-gray-700">
                        <span>Items</span>
                        <span class="font-semibold">{{ cart.totalItems }}</span>
                    </div>

                    <div class="flex justify-between text-gray-700">
                        <span>Subtotal</span>
                        <span class="font-semibold">{{ formattedTotal }}</span>
                    </div>

                    <div class="pt-3 border-t border-gray-100 flex justify-between text-gray-900">
                        <span class="font-semibold">Total</span>
                        <span class="font-bold">{{ formattedTotal }}</span>
                    </div>
                </div>

                <button
                    class="mt-5 w-full rounded-lg bg-indigo-600 text-white py-2.5 font-semibold hover:bg-indigo-700 transition">
                    Checkout (Demo)
                </button>

                <p class="mt-3 text-xs text-gray-500">
                    Frontend-only demo: checkout is UI only.
                </p>
            </aside>
        </div>

        <!-- Mobile bottom checkout bar (ONLY when cart has items) -->
        <div v-if="cart.items.length"
            class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 lg:hidden">
            <button class="w-full rounded-lg bg-indigo-600 text-white py-3 font-semibold">
                Checkout ({{ formattedTotal }})
            </button>
        </div>

        <!-- Add space so content doesn't hide behind mobile bottom bar -->
        <div v-if="cart.items.length" class="h-20 lg:hidden"></div>
    </section>
</template>