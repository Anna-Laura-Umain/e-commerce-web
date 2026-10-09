export {cn} from 'cn'
import type {Product} from '@/types/product'

export function getProductCategory(product: Product) {
  // Favorites saved before _type was queried still need to resolve correctly.
  return product._type ?? ('roastLevel' in product && product.roastLevel ? 'coffee' : 'tea')
}

export function getProductLevel(product: Product) {
  if (getProductCategory(product) === 'coffee') {
    return ('roastLevel' in product && product.roastLevel) || ''
  }
  return ('oxidationLevel' in product && product.oxidationLevel) || ''
}

export function getProductDetail(product: Product) {
  const level = getProductLevel(product)
  if (!level) return ''
  return `${level} ${getProductCategory(product) === 'coffee' ? 'roast' : 'oxidation'}`
}

export function formatPrice(value: number) {
  return value.toLocaleString('en', {maximumFractionDigits: 2})
}
