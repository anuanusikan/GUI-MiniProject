import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const useDarkModeStore = defineStore("darkMode", () => {
  const isDark = ref(false)

  // Load from localStorage
  const saved = localStorage.getItem("darkMode")
  if (saved) {
    isDark.value = saved === "true"
  }

  // Apply dark class
  function apply() {
    if (isDark.value) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Toggle function
  function toggle() {
    isDark.value = !isDark.value
  }

  // Watch and save
  watch(isDark, (value) => {
    localStorage.setItem("darkMode", String(value))
    apply()
  }, { immediate: true })

  return { isDark, toggle }
})