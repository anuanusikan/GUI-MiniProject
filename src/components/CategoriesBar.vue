<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { getCategories } from "../services/productService"
import { useFilterStore } from "../stores/filterStore"

type CategoryItem = string | { slug: string; name: string; url?: string }

const categories = ref<CategoryItem[]>([])
const loading = ref(true)
const filterStore = useFilterStore()

const selectedSlug = computed(() => (filterStore.selectedCategory ?? "").toLowerCase())

function getCategoryLabel(c: CategoryItem): string {
  return typeof c === "string" ? prettify(c) : c.name
}

function getCategorySlug(c: CategoryItem): string {
  return typeof c === "string" ? c : c.slug
}

function prettify(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase())
}

function selectCategory(c: CategoryItem) {
  const slug = getCategorySlug(c)
  filterStore.setCategory(slug) // ✅ keep bar visible
}

function clearCategory() {
  filterStore.setCategory(null) // ✅ show all products
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
  <section id="categories" class="mb-4">
    <div class="flex items-center justify-end mb-3">
      <button v-if="filterStore.selectedCategory" class="text-sm font-semibold text-indigo-700 hover:underline"
        @click="clearCategory">
        Clear
      </button>
    </div>


    <div v-if="loading" class="text-gray-600">Loading categories...</div>

    <div v-else class="flex gap-2 overflow-x-auto pb-2">
      <!-- All -->
      <button @click="clearCategory"
        class="whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition" :class="!selectedSlug
            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          ">
        All
      </button>

      <!-- Category buttons -->
      <button v-for="c in categories" :key="getCategorySlug(c)" @click="selectCategory(c)"
        class="whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition" :class="selectedSlug === getCategorySlug(c).toLowerCase()
            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
          ">
        {{ getCategoryLabel(c) }}
      </button>
    </div>

    <!-- Selected label -->
    <p v-if="filterStore.selectedCategory" class="mt-3 text-sm text-gray-600">
      Selected:
      <span class="font-semibold text-gray-900">
        {{ prettify(filterStore.selectedCategory) }}
      </span>
    </p>
  </section>
</template>
