<script setup lang="ts">
import { computed, ref } from "vue"
import { useAuthStore } from "../stores/authStore"
import { useRouter } from "vue-router"
import { useToastStore } from "../stores/toastStore"

const router = useRouter()
const auth = useAuthStore()
const toast = useToastStore()

const name = ref(auth.user?.name ?? "")
const email = ref(auth.user?.email ?? "")
const phone = ref(auth.user?.phone ?? "")
const address = ref(auth.user?.address ?? "")

const canSave = computed(() => name.value.trim() && email.value.trim())

function save() {
  if (!canSave.value) return
  auth.signIn({
    name: name.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim() || undefined,
    address: address.value.trim() || undefined,
  })
  toast.show("Profile updated (demo)", "success")
}
</script>

<template>
  <section class="py-6 min-h-screen">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">Settings</h1>
      <button
        class="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700
               bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        @click="router.back()"
      >
        Back
      </button>
    </div>

    <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 max-w-2xl">
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Frontend only — saving updates your localStorage user.
      </p>

      <div class="grid gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
          <input v-model="name"
            class="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
                   text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input v-model="email" type="email"
            class="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
                   text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone</label>
          <input v-model="phone"
            class="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
                   text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Address</label>
          <textarea v-model="address" rows="2"
            class="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
                   text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none"
          />
        </div>

        <button
          :disabled="!canSave"
          @click="save"
          class="mt-2 w-full py-3 rounded-xl font-bold text-white
                 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500
                 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  </section>
</template>