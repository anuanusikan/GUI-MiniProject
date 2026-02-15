<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/authStore"
import { useToastStore } from "../stores/toastStore"

const router = useRouter()
const auth = useAuthStore()
const toast = useToastStore()

const name = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const phone = ref("")
const address = ref("")
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

async function handleSignUp() {
  // Validation
  if (!name.value || !email.value || !password.value) {
    toast.show("Please fill in all required fields", "error")
    return
  }

  if (password.value !== confirmPassword.value) {
    toast.show("Passwords do not match", "error")
    return
  }

  if (password.value.length < 6) {
    toast.show("Password must be at least 6 characters", "error")
    return
  }

  loading.value = true

  // Simulate API call
  setTimeout(() => {
    auth.signUp({
      name: name.value,
      email: email.value,
      phone: phone.value || undefined,
      address: address.value || undefined,
    })

    toast.show(`Welcome to AlloraCart, ${name.value}!`, "success")
    router.push("/")
    loading.value = false
  }, 1000)
}

function goToSignIn() {
  router.push("/signin")
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
    <div class="w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-2 mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            class="w-12 h-12 text-indigo-600 dark:text-indigo-400"
          >
            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
          </svg>
        </div>
        <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">
          Join <span class="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">AlloraCart</span>
        </h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Create your account and start shopping</p>
      </div>

      <!-- Sign Up Card -->
      <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Account</h2>

        <form @submit.prevent="handleSignUp" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Full Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="name"
              type="text"
              placeholder="John Doe"
              class="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     placeholder:text-gray-400 dark:placeholder:text-gray-500
                     focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800
                     transition-all"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Address <span class="text-red-500">*</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="your@email.com"
              class="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     placeholder:text-gray-400 dark:placeholder:text-gray-500
                     focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800
                     transition-all"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="At least 6 characters"
                class="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       placeholder:text-gray-400 dark:placeholder:text-gray-500
                       focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800
                       transition-all pr-12"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Re-enter your password"
                class="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       placeholder:text-gray-400 dark:placeholder:text-gray-500
                       focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800
                       transition-all pr-12"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Phone (Optional) -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Phone Number <span class="text-xs text-gray-500">(Optional)</span>
            </label>
            <input
              v-model="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              class="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     placeholder:text-gray-400 dark:placeholder:text-gray-500
                     focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800
                     transition-all"
            />
          </div>

          <!-- Address (Optional) -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Address <span class="text-xs text-gray-500">(Optional)</span>
            </label>
            <textarea
              v-model="address"
              rows="2"
              placeholder="123 Main St, City, Country"
              class="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     placeholder:text-gray-400 dark:placeholder:text-gray-500
                     focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800
                     transition-all resize-none"
            ></textarea>
          </div>

          <!-- Sign Up Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-xl font-bold text-white
                   bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500
                   hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600
                   disabled:opacity-50 disabled:cursor-not-allowed
                   shadow-lg hover:shadow-xl transition-all duration-200
                   flex items-center justify-center gap-2 mt-6"
          >
            <svg v-if="loading" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? "Creating Account..." : "Create Account" }}
          </button>
        </form>

        <!-- Sign In Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <button
              @click="goToSignIn"
              type="button"
              class="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="mt-6 text-center">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>