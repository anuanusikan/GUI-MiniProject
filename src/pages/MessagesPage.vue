<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()

// Demo messages (frontend only)
const messages = ref([
  { id: 1, from: "Support", text: "Your order is being prepared ✅", time: "2h ago" },
  { id: 2, from: "Promo", text: "🎁 Gift deal: 20% off today only!", time: "1d ago" },
])
</script>

<template>
  <section class="py-6 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">Messages</h1>
      <button
        class="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700
               bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        @click="router.back()"
      >
        Back
      </button>
    </div>

    <div class="grid gap-4">
      <div
        v-for="m in messages"
        :key="m.id"
        class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5"
      >
        <div class="flex items-center justify-between">
          <p class="font-bold text-gray-900 dark:text-white">{{ m.from }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ m.time }}</p>
        </div>
        <p class="mt-2 text-gray-700 dark:text-gray-300">{{ m.text }}</p>
      </div>
    </div>
  </section>
</template>