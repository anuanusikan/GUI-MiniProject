<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/authStore"
import { useToastStore } from "../stores/toastStore"

const router = useRouter()
const auth = useAuthStore()
const toast = useToastStore()

const email = ref("")
const password = ref("")
const loading = ref(false)
const showPassword = ref(false)

// Demo accounts
const demoAccounts = [
  { name: "John Doe", email: "john@demo.com", password: "demo123" },
  { name: "Jane Smith", email: "jane@demo.com", password: "demo123" },
  { name: "Admin User", email: "admin@demo.com", password: "admin123" },
]

function useDemoAccount(account: typeof demoAccounts[number]) {
  email.value = account.email
  password.value = account.password
  toast.show(`Using ${account.name}'s account`, "info")
}

async function handleSignIn() {
  const e = email.value.trim()
  const p = password.value

  if (!e || !p) {
    toast.show("Please fill in all fields", "error")
    return
  }

  loading.value = true

  setTimeout(() => {
    // Check demo accounts
    const demoAccount = demoAccounts.find((acc) => acc.email === e && acc.password === p)

    if (demoAccount) {
      auth.signIn({ name: demoAccount.name, email: demoAccount.email })
      toast.show(`Welcome back, ${demoAccount.name}!`, "success")
      router.push("/")
      loading.value = false
      return
    }

    // ✅ FIX: nameFromEmail cannot be undefined with this safe fallback
    const nameFromEmail = (e.split("@")[0] || "User").trim()
    const capitalizedName =
      nameFromEmail.length > 0
        ? nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
        : "User"

    auth.signIn({
      name: capitalizedName,
      email: e,
    })

    toast.show("Signed in successfully!", "success")
    router.push("/")
    loading.value = false
  }, 900)
}

function goToSignUp() {
  router.push("/signup")
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
          <span class="text-2xl">🛒</span>
        </div>

        <h1 class="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
          Welcome back to
          <span class="bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
            AlloraCart
          </span>
        </h1>
        <p class="mt-2 text-sm text-gray-700/80 dark:text-white/70">Sign in to continue shopping</p>
      </div>

      <!-- Card -->
      <div
        class="rounded-2xl border shadow-xl p-8 backdrop-blur
               border-gray-200 bg-white/75
               dark:border-white/10 dark:bg-black/35"
      >
        <h2 class="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Sign In</h2>

        <form @submit.prevent="handleSignIn" class="space-y-5">
          <!-- Email -->
          <div>
            <label class="block text-sm font-bold text-gray-800 dark:text-white/80 mb-2">
              Email Address
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
              Password
            </label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
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

          <!-- Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 rounded-xl font-extrabold
                   text-black bg-gradient-to-r from-amber-400 to-yellow-300
                   hover:opacity-90 transition disabled:opacity-60"
          >
            {{ loading ? "Signing In..." : "Sign In" }}
          </button>
        </form>

        <!-- Demo Accounts -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
          <p class="text-sm font-extrabold text-gray-900 dark:text-white mb-3 text-center">
            🎭 Try Demo Accounts
          </p>

          <div class="space-y-2">
            <button
              v-for="account in demoAccounts"
              :key="account.email"
              @click="useDemoAccount(account)"
              type="button"
              class="w-full px-4 py-2 rounded-xl text-left border
                     border-gray-200 bg-white/70 hover:bg-white/90 transition
                     dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
            >
              <p class="text-sm font-bold text-gray-900 dark:text-white">{{ account.name }}</p>
              <p class="text-xs text-gray-600 dark:text-white/60">{{ account.email }}</p>
            </button>
          </div>
        </div>

        <!-- Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-700 dark:text-white/70">
            Don't have an account?
            <button
              @click="goToSignUp"
              type="button"
              class="font-extrabold text-gray-900 dark:text-white underline underline-offset-4
                     hover:text-amber-600 dark:hover:text-amber-300 transition"
            >
              Sign Up
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