<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/authStore"
import { useFavoritesStore } from "../stores/favoritesStore"

const favs = useFavoritesStore()
const router = useRouter()
const auth = useAuthStore()

const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
}
function closeMenu() {
  isOpen.value = false
}

function openSignIn() {
  closeMenu()
  router.push("/signin")
}
function openSignUp() {
  closeMenu()
  router.push("/signup")
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    auth.signOut()
    closeMenu()
    favs.clear()
    router.push("/")
  }
}

function goToOrders() {
  closeMenu()
  router.push("/orders")
}
function goToMessages() {
  closeMenu()
  router.push("/messages")
}
function goToPayment() {
  closeMenu()
  router.push("/payment")
}
function goToSettings() {
  closeMenu()
  router.push("/settings")
}
</script>

<template>
  <div class="relative">
    <!--  Profile Button -->
    <button type="button" @click.stop="toggleMenu" class="p-2 rounded-md transition relative inline-flex
             hover:bg-black/5 dark:hover:bg-white/10
             text-slate-900 dark:text-[#e6e6e6]" :class="{ 'bg-black/5 dark:bg-white/10': isOpen }"
      aria-label="Profile menu">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
      </svg>

      <!-- Online Indicator -->
      <span v-if="auth.isAuthenticated" class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full
               bg-emerald-500 dark:bg-emerald-400
               shadow-[0_0_0_2px_rgba(255,255,255,0.85)]
               dark:shadow-[0_0_0_2px_rgba(0,0,0,0.7)]"></span>
    </button>

    <!--  Overlay -->
    <div v-if="isOpen" class="fixed inset-0 z-[9998]" @click="closeMenu"></div>

    <!--  Dropdown -->
    <div v-if="isOpen" class="absolute right-0 top-full mt-2 w-64 rounded-xl
         border border-gray-200 dark:border-gray-700
         bg-white dark:bg-gray-800
         shadow-xl z-[9999] overflow-hidden">


      <!-- Header -->
      <div class="px-4 py-3 border-b border-black/10 dark:border-white/10
               bg-gradient-to-r from-[#e7f3ff] via-[#dbfff1] to-[#f3f6fb]
               dark:from-[#070708] dark:via-[#14110d] dark:to-[#0b1722]">
        <template v-if="auth.isAuthenticated">
          <p class="text-sm font-bold text-gray-900 dark:text-white truncate">
            {{ auth.user?.name || "User" }}
          </p>
          <p class="text-xs text-gray-600 dark:text-white/60 truncate">
            {{ auth.user?.email || "" }}
          </p>
        </template>

        <template v-else>
          <p class="text-sm font-semibold text-gray-900 dark:text-white">Welcome to AlloraCart!</p>
          <p class="text-xs text-gray-600 dark:text-white/60 mt-1">Sign in to access all features</p>
        </template>
      </div>

      <!-- Items -->
      <div class="py-2">
        <template v-if="auth.isAuthenticated">
          <button type="button" @click="goToOrders" class="w-full text-left px-4 py-2.5 text-sm font-medium
                   text-gray-900 dark:text-gray-100
                   hover:bg-black/5 dark:hover:bg-white/10 transition">
            My Orders
          </button>

          <button type="button" @click="goToMessages" class="w-full text-left px-4 py-2.5 text-sm font-medium
                   text-gray-900 dark:text-gray-100
                   hover:bg-black/5 dark:hover:bg-white/10 transition">
            Messages
          </button>

          <button type="button" @click="goToPayment" class="w-full text-left px-4 py-2.5 text-sm font-medium
                   text-gray-900 dark:text-gray-100
                   hover:bg-black/5 dark:hover:bg-white/10 transition">
            Payment Methods
          </button>

          <button type="button" @click="goToSettings" class="w-full text-left px-4 py-2.5 text-sm font-medium
                   text-gray-900 dark:text-gray-100
                   hover:bg-black/5 dark:hover:bg-white/10 transition">
            Settings
          </button>

          <div class="my-2 border-t border-black/10 dark:border-white/10"></div>

          <button type="button" @click="logout" class="w-full text-left px-4 py-2.5 text-sm font-medium
                   text-red-600 dark:text-red-400
                   hover:bg-red-50 dark:hover:bg-red-900/20 transition">
            Logout
          </button>
        </template>

        <template v-else>
          <button type="button" @click="openSignIn" class="w-full px-4 py-3 text-sm font-bold text-black
                   bg-gradient-to-r from-[#d4af37] via-[#f0e1a6] to-[#c0c0c0]
                   hover:brightness-110 transition">
            Sign In
          </button>

          <button type="button" @click="openSignUp" class="w-full px-4 py-2.5 text-sm font-medium
                   text-gray-900 dark:text-gray-100
                   hover:bg-black/5 dark:hover:bg-white/10 transition">
            Create Account
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
