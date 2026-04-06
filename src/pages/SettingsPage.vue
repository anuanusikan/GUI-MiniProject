<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/authStore"
import { useToastStore } from "../stores/toastStore"
import { useDarkModeStore } from "../stores/darkModeStore"

const router = useRouter()
const auth = useAuthStore()
const toast = useToastStore()
const darkMode = useDarkModeStore()


const emailUpdates = ref(true)
const smsUpdates = ref(false)
const orderAlerts = ref(true)

const privacyProfilePublic = ref(false)
const twoFactorDemo = ref(false)

const displayName = ref(auth.user?.name ?? "")
const phone = ref(auth.user?.phone ?? "")
const address = ref(auth.user?.address ?? "")

const isLoggedIn = computed(() => auth.isAuthenticated)

function requireLogin(actionName: string) {
  if (!isLoggedIn.value) {
    toast.show(`Please sign in to use ${actionName}`, "error")
    router.push("/signin")
    return false
  }
  return true
}

function saveAccount() {
  if (!requireLogin("Account settings")) return

  auth.signUp({
  name: displayName.value.trim() || "Customer",
  email: auth.user!.email,
  phone: phone.value.trim() || undefined,
  address: address.value.trim() || undefined,
})

  toast.show("Account details updated (demo)", "success")
}

function changePassword() {
  if (!requireLogin("Password settings")) return
  toast.show("Password change is demo-only (no backend)", "info")
}

function enable2FA() {
  if (!requireLogin("Security settings")) return
  twoFactorDemo.value = !twoFactorDemo.value
  toast.show(twoFactorDemo.value ? "2FA enabled (demo)" : "2FA disabled (demo)", "info")
}

function contactSupport() {
  toast.show("Support center coming soon!", "info")
}

function requestDeletion() {
  if (!requireLogin("Account deletion")) return
  toast.show("Account deletion request saved (demo)", "info")
}
</script>

<template>
  <section class="py-8">
    <!-- Header -->
    <div
      class="rounded-2xl p-5 sm:p-6 border
             bg-white/80 dark:bg-gray-900/60
             border-gray-200 dark:border-gray-800
             shadow-sm"
    >
      <div class="flex items-start sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your account, privacy, and preferences (frontend demo).
          </p>
        </div>

        <button
          class="px-4 py-2 rounded-xl font-semibold
                 border border-gray-200 dark:border-gray-700
                 bg-white dark:bg-gray-800
                 text-gray-900 dark:text-white
                 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          @click="router.back()"
        >
          Back
        </button>
      </div>

      <!-- Logged in badge -->
      <div class="mt-4">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold
                 border border-gray-200 dark:border-gray-700
                 bg-gray-50 dark:bg-gray-800
                 text-gray-700 dark:text-gray-200"
        >
          <span class="h-2 w-2 rounded-full" :class="isLoggedIn ? 'bg-emerald-500' : 'bg-gray-400'"></span>
          <span v-if="isLoggedIn">Signed in as {{ auth.user?.email }}</span>
          <span v-else>Not signed in</span>
        </div>
      </div>
    </div>

    <!-- Grid -->
    <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Account -->
      <div
        class="rounded-2xl border p-5 sm:p-6
               bg-gradient-to-br from-gray-50 to-white
               dark:from-gray-900 dark:to-gray-950
               border-gray-200 dark:border-gray-800"
      >
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl grid place-items-center
                      bg-indigo-600 text-white font-bold">
            A
          </div>
          <div>
            <h2 class="text-lg font-extrabold text-gray-900 dark:text-white">Account</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Profile & contact info</p>
          </div>
        </div>

        <div class="mt-5 space-y-4">
          <div>
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Display name</label>
            <input
              v-model="displayName"
              type="text"
              placeholder="Your name"
              class="mt-1 w-full rounded-xl border-2 px-4 py-3
                     border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-900
                     text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</label>
            <input
              v-model="phone"
              type="tel"
              placeholder="+94 7X XXX XXXX"
              class="mt-1 w-full rounded-xl border-2 px-4 py-3
                     border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-900
                     text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Address</label>
            <textarea
              v-model="address"
              rows="2"
              placeholder="Street, City"
              class="mt-1 w-full rounded-xl border-2 px-4 py-3 resize-none
                     border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-900
                     text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="saveAccount"
              class="flex-1 rounded-xl py-3 font-bold text-white
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     hover:from-indigo-700 hover:to-purple-700 transition"
            >
              Save Changes
            </button>

            <button
              @click="changePassword"
              class="flex-1 rounded-xl py-3 font-bold
                     border-2 border-gray-200 dark:border-gray-700
                     bg-white dark:bg-gray-900
                     text-gray-900 dark:text-white
                     hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <!-- Preferences -->
      <div
        class="rounded-2xl border p-5 sm:p-6
               bg-gradient-to-br from-indigo-50 to-white
               dark:from-gray-900 dark:to-gray-950
               border-gray-200 dark:border-gray-800"
      >
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl grid place-items-center
                      bg-amber-500 text-white font-bold">
            P
          </div>
          <div>
            <h2 class="text-lg font-extrabold text-gray-900 dark:text-white">Preferences</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Theme & notifications</p>
          </div>
        </div>

        <div class="mt-5 space-y-4">
          <!-- Theme -->
          <div class="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white/70 dark:bg-gray-900/40">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="font-bold text-gray-900 dark:text-white">Dark Mode</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Toggle theme for better viewing.
                </p>
              </div>

              <button
                @click="darkMode.toggle()"
                class="px-4 py-2 rounded-xl font-bold
                       bg-gray-900 text-white dark:bg-white dark:text-gray-900
                       hover:opacity-90 transition"
              >
                {{ darkMode.isDark ? "ON" : "OFF" }}
              </button>
            </div>
          </div>

          <!-- Notification switches -->
          <div class="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white/70 dark:bg-gray-900/40">
            <p class="font-bold text-gray-900 dark:text-white">Notifications</p>

            <div class="mt-3 space-y-3">
              <label class="flex items-center justify-between gap-3">
                <span class="text-sm text-gray-700 dark:text-gray-300">Order alerts</span>
                <input v-model="orderAlerts" type="checkbox" class="h-5 w-5 accent-indigo-600" />
              </label>

              <label class="flex items-center justify-between gap-3">
                <span class="text-sm text-gray-700 dark:text-gray-300">Email updates</span>
                <input v-model="emailUpdates" type="checkbox" class="h-5 w-5 accent-indigo-600" />
              </label>

              <label class="flex items-center justify-between gap-3">
                <span class="text-sm text-gray-700 dark:text-gray-300">SMS updates</span>
                <input v-model="smsUpdates" type="checkbox" class="h-5 w-5 accent-indigo-600" />
              </label>

              <button
                class="mt-2 w-full rounded-xl py-2.5 font-bold
                       border border-gray-200 dark:border-gray-700
                       bg-white dark:bg-gray-900
                       text-gray-900 dark:text-white
                       hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                @click="toast.show('Preferences saved (demo)', 'success')"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Privacy & Security -->
      <div
        class="rounded-2xl border p-5 sm:p-6
               bg-gradient-to-br from-rose-50 to-white
               dark:from-gray-900 dark:to-gray-950
               border-gray-200 dark:border-gray-800"
      >
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl grid place-items-center
                      bg-rose-600 text-white font-bold">
            S
          </div>
          <div>
            <h2 class="text-lg font-extrabold text-gray-900 dark:text-white">Privacy & Security</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Control your privacy</p>
          </div>
        </div>

        <div class="mt-5 space-y-4">
          <div class="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white/70 dark:bg-gray-900/40">
            <label class="flex items-center justify-between gap-3">
              <div>
                <p class="font-bold text-gray-900 dark:text-white">Public profile</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Show profile publicly (demo)</p>
              </div>
              <input v-model="privacyProfilePublic" type="checkbox" class="h-5 w-5 accent-rose-600" />
            </label>
          </div>

          <div class="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white/70 dark:bg-gray-900/40">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="font-bold text-gray-900 dark:text-white">Two-factor authentication</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Extra security layer (demo)</p>
              </div>

              <button
                @click="enable2FA"
                class="px-4 py-2 rounded-xl font-bold
                       bg-rose-600 text-white hover:bg-rose-700 transition"
              >
                {{ twoFactorDemo ? "Enabled" : "Enable" }}
              </button>
            </div>
          </div>

          <button
            @click="requestDeletion"
            class="w-full rounded-xl py-3 font-bold
                   border-2 border-rose-200 dark:border-rose-900
                   bg-rose-50 dark:bg-rose-950/30
                   text-rose-700 dark:text-rose-300
                   hover:bg-rose-100 dark:hover:bg-rose-950/50 transition"
          >
            Request Account Deletion (demo)
          </button>
        </div>
      </div>

      <!-- Customer Service -->
      <div
        class="rounded-2xl border p-5 sm:p-6
               bg-gradient-to-br from-emerald-50 to-white
               dark:from-gray-900 dark:to-gray-950
               border-gray-200 dark:border-gray-800"
      >
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-xl grid place-items-center
                      bg-emerald-600 text-white font-bold">
            C
          </div>
          <div>
            <h2 class="text-lg font-extrabold text-gray-900 dark:text-white">Customer Service</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Help & support</p>
          </div>
        </div>

        <div class="mt-5 grid gap-3">
          <button
            @click="contactSupport"
            class="w-full rounded-xl p-4 text-left
                   border border-gray-200 dark:border-gray-800
                   bg-white/70 dark:bg-gray-900/40
                   hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <p class="font-bold text-gray-900 dark:text-white">Support Center</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">FAQ, orders, and help articles</p>
          </button>

          <button
            @click="toast.show('Returns & Refunds page coming soon!', 'info')"
            class="w-full rounded-xl p-4 text-left
                   border border-gray-200 dark:border-gray-800
                   bg-white/70 dark:bg-gray-900/40
                   hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <p class="font-bold text-gray-900 dark:text-white">Returns & Refunds</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Your return policy (demo)</p>
          </button>

          <button
            @click="toast.show('Shipping info coming soon!', 'info')"
            class="w-full rounded-xl p-4 text-left
                   border border-gray-200 dark:border-gray-800
                   bg-white/70 dark:bg-gray-900/40
                   hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <p class="font-bold text-gray-900 dark:text-white">Shipping Information</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Delivery times & tracking</p>
          </button>
        </div>

        <div class="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Tip: later you can connect these buttons to real pages.
        </div>
      </div>
    </div>
  </section>
</template>