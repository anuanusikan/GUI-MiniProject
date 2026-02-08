import type { Product } from "../types/product"

const BASE_URL = "https://dummyjson.com"

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=100`)
  if (!res.ok) throw new Error("Failed to fetch products")
  const data = await res.json()
  return data.products as Product[]
}

