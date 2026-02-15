<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()

const cards = ref([
  { id: 1, brand: "VISA", last4: "1234", name: "John Doe" },
  { id: 2, brand: "MasterCard", last4: "8899", name: "John Doe" },
])

function removeCard(id: number) {
  cards.value = cards.value.filter(c => c.id !== id)
}
</script>

<template>
  <section class="py-6 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">Payment Methods</h1>
      <button
        class="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700
               bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        @click="router.back()"
      >
        Back
      </button>
    </div>

    <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 mb-5">
      <p class="font-bold text-gray-900 dark:text-white">Demo Notice</p>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        Frontend only — these cards are just sample data.
      </p>
    </div>

    <div class="grid gap-4">
      <div
        v-for="c in cards"
        :key="c.id"
        class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 flex items-center justify-between"
      >
        <div>
          <p class="font-extrabold text-gray-900 dark:text-white">{{ c.brand }} •••• {{ c.last4 }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ c.name }}</p>
        </div>

        <button
          class="px-4 py-2 rounded-xl text-sm font-bold border-2 border-red-300 dark:border-red-700
                 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          @click="removeCard(c.id)"
        >
          Remove
        </button>
      </div>
    </div>
  </section>
</template>