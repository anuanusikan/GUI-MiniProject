<script setup lang="ts">
const methods = [
  { id: 1, brand: "VISA", last4: "4587", label: "Primary" },
  { id: 2, brand: "Mastercard", last4: "0091", label: "Backup" },
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
        <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Payment Methods</h1>
        <p class="mt-2 text-sm text-gray-700/80 dark:text-white/70">
          Demo list (frontend only).
        </p>
      </div>
    </div>

    <div class="mt-6 grid md:grid-cols-2 gap-6">
      <div
        v-for="m in methods"
        :key="m.id"
        class="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/75 dark:bg-black/35 backdrop-blur p-6"
      >
        <div class="flex items-center justify-between">
          <p class="text-lg font-extrabold text-gray-900 dark:text-white">{{ m.brand }}</p>
          <span class="text-xs font-extrabold px-3 py-1 rounded-full border
                       border-gray-200 bg-white/70 text-gray-800
                       dark:border-white/10 dark:bg-white/10 dark:text-white/80">
            {{ m.label }}
          </span>
        </div>

        <p class="mt-3 text-sm text-gray-600 dark:text-white/60">
          •••• •••• •••• {{ m.last4 }}
        </p>

        <div class="mt-5 flex gap-3">
          <button
            class="px-4 py-2 rounded-xl font-extrabold text-black
                   bg-gradient-to-r from-amber-400 to-yellow-300 hover:opacity-90 transition"
          >
            Set Default
          </button>
          <button
            class="px-4 py-2 rounded-xl font-bold border
                   border-gray-200 bg-white/70 hover:bg-white/90 transition
                   dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white"
          >
            Remove
          </button>
        </div>
      </div>

      <!-- Add new -->
      <div class="rounded-2xl border border-dashed border-gray-300 dark:border-white/20 bg-white/50 dark:bg-white/5 p-6">
        <p class="text-lg font-extrabold text-gray-900 dark:text-white">Add Payment Method</p>
        <p class="mt-2 text-sm text-gray-700 dark:text-white/70">
          (Demo) You can add a modal form later.
        </p>

        <button
          class="mt-5 px-5 py-3 rounded-xl font-extrabold text-gray-900
                 border border-gray-200 bg-white/70 hover:bg-white/90 transition
                 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white"
        >
          + Add New
        </button>
      </div>
    </div>
  </section>
</template>