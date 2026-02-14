import { defineStore } from "pinia"
import { ref } from "vue"

export type AuthMode = "signin" | "signup"

export const useUiStore = defineStore("ui", () => {
  const isAuthModalOpen = ref(false)
  const authMode = ref<AuthMode>("signin")

  function openAuth(mode: AuthMode) {
    authMode.value = mode
    isAuthModalOpen.value = true
  }

  function closeAuth() {
    isAuthModalOpen.value = false
  }

  return { isAuthModalOpen, authMode, openAuth, closeAuth }
})
