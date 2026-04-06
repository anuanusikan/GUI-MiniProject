<!-- src/components/Navbar.vue -->
<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useSearchStore } from "../stores/searchStore"
import { useFilterStore } from "../stores/filterStore"
import { useCartStore } from "../stores/cartStore"
import { useFavoritesStore } from "../stores/favoritesStore"
import { useAuthStore } from "../stores/authStore"
import DarkModeToggle from "./DarkModeToggle.vue"
import ProfileMenu from "./ProfileMenu.vue"

const router = useRouter()
const isMenuOpen = ref(false)
const searchStore = useSearchStore()
const filterStore = useFilterStore()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()
const auth = useAuthStore()

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
  <header class="sticky top-0 z-40">
    <!-- FIRST ROW -->
    <div class="border-b shadow-[0_8px_30px_rgba(0,0,0,0.18)] relative 
             border-black/10 dark:border-[#d4af37]/20

             bg-gradient-to-r
             from-[#e7f3ff] via-[#dff7f0] to-[#eef2f7]

             dark:from-[#050506] dark:via-[#120f0b] dark:to-[#0b1722]">
      <!-- sheen (light) -->
      <div class="pointer-events-none absolute inset-0 opacity-80 dark:opacity-0" style="
          background:
            radial-gradient(1200px 240px at 20% 0%, rgba(0, 170, 255, 0.18), transparent 60%),
            radial-gradient(900px 200px at 80% 0%, rgba(0, 200, 140, 0.16), transparent 55%),
            linear-gradient(180deg, rgba(255,255,255,0.35), transparent 45%);
        "></div>

      <!-- sheen (dark) - more gold/silver premium -->
      <div class="pointer-events-none absolute inset-0 opacity-0 dark:opacity-75" style="
          background:
            radial-gradient(1200px 240px at 18% 0%, rgba(212,175,55,0.22), transparent 60%),
            radial-gradient(900px 220px at 82% 0%, rgba(220,220,220,0.12), transparent 55%),
            linear-gradient(180deg, rgba(255,255,255,0.06), transparent 45%);
        "></div>

      <div class="max-w-7xl mx-auto px-4 relative">
        <div class="h-16 flex items-center gap-3">
          <!-- Mobile Menu Button -->
          <button type="button" class="lg:hidden p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition"
            @click="toggleMenu" aria-label="Toggle menu">
            <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-slate-900 dark:text-[#e6e6e6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-slate-900 dark:text-[#e6e6e6]"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Brand -->
          <button type="button" @click="goHome" class="flex items-center gap-2 group">
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 transition-transform group-hover:scale-110
                       text-[#0b3a5a] dark:text-[#d4af37]
                       drop-shadow-[0_6px_18px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_6px_18px_rgba(212,175,55,0.22)]">
                <path
                  d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>

              <span class="absolute -top-1 -right-1 h-3 w-3 rounded-full
                       bg-gradient-to-r from-[#2aa9ff] to-[#52e6c4]
                       dark:from-[#d4af37] dark:to-[#f3e7b6]
                       shadow-[0_0_0_2px_rgba(255,255,255,0.8)]
                       dark:shadow-[0_0_0_2px_rgba(0,0,0,0.65)]"></span>
            </div>

            <div class="flex flex-col leading-tight">
              <span class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-[#f3f3f3]">
                Allora<span class="text-[#0ea5a4] dark:text-[#d4af37]">Cart</span>
              </span>
              <span class="text-[10px] text-slate-700/70 dark:text-[#cfcfcf]/80 font-medium tracking-wider">
                SHOP SMARTER
              </span>
            </div>
          </button>

          <!-- Search -->
          <form class="flex-1 flex items-center relative z-10" @submit.prevent="onSearch">
            <div class="w-full max-w-2xl mx-auto hidden sm:block">
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-white/60">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M21 21l-4.3-4.3m1.55-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                  </svg>
                </span>

                <input v-model="searchStore.query" type="text" placeholder="Search products..." class="w-full pl-10 pr-24 py-2 rounded-full
                         border border-black/10 dark:border-white/10
                         bg-white/70 dark:bg-white/5
                         text-slate-900 dark:text-white
                         placeholder:text-slate-500 dark:placeholder:text-white/45
                         focus:outline-none focus:ring-2 focus:ring-emerald-400/30 dark:focus:ring-[#d4af37]/40
                         focus:border-emerald-400/40 dark:focus:border-[#d4af37]/30
                         transition-colors" />

                <button type="submit" class="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full
                         text-sm font-semibold text-white
                         bg-gradient-to-r from-[#1677ff] via-[#16c7a3] to-[#c7d2fe]
                         dark:text-black
                         dark:bg-gradient-to-r dark:from-[#d4af37] dark:via-[#f0e1a6] dark:to-[#c0c0c0]
                         hover:brightness-110 transition
                         shadow-[0_10px_20px_rgba(0,0,0,0.20)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.35)]">
                  Search
                </button>
              </div>
            </div>

            <button type="button" class="sm:hidden ml-auto p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition
                     text-slate-900 dark:text-[#e6e6e6]" aria-label="Search" @click="toggleMenu">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M21 21l-4.3-4.3m1.55-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
              </svg>
            </button>
          </form>

          <!-- Icons -->
          <div class="flex items-center gap-1 sm:gap-2 relative z-40">
            <!-- Favourite -->
            <router-link to="/favorites" class="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition relative inline-flex
                     text-slate-900 dark:text-[#e6e6e6]" aria-label="Favorites">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M21 8.25c0-2.485-2.099-4.5-4.687-4.5-1.935 0-3.597 1.126-4.313 2.733C11.284 4.876 9.622 3.75 7.687 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>

              <span v-if="favoritesStore.count > 0" class="absolute -top-1 -right-1 text-[10px] px-1.5 py-1 rounded-full
                       bg-gradient-to-r from-[#1677ff] to-[#16c7a3] text-white
                       dark:from-[#d4af37] dark:to-[#f0e1a6] dark:text-black
                       shadow-[0_0_0_2px_rgba(255,255,255,0.85)]
                       dark:shadow-[0_0_0_2px_rgba(0,0,0,0.7)]">
                {{ favoritesStore.count }}
              </span>
            </router-link>

            <!-- Cart -->
            <router-link to="/cart" class="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition relative inline-flex
                     text-slate-900 dark:text-[#e6e6e6]" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 15.75h10.5l1.5-8.25H4.106z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M9 20.25a.75.75 0 100-1.5.75.75 0 000 1.5zm6 0a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              </svg>

              <span v-if="cartStore.totalItems > 0 && auth.isAuthenticated" class="absolute -top-1 -right-1 text-[10px] leading-none px-1.5 py-1 rounded-full
                       bg-gradient-to-r from-[#c7d2fe] to-[#16c7a3] text-slate-900
                       dark:from-[#c0c0c0] dark:to-[#d4af37] dark:text-black
                       shadow-[0_0_0_2px_rgba(255,255,255,0.85)]
                       dark:shadow-[0_0_0_2px_rgba(0,0,0,0.7)]">
                {{ cartStore.totalItems }}
              </span>
            </router-link>

            <div class="flex items-center gap-1 sm:gap-2 relative z-30">
              <ProfileMenu />
              <DarkModeToggle />
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- SECOND ROW -->
    <div class="transition-colors shadow-lg relative overflow-hidden
             border-b border-black/10 dark:border-[#d4af37]/15
             bg-gradient-to-r
             from-[#d8f0ff] via-[#dbfff1] to-[#f3f6fb]
             dark:from-[#070707] dark:via-[#111111] dark:to-[#0b1722]
             text-slate-900 dark:text-white">
      <div class="pointer-events-none absolute inset-0 opacity-70 dark:hidden" style="
          background:
            linear-gradient(90deg, rgba(0,120,255,0.12), transparent 30%, rgba(0,200,160,0.10) 55%, transparent 78%, rgba(192,192,192,0.18)),
            radial-gradient(900px 180px at 50% 0%, rgba(255,255,255,0.55), transparent 60%);
        "></div>

      <div class="pointer-events-none absolute inset-0 opacity-60 hidden dark:block" style="
          background:
            linear-gradient(90deg, rgba(212,175,55,0.14), transparent 28%, rgba(192,192,192,0.10) 55%, transparent 78%, rgba(212,175,55,0.14)),
            radial-gradient(900px 180px at 50% 0%, rgba(255,255,255,0.07), transparent 60%);
        "></div>

      <div class="max-w-7xl mx-auto px-4 relative">
        <div class="h-12 hidden lg:flex items-center justify-center gap-10 text-sm font-semibold tracking-wide">
          <router-link to="/" class="transition-all hover:scale-105 hover:text-emerald-700 dark:hover:text-[#f3e7b6]"
            @click="filterStore.closeCategories()">
            Home
          </router-link>

          <router-link to="/categories"
            class="transition-all hover:scale-105 hover:text-emerald-700 dark:hover:text-[#f3e7b6]"
            @click="filterStore.openCategories()">
            Categories
          </router-link>

          <router-link to="/offers"
            class="transition-all hover:scale-105 hover:text-emerald-700 dark:hover:text-[#f3e7b6]"
            @click="filterStore.closeCategories()">
            Offers
          </router-link>

          <router-link to="/about"
            class="transition-all hover:scale-105 hover:text-emerald-700 dark:hover:text-[#f3e7b6]"
            @click="filterStore.closeCategories()">
            About
          </router-link>
        </div>

        <div v-show="isMenuOpen" class="lg:hidden py-3">
          <form class="sm:hidden mb-3" @submit.prevent="onSearch">
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-white/60">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M21 21l-4.3-4.3m1.55-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                </svg>
              </span>

              <input v-model="searchStore.query" type="text" placeholder="Search products..." class="w-full pl-10 pr-3 py-2 rounded-lg
                       text-slate-900 dark:text-white
                       border border-black/10 dark:border-white/10
                       bg-white/75 dark:bg-white/5
                       placeholder:text-slate-500 dark:placeholder:text-white/45
                       focus:outline-none focus:ring-2 focus:ring-emerald-400/30 dark:focus:ring-[#d4af37]/40" />
            </div>
          </form>

          <nav class="flex flex-col gap-2">
            <router-link to="/" class="px-3 py-2 rounded-md transition hover:bg-black/5 dark:hover:bg-white/10"
              @click="filterStore.closeCategories(); closeMenu()">
              Home
            </router-link>

            <router-link to="/categories"
              class="px-3 py-2 rounded-md transition hover:bg-black/5 dark:hover:bg-white/10"
              @click="filterStore.openCategories(); closeMenu()">
              Categories
            </router-link>

            <router-link to="/offers" class="px-3 py-2 rounded-md transition hover:bg-black/5 dark:hover:bg-white/10"
              @click="filterStore.closeCategories(); closeMenu()">
              Offers
            </router-link>

            <router-link to="/about" class="px-3 py-2 rounded-md transition hover:bg-black/5 dark:hover:bg-white/10"
              @click="filterStore.closeCategories(); closeMenu()">
              About
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>
