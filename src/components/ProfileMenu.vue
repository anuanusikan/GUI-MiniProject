<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/authStore"

const router = useRouter()
const auth = useAuthStore()

const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

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
  router.push("/payment-methods")
}

function goToSettings() {
  closeMenu()
  router.push("/settings")
}


// Close menu when clicking outside
function handleClickOutside(event: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>

<template>
  <div class="relative" ref="menuRef">
    <!-- Profile Button -->
    <button
      @click="toggleMenu"
      class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 
             transition text-gray-700 dark:text-gray-300 relative"
      :class="{ 'bg-gray-100 dark:bg-gray-700': isOpen }"
      aria-label="Profile menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"
        />
      </svg>

      <!-- Online Indicator (when logged in) -->
      <span
        v-if="auth.isAuthenticated"
        class="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-green-500 dark:bg-green-400 
               border-2 border-white dark:border-gray-800"
      ></span>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-64 rounded-xl 
               border border-gray-200 dark:border-gray-700 
               bg-white dark:bg-gray-800 
               shadow-xl z-50 overflow-hidden"
      >
        <!-- User Info (when logged in) -->
        <div
          v-if="auth.isAuthenticated"
          class="px-4 py-3 border-b border-gray-100 dark:border-gray-700
                 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30"
        >
          <div class="flex items-center gap-3">
            <!-- Avatar -->
            <div class="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 
                        flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {{ (auth.user?.name || 'U').charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-gray-900 dark:text-white truncate">
                {{ auth.user?.name || "User" }}
              </p>
              <p class="text-xs text-gray-600 dark:text-gray-400 truncate">
                {{ auth.user?.email || "" }}
              </p>
            </div>
          </div>
        </div>

        <!-- Guest Header (when logged out) -->
        <div
          v-else
          class="px-4 py-3 border-b border-gray-100 dark:border-gray-700
                 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
        >
          <p class="text-sm font-semibold text-gray-900 dark:text-white">Welcome to AlloraCart!</p>
          <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Sign in to access all features</p>
        </div>

        <!-- Menu Items -->
        <div class="py-2">
          <!-- Logged In Menu -->
          <template v-if="auth.isAuthenticated">
            <button
              @click="goToOrders"
              class="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100
                     hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                     flex items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              My Orders
            </button>

            <button
              @click="goToMessages"
              class="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100
                     hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                     flex items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Messages
            </button>

            <button
              @click="goToPayment"
              class="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100
                     hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                     flex items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payment Methods
            </button>

            <button
              @click="goToSettings"
              class="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100
                     hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                     flex items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>

            <div class="my-2 border-t border-gray-100 dark:border-gray-700"></div>

            <button
              @click="logout"
              class="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400
                     hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors
                     flex items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </template>

          <!-- Guest Menu -->
          <template v-else>
            <button
              @click="openSignIn"
              class="w-full text-left px-4 py-3 text-sm font-bold
                     bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500
                     text-white hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600
                     transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
            </button>

            <button
              @click="openSignUp"
              class="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100
                     hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                     flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Create Account
            </button>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>