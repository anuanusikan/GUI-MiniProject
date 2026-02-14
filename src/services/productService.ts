import type { Product } from "../types/product"


export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const res = await fetch(`https://dummyjson.com/products/category/${slug}`)
  if (!res.ok) throw new Error("Failed to fetch category products")
  const data = await res.json()
  return data.products as Product[]
}


const BASE_URL = "https://dummyjson.com"

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=100`)
  if (!res.ok) throw new Error("Failed to fetch products")
  const data = await res.json()
  return data.products as Product[]
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch("https://dummyjson.com/products/categories")
  if (!res.ok) throw new Error("Failed to fetch categories")
  return res.json()
}


