<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useSearchStore } from "../stores/searchStore"
import { useFilterStore } from "../stores/filterStore"
import { useCartStore } from "../stores/cartStore"
import { useFavoritesStore } from "../stores/favoritesStore"
import DarkModeToggle from "./DarkModeToggle.vue"
import ProfileMenu from "./ProfileMenu.vue"

const router = useRouter()
const isMenuOpen = ref(false)
const searchStore = useSearchStore()
const filterStore = useFilterStore()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function onSearch() {
  closeMenu()
}

function goHome() {
  filterStore.closeCategories()
  router.push("/")
  closeMenu()
}
</script>

<template>
  <header class="sticky top-0 z-50">
    <!-- FIRST ROW: Brand + Search + Icons + DARK MODE -->
    <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div class="max-w-7xl mx-auto px-4">
        <div class="h-16 flex items-center gap-3">
          <!-- Mobile Menu Button -->
          <button
            class="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            @click="toggleMenu"
            aria-label="Toggle menu"
          >
            <svg
              v-if="!isMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- AlloraCart Brand with Logo -->
          <button @click="goHome" class="flex items-center gap-2 group">
            <!-- Shopping cart icon -->
            <div class="relative">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                class="w-8 h-8 text-indigo-600 dark:text-indigo-400 transition-transform group-hover:scale-110"
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
              <span class="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
            </div>
            
            <!-- Text -->
            <div class="flex flex-col leading-tight">
              <span class="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                Allora<span class="text-indigo-600 dark:text-indigo-400">Cart</span>
              </span>
              <span class="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wider">
                SHOP SMARTER
              </span>
            </div>
          </button>

          <!-- Search (Desktop/Tablet) -->
          <form class="flex-1 flex items-center" @submit.prevent="onSearch">
            <div class="w-full max-w-2xl mx-auto hidden sm:block">
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M21 21l-4.3-4.3m1.55-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                    />
                  </svg>
                </span>

                <input
                  v-model="searchStore.query"
                  type="text"
                  placeholder="Search products..."
                  class="w-full pl-10 pr-24 py-2 rounded-full 
                         border border-gray-200 dark:border-gray-600 
                         bg-white dark:bg-gray-700 
                         text-gray-900 dark:text-white
                         placeholder:text-gray-400 dark:placeholder:text-gray-500
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                         transition-colors"
                />

                <button
                  type="submit"
                  class="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full
                         bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-semibold 
                         hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
                >
                  Search
                </button>
              </div>
            </div>

            <!-- Mobile: Search icon -->
            <button
              type="button"
              class="sm:hidden ml-auto p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 
                     transition text-gray-700 dark:text-gray-300"
              aria-label="Search"
              @click="toggleMenu"
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
                  d="M21 21l-4.3-4.3m1.55-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
              </svg>
            </button>
          </form>

          <!-- Icons (top right corner) -->
          <div class="flex items-center gap-1 sm:gap-2">
            <!-- Favourite -->
            <router-link
              to="/favorites"
              class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 
                     transition text-gray-700 dark:text-gray-300 relative inline-flex"
              aria-label="Favorites"
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.687-4.5-1.935 0-3.597 1.126-4.313 2.733C11.284 4.876 9.622 3.75 7.687 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>

              <span
                v-if="favoritesStore.count > 0"
                class="absolute -top-1 -right-1 text-[10px] px-1.5 py-1 rounded-full 
                       bg-rose-600 dark:bg-rose-500 text-white"
              >
                {{ favoritesStore.count }}
              </span>
            </router-link>

            <!-- Cart -->
            <router-link
              to="/cart"
              class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 
                     transition text-gray-700 dark:text-gray-300 relative inline-flex"
              aria-label="Cart"
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 15.75h10.5l1.5-8.25H4.106z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9 20.25a.75.75 0 100-1.5.75.75 0 000 1.5zm6 0a.75.75 0 100-1.5.75.75 0 000 1.5z"
                />
              </svg>

              <span
                v-if="cartStore.totalItems > 0"
                class="absolute -top-1 -right-1 text-[10px] leading-none px-1.5 py-1 rounded-full
                       bg-indigo-600 dark:bg-indigo-500 text-white"
              >
                {{ cartStore.totalItems }}
              </span>
            </router-link>

            <!-- PROFILE MENU - THIS IS THE FIX! -->
            <ProfileMenu />

            <!-- DARK MODE TOGGLE -->
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </div>

    <!-- SECOND ROW: Beautiful Gradient Nav Bar -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 text-white transition-colors shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Desktop Nav (centered) -->
        <div
          class="h-12 hidden lg:flex items-center justify-center gap-10 text-sm font-semibold tracking-wide"
        >
          <router-link
            to="/"
            class="hover:text-indigo-100 dark:hover:text-indigo-200 hover:scale-105 transition-all"
            @click="filterStore.closeCategories()"
          >
            Home
          </router-link>

          <router-link
            to="/categories"
            class="hover:text-indigo-100 dark:hover:text-indigo-200 hover:scale-105 transition-all"
            @click="filterStore.openCategories()"
          >
            Categories
          </router-link>

          <router-link
            to="/offers"
            class="hover:text-indigo-100 dark:hover:text-indigo-200 hover:scale-105 transition-all"
            @click="filterStore.closeCategories()"
          >
            Offers
          </router-link>

          <router-link
            to="/about"
            class="hover:text-indigo-100 dark:hover:text-indigo-200 hover:scale-105 transition-all"
            @click="filterStore.closeCategories()"
          >
            About
          </router-link>

          <router-link
            to="/contact"
            class="hover:text-indigo-100 dark:hover:text-indigo-200 hover:scale-105 transition-all"
            @click="filterStore.closeCategories()"
          >
            Contact
          </router-link>
        </div>

        <!-- Mobile/Tablet Menu (dropdown) -->
        <div v-show="isMenuOpen" class="lg:hidden py-3">
          <!-- Mobile Search bar -->
          <form class="sm:hidden mb-3" @submit.prevent="onSearch">
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M21 21l-4.3-4.3m1.55-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                  />
                </svg>
              </span>

              <input
                v-model="searchStore.query"
                type="text"
                placeholder="Search products..."
                class="w-full pl-10 pr-3 py-2 rounded-lg text-white
                       border border-white/20 bg-white/10 placeholder:text-white/70
                       focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </form>

          <nav class="flex flex-col gap-2">
            <router-link
              to="/"
              class="px-3 py-2 rounded-md hover:bg-white/20 transition"
              @click="filterStore.closeCategories(); closeMenu()"
            >
              Home
            </router-link>

            <router-link
              to="/categories"
              class="px-3 py-2 rounded-md hover:bg-white/20 transition"
              @click="filterStore.openCategories(); closeMenu()"
            >
              Categories
            </router-link>

            <router-link
              to="/offers"
              class="px-3 py-2 rounded-md hover:bg-white/20 transition"
              @click="filterStore.closeCategories(); closeMenu()"
            >
              Offers
            </router-link>

            <router-link
              to="/about"
              class="px-3 py-2 rounded-md hover:bg-white/20 transition"
              @click="filterStore.closeCategories(); closeMenu()"
            >
              About
            </router-link>

            <router-link
              to="/contact"
              class="px-3 py-2 rounded-md hover:bg-white/20 transition"
              @click="filterStore.closeCategories(); closeMenu()"
            >
              Contact
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>