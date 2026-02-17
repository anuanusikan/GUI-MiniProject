<!-- src/components/Navbar.vue -->
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
    <!-- Theme: Gold + Black + Silver gradient (no layout changes) -->
    <div
      class="border-b border-[#d4af37]/20 shadow-[0_8px_30px_rgba(0,0,0,0.25)]
             bg-gradient-to-r from-[#133739] via-[#413434] to-[#21384b]
             relative"
    >
      <!-- subtle metallic sheen -->
      <div
        class="pointer-events-none absolute inset-0 opacity-70"
        style="
          background:
            radial-gradient(1200px 200px at 20% 0%, rgba(212,175,55,0.18), transparent 60%),
            radial-gradient(900px 180px at 80% 0%, rgba(220,220,220,0.14), transparent 55%),
            linear-gradient(180deg, rgba(255,255,255,0.06), transparent 40%);
        "
      />
      <div class="max-w-7xl mx-auto px-4 relative">
        <div class="h-16 flex items-center gap-3">
          <!-- Mobile Menu Button -->
          <button
            class="lg:hidden p-2 rounded-md hover:bg-white/10 transition"
            @click="toggleMenu"
            aria-label="Toggle menu"
          >
            <svg
              v-if="!isMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-[#e6e6e6]"
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
              class="w-6 h-6 text-[#e6e6e6]"
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
                class="w-8 h-8 transition-transform group-hover:scale-110
                       text-[#d4af37] drop-shadow-[0_6px_18px_rgba(212,175,55,0.22)]"
              >
                <path
                  d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                />
              </svg>

              <!-- accent dot -->
              <span
                class="absolute -top-1 -right-1 h-3 w-3 rounded-full
                       bg-gradient-to-r from-[#d4af37] to-[#f3e7b6]
                       shadow-[0_0_0_2px_rgba(0,0,0,0.65)]"
              ></span>
            </div>

            <!-- Text -->
            <div class="flex flex-col leading-tight">
              <span class="text-xl sm:text-2xl font-extrabold text-[#f3f3f3]">
                Allora<span class="text-[#d4af37]">Cart</span>
              </span>
              <span class="text-[10px] text-[#cfcfcf]/80 font-medium tracking-wider">
                SHOP SMARTER
              </span>
            </div>
          </button>

          <!-- Search (Desktop/Tablet) -->
          <form class="flex-1 flex items-center" @submit.prevent="onSearch">
            <div class="w-full max-w-2xl mx-auto hidden sm:block">
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
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
                         border border-white/10
                         bg-white/5 text-white
                         placeholder:text-white/45
                         focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40
                         focus:border-[#d4af37]/30
                         transition-colors"
                />

                <button
                  type="submit"
                  class="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full
                         text-sm font-semibold text-black
                         bg-gradient-to-r from-[#d4af37] via-[#f0e1a6] to-[#c0c0c0]
                         hover:brightness-110 transition
                         shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
                >
                  Search
                </button>
              </div>
            </div>

            <!-- Mobile: Search icon -->
            <button
              type="button"
              class="sm:hidden ml-auto p-2 rounded-md hover:bg-white/10 transition text-[#e6e6e6]"
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
              class="p-2 rounded-md hover:bg-white/10 transition text-[#e6e6e6] relative inline-flex"
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
                       bg-gradient-to-r from-[#d4af37] to-[#f0e1a6] text-black
                       shadow-[0_0_0_2px_rgba(0,0,0,0.7)]"
              >
                {{ favoritesStore.count }}
              </span>
            </router-link>

            <!-- Cart -->
            <router-link
              to="/cart"
              class="p-2 rounded-md hover:bg-white/10 transition text-[#e6e6e6] relative inline-flex"
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
                       bg-gradient-to-r from-[#c0c0c0] to-[#d4af37] text-black
                       shadow-[0_0_0_2px_rgba(0,0,0,0.7)]"
              >
                {{ cartStore.totalItems }}
              </span>
            </router-link>

            <!-- PROFILE MENU -->
            <!--  Make sure ProfileMenu button is visible on dark/normal: we already changed navbar bg -->
            <ProfileMenu />

            <!-- DARK MODE TOGGLE -->
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </div>

    <!-- SECOND ROW: Gradient Nav Bar -->
    <!-- ✅ Same theme, keep your same links + behavior -->
    <div
      class="text-white transition-colors shadow-lg
             bg-gradient-to-r from-[#516050] via-[#1b1b1b] to-[#414551]
             border-b border-[#d4af37]/15 relative"
    >
      <div
        class="pointer-events-none absolute inset-0"
        style="
          background:
            linear-gradient(90deg, rgba(212,175,55,0.12), transparent 25%, rgba(192,192,192,0.10) 50%, transparent 75%, rgba(212,175,55,0.12)),
            radial-gradient(900px 180px at 50% 0%, rgba(255,255,255,0.06), transparent 60%);
        "
      />
      <div class="max-w-7xl mx-auto px-4 relative">
        <!-- Desktop Nav (centered) -->
        <div class="h-12 hidden lg:flex items-center justify-center gap-10 text-sm font-semibold tracking-wide">
          <router-link
            to="/"
            class="hover:text-[#f3e7b6] hover:scale-105 transition-all"
            @click="filterStore.closeCategories()"
          >
            Home
          </router-link>

          <router-link
            to="/categories"
            class="hover:text-[#f3e7b6] hover:scale-105 transition-all"
            @click="filterStore.openCategories()"
          >
            Categories
          </router-link>

          <router-link
            to="/offers"
            class="hover:text-[#f3e7b6] hover:scale-105 transition-all"
            @click="filterStore.closeCategories()"
          >
            Offers
          </router-link>

          <router-link
            to="/about"
            class="hover:text-[#f3e7b6] hover:scale-105 transition-all"
            @click="filterStore.closeCategories()"
          >
            About
          </router-link>

    
        </div>

        <!-- Mobile/Tablet Menu (dropdown) -->
        <div v-show="isMenuOpen" class="lg:hidden py-3">
          <!-- Mobile Search bar -->
          <form class="sm:hidden mb-3" @submit.prevent="onSearch">
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
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
                       border border-white/10 bg-white/5 placeholder:text-white/45
                       focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
              />
            </div>
          </form>

          <nav class="flex flex-col gap-2">
            <router-link
              to="/"
              class="px-3 py-2 rounded-md hover:bg-white/10 transition"
              @click="filterStore.closeCategories(); closeMenu()"
            >
              Home
            </router-link>

            <router-link
              to="/categories"
              class="px-3 py-2 rounded-md hover:bg-white/10 transition"
              @click="filterStore.openCategories(); closeMenu()"
            >
              Categories
            </router-link>

            <router-link
              to="/offers"
              class="px-3 py-2 rounded-md hover:bg-white/10 transition"
              @click="filterStore.closeCategories(); closeMenu()"
            >
              Offers
            </router-link>

            <router-link
              to="/about"
              class="px-3 py-2 rounded-md hover:bg-white/10 transition"
              @click="filterStore.closeCategories(); closeMenu()"
            >
              About
            </router-link>

           
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>