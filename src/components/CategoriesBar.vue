<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { getCategories } from "../services/productService"
import { useFilterStore } from "../stores/filterStore"

type CategoryItem = string | { slug: string; name: string }

const categories = ref<CategoryItem[]>([])
const loading = ref(true)
const filterStore = useFilterStore()

const selectedSlug = computed(() =>
  (filterStore.selectedCategory ?? "").toLowerCase()
)

function getCategoryLabel(c: CategoryItem): string {
  return typeof c === "string" ? prettify(c) : c.name
}

function getCategorySlug(c: CategoryItem): string {
  return typeof c === "string" ? c : c.slug
}

function prettify(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, ch => ch.toUpperCase())
}

function selectCategory(c: CategoryItem) {
  const slug = getCategorySlug(c)
  filterStore.setCategory(slug)
}

function clearCategory() {
  filterStore.setCategory(null)
}

onMounted(async () => {
  try {
    categories.value = await getCategories()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="mb-6">
    <!-- clear button -->
    <div class="flex justify-end mb-2">
      <button
        v-if="filterStore.selectedCategory"
        @click="clearCategory"
        class="text-xs font-semibold text-yellow-600 dark:text-yellow-300 hover:underline"
      >
        Clear Filter
      </button>
    </div>

    <!-- loading -->
    <div v-if="loading" class="flex gap-3 overflow-x-auto">
      <div
        v-for="i in 6"
        :key="i"
        class="h-9 w-24 rounded-full animate-pulse
               bg-gray-200 dark:bg-gray-700"
      ></div>
    </div>

    <!-- categories -->
    <div
      v-else
      class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
    >
      <!-- ALL -->
      <button
        @click="clearCategory"
        class="category-btn"
        :class="!selectedSlug ? 'active-cat' : ''"
      >
        All
      </button>

      <!-- category buttons -->
      <button
        v-for="c in categories"
        :key="getCategorySlug(c)"
        @click="selectCategory(c)"
        class="category-btn"
        :class="selectedSlug === getCategorySlug(c).toLowerCase() ? 'active-cat' : ''"
      >
        {{ getCategoryLabel(c) }}
      </button>
    </div>

    <!-- selected label -->
    <p
      v-if="filterStore.selectedCategory"
      class="mt-3 text-sm text-gray-600 dark:text-gray-400"
    >
      Showing:
      <span class="font-semibold text-gray-900 dark:text-white">
        {{ prettify(filterStore.selectedCategory) }}
      </span>
    </p>
  </section>
</template>

<style scoped>
/* Base category button */
.category-btn {
  white-space: nowrap;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.25s ease;
  border: 1px solid rgba(0,0,0,0.08);
  background: rgba(255,255,255,0.7);
  color: #1f2937;
  backdrop-filter: blur(6px);
}

/* hover */
.category-btn:hover {
  transform: translateY(-1px);
  background: rgba(255,255,255,0.95);
}

/* dark mode */
.dark .category-btn {
  background: rgba(0,0,0,0.35);
  border: 1px solid rgba(255,215,0,0.12);
  color: #e5e7eb;
}

.dark .category-btn:hover {
  background: rgba(0,0,0,0.55);
}

/* ACTIVE CATEGORY */
.active-cat {
  background: linear-gradient(135deg, #facc15, #f59e0b);
  color: black;
  border-color: transparent;
  box-shadow: 0 6px 14px rgba(0,0,0,0.12);
}

.dark .active-cat {
  background: linear-gradient(135deg, #facc15, #fbbf24);
  color: black;
}

/* hide scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>