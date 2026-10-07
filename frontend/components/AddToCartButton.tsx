'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {useCartStore} from '@/store/useCartStore'


type AddToCartButtonProps = {
  id: string
  name: string
  price: number
  available: boolean
  className?: string
}

export function AddToCartButton({id, name, price, available, className}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [added, setAdded] = useState(false)

  function handleClick() {
    addItem({id, name, price})
    setAdded(prevAdded => !prevAdded)
    
  }

  return (
    <Button 
      onClick={handleClick} 
      disabled={!available} 
      className={className}>
      {added ? 'Added ✓' : 'Add to Cart'}
    </Button>
  )
}