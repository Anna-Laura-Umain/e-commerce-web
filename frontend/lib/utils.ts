export { cn } from "cn"
import type {Product} from '@/types/product'

// Coffee shows roast level, tea shows oxidation level
export function getProductDetail(product: Product) {
  if ('roastLevel' in product) return `${product.roastLevel} roast`
  return `${product.oxidationLevel} oxidation`
}

export function formatPrice(value: number) {
  return value.toLocaleString('en', {maximumFractionDigits: 0})
}

// Coffee has a roast level, tea doesn't
export function getProductCategory(product: Product) {
  return 'roastLevel' in product ? 'coffee' : 'tea'
}

// Roast level for coffee, oxidation level for tea
export function getProductLevel(product: Product) {
  return 'roastLevel' in product ? product.roastLevel : product.oxidationLevel
}