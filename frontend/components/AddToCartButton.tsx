'use client'

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
  const items = useCartStore((state) => state.items)

  const added = items.some((item) => item.id === id)

  function handleClick() {
    if (!added){
    addItem({id, name, price})}
    
    
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