import { defineStore } from "pinia"
import { ref } from "vue"

export const useFilterStore = defineStore("filter", () => {
  const showCategories = ref(false)
  const selectedCategory = ref<string | null>(null)

  function openCategories() {
    showCategories.value = true
  }

  function closeCategories() {
    showCategories.value = false
  }

  function setCategory(category: string | null) {
    selectedCategory.value = category
  }

  return { showCategories, selectedCategory, openCategories, closeCategories, setCategory }
})
