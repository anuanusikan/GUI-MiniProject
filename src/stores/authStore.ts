import { defineStore } from "pinia"
import { computed, ref } from "vue"

type User = {
  name: string
  email: string
  phone?: string
  address?: string
}


const LS_KEY = "shopinhaven_user"

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(loadUser())

  const isAuthenticated = computed(() => !!user.value)

  function loadUser(): User | null {
    try {
      const raw = localStorage.getItem(LS_KEY)
      return raw ? (JSON.parse(raw) as User) : null
    } catch {
      return null
    }
  }

  function persist(u: User | null) {
    if (!u) localStorage.removeItem(LS_KEY)
    else localStorage.setItem(LS_KEY, JSON.stringify(u))
  }

  function signIn(payload: User) {
    user.value = payload
    persist(payload)
  }

  function signUp(payload: User) {
    // frontend-only: sign up behaves like sign in
    user.value = payload
    persist(payload)
  }

  function signOut() {
    user.value = null
    persist(null)
  }

  return { user, isAuthenticated, signIn, signUp, signOut }
})
