<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/authStore"
import { useToastStore } from "../stores/toastStore"

const router = useRouter()
const auth = useAuthStore()
const toast = useToastStore()

const username = ref("")
const password = ref("")
const showPassword = ref(false)

// ✅ Real DummyJSON demo accounts
const demoAccounts = [
  { label: "Emily Johnson",  username: "emilys",     password: "emilyspass"  },
  { label: "Michael Williams", username: "michaelw", password: "michaelwpass"},
  { label: "Sophia Brown",   username: "sophiab",    password: "sophiabpass" },
]

function useDemoAccount(acc: typeof demoAccounts[number]) {
  username.value = acc.username
  password.value = acc.password
  toast.show(`Using ${acc.label}'s account`, "info")
}

async function handleSignIn() {
  if (!username.value.trim() || !password.value) {
    toast.show("Please fill in all fields", "error")
    return
  }
  const ok = await auth.signIn(username.value.trim(), password.value)
  if (ok) {
    toast.show(`Welcome back, ${auth.user?.name}!`, "success")
    router.push("/")
  } else {
    toast.show(auth.error ?? "Sign in failed", "error")
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4
              bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.18),_transparent_60%),
              linear-gradient(135deg,_#f8fafc_0%,_#fde68a_35%,_#dbeafe_100%)]
              dark:bg-[radial-gradient(ellipse_at_top,_rgba(250,204,21,0.16),_transparent_60%),
              linear-gradient(135deg,_#000000_0%,_#111827_45%,_#a3a3a3_120%)]">
    <div class="w-full max-w-md">

      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl
                    bg-white/70 border border-gray-200 shadow-md
                    dark:bg-white/10 dark:border-white/15 backdrop-blur">
          <span style="font-size:24px">🛒</span>
        </div>
        <h1 class="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
          Welcome back to
          <span class="bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
            AlloraCart
          </span>
        </h1>
        <p class="mt-2 text-sm text-gray-700/80 dark:text-white/70">Sign in with your DummyJSON account</p>
      </div>

      <div class="rounded-2xl border shadow-xl p-8 backdrop-blur
                  border-gray-200 bg-white/75
                  dark:border-white/10 dark:bg-black/35">

        <form @submit.prevent="handleSignIn" class="space-y-5">
          <div>
            <label class="block text-sm font-bold text-gray-800 dark:text-white/80 mb-2">Username</label>
            <input
              v-model="username"
              type="text"
              placeholder="e.g. emilys"
              class="w-full px-4 py-3 rounded-xl border-2
                     border-gray-200 bg-white text-gray-900
                     focus:ring-2 focus:ring-amber-400 focus:border-transparent
                     dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-800 dark:text-white/80 mb-2">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full px-4 py-3 rounded-xl border-2 pr-16
                       border-gray-200 bg-white text-gray-900
                       focus:ring-2 focus:ring-amber-400 focus:border-transparent
                       dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold
                       text-gray-700 dark:text-white/80 px-2 py-1 rounded hover:bg-black/5"
              >
                {{ showPassword ? "Hide" : "Show" }}
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="auth.loading"
            class="w-full py-3 rounded-xl font-extrabold text-black
                   bg-gradient-to-r from-amber-400 to-yellow-300
                   hover:opacity-90 transition disabled:opacity-60"
          >
            {{ auth.loading ? "Signing in..." : "Sign In" }}
          </button>
        </form>

        <!-- DummyJSON demo accounts -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
          <p class="text-sm font-extrabold text-gray-900 dark:text-white mb-3 text-center">
            Try a DummyJSON account
          </p>
          <div class="space-y-2">
            <button
              v-for="acc in demoAccounts"
              :key="acc.username"
              @click="useDemoAccount(acc)"
              type="button"
              class="w-full px-4 py-2 rounded-xl text-left border
                     border-gray-200 bg-white/70 hover:bg-white/90 transition
                     dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
            >
              <p class="text-sm font-bold text-gray-900 dark:text-white">{{ acc.label }}</p>
              <p class="text-xs text-gray-600 dark:text-white/60">username: {{ acc.username }}</p>
            </button>
          </div>
        </div>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-700 dark:text-white/70">
            Don't have an account?
            <button
              @click="router.push('/signup')"
              type="button"
              class="font-extrabold text-gray-900 dark:text-white underline
                     hover:text-amber-600 dark:hover:text-amber-300 transition"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>

      <div class="mt-6 text-center">
        <router-link to="/"
          class="text-sm font-bold text-gray-800 dark:text-white/80
                 hover:text-amber-600 dark:hover:text-amber-300 transition">
          ← Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>