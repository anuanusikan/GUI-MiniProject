<script setup lang="ts">
const demoOrders = [
  { id: "AC-1021", date: "2026-02-10", status: "Delivered", total: "LKR 18,900" },
  { id: "AC-1022", date: "2026-02-13", status: "Processing", total: "LKR 7,450" },
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
        <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">My Orders</h1>
        <p class="mt-2 text-sm text-gray-700/80 dark:text-white/70">
          Frontend demo (sample data only).
        </p>
      </div>
    </div>

    <div class="mt-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/75 dark:bg-black/35 backdrop-blur overflow-hidden">
      <div class="p-5 border-b border-gray-200 dark:border-white/10">
        <p class="font-extrabold text-gray-900 dark:text-white">Recent Orders</p>
      </div>

      <div class="divide-y divide-gray-200 dark:divide-white/10">
        <div
          v-for="o in demoOrders"
          :key="o.id"
          class="p-5 flex items-center justify-between flex-wrap gap-3"
        >
          <div>
            <p class="font-extrabold text-gray-900 dark:text-white">{{ o.id }}</p>
            <p class="text-sm text-gray-600 dark:text-white/60">{{ o.date }}</p>
          </div>

          <div class="flex items-center gap-3">
            <span
              class="px-3 py-1 rounded-full text-xs font-extrabold border"
              :class="o.status === 'Delivered'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-200 dark:border-emerald-500/20'
                : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-200 dark:border-amber-500/20'"
            >
              {{ o.status }}
            </span>

            <span class="font-extrabold text-gray-900 dark:text-white">{{ o.total }}</span>
          </div>
        </div>
      </div>
    </div>

    <p class="mt-4 text-xs text-gray-500 dark:text-white/50">
      You can later connect real orders if you add a backend.
    </p>
  </section>
</template>