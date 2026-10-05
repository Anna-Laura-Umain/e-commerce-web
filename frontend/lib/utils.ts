export { cn } from "cn"
import type {Product} from '@/types/product'

// Coffee shows roast level, tea shows oxidation level
export function getProductDetail(product: Product) {
  if ('roastLevel' in product) return `${product.roastLevel} roast`
  return `${product.oxidationLevel} oxidation`
}