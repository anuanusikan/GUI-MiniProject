// Convert USD → LKR and format currency

const USD_TO_LKR = 320

export function toLKR(usd: number): number {
  return usd * USD_TO_LKR
}

export function formatLKR(value: number): string {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(value)
}