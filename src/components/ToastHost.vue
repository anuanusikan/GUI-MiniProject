<script setup lang="ts">
import { computed } from "vue"
import { useToastStore } from "../stores/toastStore"

const toast = useToastStore()

const tone = computed(() => {
  if (toast.type === "success") return "bg-emerald-600"
  if (toast.type === "error") return "bg-red-600"
  return "bg-slate-800"
})
</script>

<template>
  <div class="fixed top-20 right-4 z-[70]">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="toast.isOpen"
        :class="tone"
        class="text-white rounded-xl shadow-lg px-4 py-3 flex items-start gap-3 max-w-xs"
        role="status"
        aria-live="polite"
      >
        <span class="text-lg leading-none">
          <span v-if="toast.type === 'success'">✅</span>
          <span v-else-if="toast.type === 'error'">⚠️</span>
          <span v-else>ℹ️</span>
        </span>

        <div class="text-sm font-medium leading-snug flex-1">
          {{ toast.message }}
        </div>

        <button
          class="text-white/90 hover:text-white transition"
          aria-label="Close toast"
          @click="toast.close()"
        >
          ✕
        </button>
      </div>
    </transition>
  </div>
</template>