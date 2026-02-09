<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getCategories } from "../services/productService"
import { useFilterStore } from "../stores/filterStore"

type CategoryItem = string | { slug: string; name: string; url?: string }

const categories = ref<CategoryItem[]>([])
const loading = ref(true)
const filterStore = useFilterStore()

function getCategoryLabel(c: CategoryItem): string {
  return typeof c === "string" ? c : c.name
}

function selectCategory(c: CategoryItem) {
  const slug = typeof c === "string" ? c : c.slug
  filterStore.setCategory(slug)

  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
}


function clearCategory() {
  filterStore.setCategory(null)

  // keep CategoriesBar OPEN
  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
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
  <section id="categories" class="mb-6 scroll-mt-40">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-xl font-bold text-gray-900">Categories</h3>

      <div class="flex items-center gap-3">
        <button
          class="text-sm font-semibold text-gray-700 hover:underline"
          @click="filterStore.closeCategories()"
        >
          Close
        </button>

        <button
          class="text-sm font-semibold text-indigo-700 hover:underline"
          @click="clearCategory"
        >
          Clear
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-gray-600">Loading categories...</div>

    <div v-else class="flex gap-2 overflow-x-auto pb-2">
      <button
        class="whitespace-nowrap px-4 py-2 rounded-full border border-gray-200 bg-white
               hover:bg-gray-50 transition text-sm font-medium text-gray-700"
        @click="clearCategory"
      >
        All
      </button>

      <button
        v-for="c in categories"
        :key="typeof c === 'string' ? c : c.slug"
        class="whitespace-nowrap px-4 py-2 rounded-full border border-gray-200 bg-white
               hover:bg-gray-50 transition text-sm font-medium text-gray-700"
        @click="selectCategory(c)"
      >
        {{ getCategoryLabel(c) }}
      </button>
    </div>

    <!-- Optional: show which category is selected -->
    <p v-if="filterStore.selectedCategory" class="mt-3 text-sm text-gray-600">
      Selected:
      <span class="font-semibold text-gray-800">{{ filterStore.selectedCategory }}</span>
    </p>
  </section>
</template>


