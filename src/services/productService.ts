import type { Product, ProductResponse } from "../types/product"

const BASE_URL = "https://dummyjson.com"

//  Get single product (strict)
export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error("Failed to fetch product")

  const data: Product = await res.json()
  return data
}

//  Get products by category (strict)
export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/category/${slug}`)
  if (!res.ok) throw new Error("Failed to fetch category products")

  const data: ProductResponse = await res.json()
  return data.products
}

//  Get all products (strict)
export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=0`)
  if (!res.ok) throw new Error("Failed to fetch products")

  const data: ProductResponse = await res.json()
  return data.products
}

//  Get categories (already fine but typed)
export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`)
  if (!res.ok) throw new Error("Failed to fetch categories")

  const data: string[] = await res.json()
  return data
}