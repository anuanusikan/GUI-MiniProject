import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useCartStore } from "./cartStore"

export type Address = {
  fullName: string
  phone: string
  province: string
  district: string
  city: string
  house: string
  area: string
  address: string
  label: "HOME" | "OFFICE"
}

export const useCheckoutStore = defineStore("checkout", () => {
  const cart = useCartStore()

  // selected cart item ids
  const selectedIds = ref<number[]>([])

  // promo (demo)
  const promoCode = ref("")
  const promoDiscount = ref(0)

  const deliveryFee = ref(495)

  const address = ref<Address>({
    fullName: "",
    phone: "",
    province: "",
    district: "",
    city: "",
    house: "",
    area: "",
    address: "",
    label: "HOME",
  })

  // selected items
  const selectedItems = computed(() =>
    cart.items.filter((i) => selectedIds.value.includes(i.id))
  )

  const selectedCount = computed(() =>
    selectedItems.value.reduce((sum, i) => sum + i.qty, 0)
  )

  const subtotal = computed(() =>
    selectedItems.value.reduce((sum, i) => sum + i.price * i.qty, 0)
  )

  const total = computed(() => {
    const t = subtotal.value + deliveryFee.value - promoDiscount.value
    return Math.max(0, t)
  })

  function selectAll() {
    selectedIds.value = cart.items.map((i) => i.id)
  }

  function clearSelection() {
    selectedIds.value = []
  }

  function toggle(id: number) {
    if (selectedIds.value.includes(id)) {
      selectedIds.value = selectedIds.value.filter((x) => x !== id)
    } else {
      selectedIds.value.push(id)
    }
  }

  function applyPromo() {
    const code = promoCode.value.trim().toUpperCase()
    if (code === "SAVE10") promoDiscount.value = 10
    else if (code === "SAVE100") promoDiscount.value = 100
    else promoDiscount.value = 0
  }

  function resetCheckout() {
    promoCode.value = ""
    promoDiscount.value = 0
    clearSelection()
    address.value = {
      fullName: "",
      phone: "",
      province: "",
      district: "",
      city: "",
      house: "",
      area: "",
      address: "",
      label: "HOME",
    }
  }

  return {
    selectedIds,
    selectedItems,
    selectedCount,
    subtotal,
    total,
    deliveryFee,
    promoCode,
    promoDiscount,
    address,
    selectAll,
    clearSelection,
    toggle,
    applyPromo,
    resetCheckout,
  }
})