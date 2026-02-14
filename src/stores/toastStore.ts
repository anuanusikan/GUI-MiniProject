import { defineStore } from "pinia"
import { ref } from "vue"

export type ToastType = "success" | "info" | "error"

export const useToastStore = defineStore("toast", () => {
  const isOpen = ref(false)
  const message = ref("")
  const type = ref<ToastType>("success")

  let timer: number | undefined

  function show(msg: string, t: ToastType = "success", duration = 2200) {
    message.value = msg
    type.value = t
    isOpen.value = true

    if (timer) window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      isOpen.value = false
    }, duration)
  }

  function close() {
    isOpen.value = false
    if (timer) window.clearTimeout(timer)
  }

  return { isOpen, message, type, show, close }
})