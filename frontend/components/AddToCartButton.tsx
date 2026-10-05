'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {useCart} from '@/lib/store/cart'

type AddToCartButtonProps = {
  id: string
  name: string
  price: number
  available: boolean
  className?: string
}

export function AddToCartButton({id, name, price, available, className}: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem)
  const [added, setAdded] = useState(false)

  function handleClick() {
    addItem({id, name, price})
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Button onClick={handleClick} disabled={!available} className={className}>
      {added ? 'Added ✓' : 'Add to Cart'}
    </Button>
  )
}