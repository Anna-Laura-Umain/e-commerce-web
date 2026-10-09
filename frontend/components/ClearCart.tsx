'use client'

import {useEffect} from 'react'
import {useCartStore} from '@/store/useCartStore'

// Empties the cart once the order is paid
export function ClearCart() {
  const clear = useCartStore((state) => state.clear)

  useEffect(() => {
    clear()
  }, [clear])

  return null
}