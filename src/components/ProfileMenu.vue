<script setup lang="ts">
import { computed } from "vue"
import { useAuthStore } from "../stores/authStore"
import { useUiStore } from "../stores/uiStore"

const authStore = useAuthStore()
const uiStore = useUiStore()

const displayName = computed(() => authStore.user?.name ?? "Account")

function signOut() {
  authStore.signOut()
}
</script>

<template>
  <div class="w-56 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
    <div class="px-4 py-3 border-b border-gray-100">
      <p class="text-sm font-semibold text-gray-900">{{ displayName }}</p>
      <p class="text-xs text-gray-500" v-if="authStore.user">{{ authStore.user.email }}</p>
      <p class="text-xs text-gray-500" v-else>Welcome to Shop In Haven</p>
    </div>

    <!-- Not logged in -->
    <div v-if="!authStore.isAuthenticated" class="p-2">
      <button
        class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
        @click="uiStore.openAuth('signin')"
      >
        Sign In
      </button>
      <button
        class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
        @click="uiStore.openAuth('signup')"
      >
        Sign Up
      </button>
    </div>

    <!-- Logged in -->
    <div v-else class="p-2">
      <a class="block px-3 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium" href="#orders">
        My Orders
      </a>
      <a class="block px-3 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium" href="#messages">
        Message Center
      </a>
      <a class="block px-3 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium" href="#payments">
        Payment
      </a>
      <a class="block px-3 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium" href="#settings">
        Settings
      </a>

      <div class="my-2 border-t border-gray-100"></div>

      <button
        class="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 transition text-sm font-semibold text-red-600"
        @click="signOut"
      >
        Logout
      </button>
    </div>
  </div>
</template>
