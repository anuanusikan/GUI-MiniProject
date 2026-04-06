import { defineStore } from "pinia"
import { computed, ref } from "vue"

interface DummyUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

type User = {
  name: string
  email: string
  username?: string
  image?: string
  accessToken?: string
  phone?: string
  address?: string
}

const LS_KEY = "AlloraCart_User"

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(loadUser())
  const loading = ref(false)
  const error = ref<string | null>(null)

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

  async function signIn(username: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, expiresInMins: 60 }),
        // credentials: "include" removed — causes CORS issues on Netlify
      })

      // Read the body ONCE only
      const data = await res.json() as DummyUser & { message?: string }

      console.log("Status:", res.status)
      console.log("Response:", data)

      if (!res.ok) {
        error.value = data?.message ?? "Invalid credentials"
        return false
      }

      const mapped: User = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        username: data.username,
        image: data.image,
        accessToken: data.accessToken,
      }
      user.value = mapped
      persist(mapped)
      return true
    } catch {
      error.value = "Network error. Please try again."
      return false
    } finally {
      loading.value = false
    }
  }

  function signUp(payload: { name: string; email: string; phone?: string; address?: string }) {
    const u: User = {
      name: payload.name,
      email: payload.email,
      username: payload.email.split("@")[0],
    }
    user.value = u
    persist(u)
  }

  function signOut() {
    user.value = null
    persist(null)
  }

  return { user, isAuthenticated, loading, error, signIn, signUp, signOut }
})