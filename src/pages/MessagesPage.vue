<script setup lang="ts">
const messages = [
  { id: 1, from: "AlloraCart Support", text: "Your order AC-1021 was delivered ✅", time: "2 days ago" },
  { id: 2, from: "Promotions", text: "Flash Sale starts tonight! ⚡", time: "5 days ago" },
]
</script>

<template>
  <section class="py-8 min-h-[70vh]">
    <div class="rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg overflow-hidden">
      <div
        class="p-6 sm:p-8
               bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.16),_transparent_60%),linear-gradient(135deg,_#f8fafc_0%,_#fde68a_35%,_#dbeafe_100%)]
               dark:bg-[radial-gradient(ellipse_at_top,_rgba(250,204,21,0.14),_transparent_60%),linear-gradient(135deg,_#000000_0%,_#111827_45%,_#a3a3a3_120%)]"
      >
        <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Messages</h1>
        <p class="mt-2 text-sm text-gray-700/80 dark:text-white/70">
          Simple inbox demo (frontend only).
        </p>
      </div>
    </div>

    <div class="mt-6 space-y-4">
      <div
        v-for="m in messages"
        :key="m.id"
        class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/75 dark:bg-black/35 backdrop-blur p-5"
      >
        <div class="flex items-start justify-between gap-3">
          <p class="font-extrabold text-gray-900 dark:text-white">{{ m.from }}</p>
          <p class="text-xs text-gray-500 dark:text-white/50">{{ m.time }}</p>
        </div>
        <p class="mt-2 text-sm text-gray-700 dark:text-white/70">
          {{ m.text }}
        </p>
      </div>

      <div
        class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/75 dark:bg-black/35 backdrop-blur p-5"
      >
        <p class="font-extrabold text-gray-900 dark:text-white">New message feature idea 💡</p>
        <p class="mt-2 text-sm text-gray-700 dark:text-white/70">
          Add a small “Support chat” widget in future (even demo mode).
        </p>
      </div>
    </div>
  </section>
</template>