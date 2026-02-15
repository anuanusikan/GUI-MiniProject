<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()

// Demo data (frontend only)
const orders = [
  { id: "ORD-1001", date: "2026-02-10", total: 129.99, status: "Delivered" },
  { id: "ORD-1002", date: "2026-02-12", total: 59.5, status: "Processing" },
]
</script>

<template>
  <section class="py-6 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">My Orders</h1>
      <button
        class="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700
               bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        @click="router.back()"
      >
        Back
      </button>
    </div>

    <div v-if="orders.length === 0"
      class="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-10 text-center">
      <p class="text-gray-700 dark:text-gray-300 font-semibold">No orders yet.</p>
      <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">Once you checkout, orders will appear here.</p>
    </div>

    <div v-else class="grid gap-4">
      <div
        v-for="o in orders"
        :key="o.id"
        class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
      >
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p class="font-extrabold text-gray-900 dark:text-white">{{ o.id }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Date: {{ o.date }}</p>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-sm font-bold text-gray-900 dark:text-white">${{ o.total }}</span>
            <span
              class="text-xs font-bold px-3 py-1 rounded-full"
              :class="o.status === 'Delivered'
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'"
            >
              {{ o.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>