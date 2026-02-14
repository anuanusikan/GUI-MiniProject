<script setup lang="ts">
import { computed, ref } from "vue"
import { useAuthStore } from "../stores/authStore"
import { useUiStore } from "../stores/uiStore"

const authStore = useAuthStore()
const uiStore = useUiStore()

const name = ref("")
const email = ref("")
const password = ref("") // demo only
const phone = ref("")
const address = ref("")


const isSignIn = computed(() => uiStore.authMode === "signin")

function submit() {
    const trimmedEmail = email.value.trim()
    const trimmedName = name.value.trim() || "Customer"

    if (!trimmedEmail) return

    if (isSignIn.value) {
        authStore.signIn({
            name: trimmedName,
            email: trimmedEmail,
        })
    } else {
        authStore.signUp({
            name: trimmedName,
            email: trimmedEmail,
            phone: phone.value.trim(),
            address: address.value.trim(),
        })
    }


    // reset + close
    name.value = ""
    email.value = ""
    password.value = ""
    phone.value = ""
    address.value = ""

    uiStore.closeAuth()

}
</script>

<template>
    <div v-if="uiStore.isAuthModalOpen" class="fixed inset-0 z-[60]">
        <!-- backdrop -->
        <button class="absolute inset-0 bg-black/40" aria-label="Close auth modal" @click="uiStore.closeAuth()" />

        <!-- modal -->
        <div class="relative mx-auto mt-24 w-[92%] max-w-md rounded-2xl bg-white shadow-xl">
            <div class="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 class="text-lg font-bold text-gray-900">
                    {{ isSignIn ? "Sign In" : "Sign Up" }}
                </h3>

                <button class="p-2 rounded-md hover:bg-gray-100 transition" @click="uiStore.closeAuth()"
                    aria-label="Close">
                    ✕
                </button>
            </div>

            <form class="p-5 space-y-4" @submit.prevent="submit">
                <div v-if="!isSignIn">
                    <label class="text-sm font-medium text-gray-700">Name</label>
                    <input v-model="name" type="text" placeholder="Your name" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>

                <div>
                    <label class="text-sm font-medium text-gray-700">Email</label>
                    <input v-model="email" type="email" placeholder="name@example.com" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-indigo-200" required />
                </div>

                <!-- Phone number (Sign Up only) -->
                <div v-if="!isSignIn">
                    <label class="text-sm font-medium text-gray-700">Mobile Number</label>
                    <input v-model="phone" type="tel" placeholder="9876543210" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2
           focus:outline-none focus:ring-2 focus:ring-indigo-200" required />
                </div>

                <!-- Address (Sign Up only) -->
                <div v-if="!isSignIn">
                    <label class="text-sm font-medium text-gray-700">Address</label>
                    <textarea v-model="address" rows="2" placeholder="Street, City, State" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2
           focus:outline-none focus:ring-2 focus:ring-indigo-200" required></textarea>
                </div>


                <div>
                    <label class="text-sm font-medium text-gray-700">Password</label>
                    <input v-model="password" type="password" placeholder="••••••••" class="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-indigo-200" required />
                    <p class="mt-1 text-xs text-gray-500">
                        Demo only (no backend). Any password works.
                    </p>
                </div>

                <button type="submit" class="w-full rounded-lg bg-indigo-600 text-white py-2.5 font-semibold
                 hover:bg-indigo-700 transition">
                    {{ isSignIn ? "Sign In" : "Create Account" }}
                </button>

                <div class="text-sm text-gray-600 text-center">
                    <span v-if="isSignIn">
                        Don’t have an account?
                        <button type="button" class="text-indigo-700 font-semibold hover:underline"
                            @click="uiStore.openAuth('signup')">
                            Sign Up
                        </button>
                    </span>

                    <span v-else>
                        Already have an account?
                        <button type="button" class="text-indigo-700 font-semibold hover:underline"
                            @click="uiStore.openAuth('signin')">
                            Sign In
                        </button>
                    </span>
                </div>
            </form>
        </div>
    </div>
</template>
