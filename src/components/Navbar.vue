<script setup lang="ts">
import { ref } from "vue"
import { useSearchStore } from "../stores/searchStore"
import { useFilterStore } from "../stores/filterStore"
import ProfileMenu from "./ProfileMenu.vue"
import AuthModal from "./AuthModal.vue"



const isMenuOpen = ref(false)
const searchStore = useSearchStore()
const filterStore = useFilterStore()

const isProfileOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function onSearch() {
  closeMenu()
}



function toggleProfile() {
  isProfileOpen.value = !isProfileOpen.value
}
function closeProfile() {
  isProfileOpen.value = false
}

</script>

<template>
  <header class="sticky top-0 z-50">
    <!-- Top Row: Brand + Search + Icons -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4">
        <div class="h-16 flex items-center gap-3">
          <!-- Mobile Menu Button -->
          <button class="lg:hidden p-2 rounded-md hover:bg-gray-100 transition" @click="toggleMenu"
            aria-label="Toggle menu">
            <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Brand -->
          <a href="#top" class="text-xl sm:text-2xl font-bold text-indigo-700 tracking-tight whitespace-nowrap"
            @click="filterStore.closeCategories()">
            Shop In Haven
          </a>

          <!-- Search (Desktop/Tablet) -->
          <form class="flex-1 flex items-center" @submit.prevent="onSearch">
            <div class="w-full max-w-2xl mx-auto hidden sm:block">
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M21 21l-4.3-4.3m1.55-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                  </svg>
                </span>

                <input v-model="searchStore.query" type="text" placeholder="Search products..." class="w-full pl-10 pr-24 py-2 rounded-full border border-gray-200 bg-white
                         focus:outline-none focus:ring-2 focus:ring-indigo-200" />

                <button type="submit" class="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full
                         bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition">
                  Search
                </button>
              </div>
            </div>

            <!-- Mobile: Search icon -->
            <button type="button" class="sm:hidden ml-auto p-2 rounded-md hover:bg-gray-100 transition text-gray-700"
              aria-label="Search" @click="toggleMenu">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M21 21l-4.3-4.3m1.55-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
              </svg>
            </button>
          </form>

          <!-- Icons (top right corner) -->
          <div class="flex items-center gap-1 sm:gap-2">
            <button class="p-2 rounded-md hover:bg-gray-100 transition text-gray-700" aria-label="Favourite">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M21 8.25c0-2.485-2.099-4.5-4.687-4.5-1.935 0-3.597 1.126-4.313 2.733C11.284 4.876 9.622 3.75 7.687 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>

            <button class="p-2 rounded-md hover:bg-gray-100 transition text-gray-700 relative" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 15.75h10.5l1.5-8.25H4.106z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M9 20.25a.75.75 0 100-1.5.75.75 0 000 1.5zm6 0a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              </svg>
              <span
                class="absolute -top-1 -right-1 text-[10px] leading-none px-1.5 py-1 rounded-full bg-indigo-600 text-white">
                2
              </span>
            </button>

            <div class="relative">
              <button class="p-2 rounded-md hover:bg-gray-100 transition text-gray-700" aria-label="Profile"
                @click="toggleProfile">
                <!-- profile icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
                </svg>
              </button>

              <!-- click outside to close -->
              <button v-if="isProfileOpen" class="fixed inset-0 z-40" @click="closeProfile"
                aria-label="Close profile menu">
              </button>

              <div v-if="isProfileOpen" class="absolute right-0 mt-2 z-50">
                <ProfileMenu />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Second Row: Maroon Nav Bar -->
    <div class="bg-[#7a1f1f] text-white">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Desktop Nav (centered) -->
        <div class="h-12 hidden lg:flex items-center justify-center gap-10 text-sm font-semibold tracking-wide">
          <router-link to="/" class="..." @click="filterStore.setCategory(null)">
            Home
          </router-link>


          <router-link to="/categories" class="hover:text-gray-200 hover:underline underline-offset-4 transition"
            @click="filterStore.openCategories()">
            Categories
          </router-link>

          <router-link to="/offers" class="hover:text-gray-200 hover:underline underline-offset-4 transition"
            @click="filterStore.closeCategories()">
            Offers
          </router-link>

          <router-link to="/about" class="hover:text-gray-200 hover:underline underline-offset-4 transition"
            @click="filterStore.closeCategories()">
            About
          </router-link>

          <router-link to="/contact" class="hover:text-gray-200 hover:underline underline-offset-4 transition"
            @click="filterStore.closeCategories()">
            Contact
          </router-link>
        </div>

        <!-- Mobile/Tablet Menu (dropdown) -->
        <div v-show="isMenuOpen" class="lg:hidden py-3">
          <!-- Mobile Search bar -->
          <form class="sm:hidden mb-3" @submit.prevent="onSearch">
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M21 21l-4.3-4.3m1.55-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                </svg>
              </span>

              <input v-model="searchStore.query" type="text" placeholder="Search products..." class="w-full pl-10 pr-3 py-2 rounded-lg text-white
                       border border-white/20 bg-white/10 placeholder:text-white/70
                       focus:outline-none focus:ring-2 focus:ring-white/30" />
            </div>
          </form>

          <nav class="flex flex-col gap-2">
            <router-link to="/" class="..." @click="filterStore.setCategory(null); closeMenu()">
              Home
            </router-link>


            <router-link to="/categories" class="px-3 py-2 rounded-md hover:bg-white/10 transition"
              @click="filterStore.openCategories(); closeMenu()">
              Categories
            </router-link>

            <router-link to="/offers" class="px-3 py-2 rounded-md hover:bg-white/10 transition"
              @click="filterStore.closeCategories(); closeMenu()">
              Offers
            </router-link>

            <router-link to="/about" class="px-3 py-2 rounded-md hover:bg-white/10 transition"
              @click="filterStore.closeCategories(); closeMenu()">
              About
            </router-link>

            <router-link to="/contact" class="px-3 py-2 rounded-md hover:bg-white/10 transition"
              @click="filterStore.closeCategories(); closeMenu()">
              Contact
            </router-link>
          </nav>

        </div>
      </div>
    </div>
    <AuthModal />
  </header>
</template>
