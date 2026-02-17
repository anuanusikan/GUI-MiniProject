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
  if (!name.value.trim() || !email.value.trim() || !password.value) {
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

  setTimeout(() => {
    auth.signUp({
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim() || undefined,
      address: address.value.trim() || undefined,
    })

    toast.show(`Welcome to AlloraCart, ${name.value.trim()}!`, "success")
    router.push("/")
    loading.value = false
  }, 900)
}

function goToSignIn() {
  router.push("/signin")
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4
           bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.18),_transparent_60%),linear-gradient(135deg,_#f8fafc_0%,_#fde68a_35%,_#dbeafe_100%)]
           dark:bg-[radial-gradient(ellipse_at_top,_rgba(250,204,21,0.16),_transparent_60%),linear-gradient(135deg,_#000000_0%,_#111827_45%,_#a3a3a3_120%)]"
  >
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl
                    bg-white/70 border border-gray-200 shadow-md
                    dark:bg-white/10 dark:border-white/15 backdrop-blur">
          <span class="text-2xl">✨</span>
        </div>

        <h1 class="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
          Join
          <span class="bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
            AlloraCart
          </span>
        </h1>
        <p class="mt-2 text-sm text-gray-700/80 dark:text-white/70">
          Create your account and start shopping
        </p>
      </div>

      <!-- Card -->
      <div
        class="rounded-2xl border shadow-xl p-8 backdrop-blur
               border-gray-200 bg-white/75
               dark:border-white/10 dark:bg-black/35"
      >
        <h2 class="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Create Account</h2>

        <form @submit.prevent="handleSignUp" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-bold text-gray-800 dark:text-white/80 mb-2">
              Full Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="name"
              type="text"
              placeholder="John Doe"
              class="w-full px-4 py-3 rounded-xl border-2
                     border-gray-200 bg-white text-gray-900
                     focus:ring-2 focus:ring-amber-400 focus:border-transparent
                     dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-bold text-gray-800 dark:text-white/80 mb-2">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="your@email.com"
              class="w-full px-4 py-3 rounded-xl border-2
                     border-gray-200 bg-white text-gray-900
                     focus:ring-2 focus:ring-amber-400 focus:border-transparent
                     dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-bold text-gray-800 dark:text-white/80 mb-2">
              Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="At least 6 characters"
                class="w-full px-4 py-3 rounded-xl border-2 pr-12
                       border-gray-200 bg-white text-gray-900
                       focus:ring-2 focus:ring-amber-400 focus:border-transparent
                       dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg
                       hover:bg-black/5 dark:hover:bg-white/10 transition"
              >
                <span class="text-sm font-bold text-gray-700 dark:text-white/80">
                  {{ showPassword ? "Hide" : "Show" }}
                </span>
              </button>
            </div>
          </div>

          <!-- Confirm -->
          <div>
            <label class="block text-sm font-bold text-gray-800 dark:text-white/80 mb-2">
              Confirm Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Re-enter your password"
                class="w-full px-4 py-3 rounded-xl border-2 pr-12
                       border-gray-200 bg-white text-gray-900
                       focus:ring-2 focus:ring-amber-400 focus:border-transparent
                       dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg
                       hover:bg-black/5 dark:hover:bg-white/10 transition"
              >
                <span class="text-sm font-bold text-gray-700 dark:text-white/80">
                  {{ showConfirmPassword ? "Hide" : "Show" }}
                </span>
              </button>
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-bold text-gray-800 dark:text-white/80 mb-2">
              Phone <span class="text-xs text-gray-500 dark:text-white/50">(Optional)</span>
            </label>
            <input
              v-model="phone"
              type="tel"
              placeholder="+94 7X XXX XXXX"
              class="w-full px-4 py-3 rounded-xl border-2
                     border-gray-200 bg-white text-gray-900
                     focus:ring-2 focus:ring-amber-400 focus:border-transparent
                     dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50"
            />
          </div>

          <!-- Address -->
          <div>
            <label class="block text-sm font-bold text-gray-800 dark:text-white/80 mb-2">
              Address <span class="text-xs text-gray-500 dark:text-white/50">(Optional)</span>
            </label>
            <textarea
              v-model="address"
              rows="2"
              placeholder="Street, City, Province"
              class="w-full px-4 py-3 rounded-xl border-2 resize-none
                     border-gray-200 bg-white text-gray-900
                     focus:ring-2 focus:ring-amber-400 focus:border-transparent
                     dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-xl font-extrabold
                   text-black bg-gradient-to-r from-amber-400 to-yellow-300
                   hover:opacity-90 transition disabled:opacity-60 mt-3"
          >
            {{ loading ? "Creating Account..." : "Create Account" }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-700 dark:text-white/70">
            Already have an account?
            <button
              @click="goToSignIn"
              type="button"
              class="font-extrabold text-gray-900 dark:text-white underline underline-offset-4
                     hover:text-amber-600 dark:hover:text-amber-300 transition"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      <div class="mt-6 text-center">
        <router-link
          to="/"
          class="text-sm font-bold text-gray-800 dark:text-white/80 hover:text-amber-600 dark:hover:text-amber-300 transition"
        >
          ← Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>