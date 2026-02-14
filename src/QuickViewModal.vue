<script setup lang="ts">
import type { Product } from "./types/product"

const props = defineProps<{
  open: boolean
  product: Product | null
}>()

const emit = defineEmits<{
  (e: "close"): void
  (e: "add"): void
  (e: "details"): void
}>()

function onBackdrop() {
  emit("close")
}
</script>

<template>
  <div v-if="open && product" class="fixed inset-0 z-[80]">
    <button class="absolute inset-0 bg-black/45" aria-label="Close" @click="onBackdrop" />

    <div
      class="relative mx-auto mt-20 w-[92%] max-w-3xl rounded-2xl bg-white shadow-xl overflow-hidden"
    >
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 class="text-lg font-bold text-gray-900 line-clamp-1">
          {{ product.title }}
        </h3>
        <button class="p-2 rounded-md hover:bg-gray-100" @click="$emit('close')" aria-label="Close">
          ✕
        </button>
      </div>

      <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
          <img
            :src="(product as any).thumbnail"
            :alt="product.title"
            class="w-full h-72 object-cover"
          />
        </div>

        <div>
          <p class="text-sm text-gray-500">{{ (product as any).category }}</p>

          <div class="mt-2 flex items-center gap-2">
            <span class="text-2xl font-extrabold text-gray-900">${{ product.price }}</span>
            <span
              v-if="(product as any).discountPercentage"
              class="text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1"
            >
              -{{ Math.round((product as any).discountPercentage) }}%
            </span>
          </div>

          <div class="mt-3 flex items-center gap-2 text-sm">
            <span class="font-semibold text-gray-900">
              ⭐ {{ Number((product as any).rating ?? 0).toFixed(1) }}
            </span>
            <span class="text-gray-500">rating</span>
          </div>

          <p class="mt-4 text-gray-700 leading-relaxed">
            {{ product.description }}
          </p>

          <div class="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              class="w-full sm:w-auto flex-1 rounded-xl bg-indigo-600 text-white py-2.5 font-semibold hover:bg-indigo-700 transition"
              @click="$emit('add')"
            >
              Add to Cart
            </button>

            <button
              class="w-full sm:w-auto flex-1 rounded-xl border border-gray-200 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 transition"
              @click="$emit('details')"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>