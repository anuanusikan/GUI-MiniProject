import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const useDarkModeStore = defineStore("darkMode", () => {
  const isDark = ref(false)

  // Load from localStorage - start light mode by default
  const saved = localStorage.getItem("darkMode")
  if (saved !== null) {
    isDark.value = saved === "true"
  } else {
    isDark.value = false // Default to light mode
  }

  // Apply dark class
  function apply() {
    if (isDark.value) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Initialize immediately
  apply()

  // Toggle function
  function toggle() {
    isDark.value = !isDark.value
  }

  // Watch and save
  watch(isDark, (value) => {
    localStorage.setItem("darkMode", String(value))
    apply()
  })

  return { isDark, toggle }
})