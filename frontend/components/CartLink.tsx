'use client'

import Link from 'next/link'
import {ShoppingBag} from 'lucide-react'
import {buttonVariants} from '@/components/ui/button'
import {useMounted} from '@/hooks/use-mounted'
import {useCartStore} from '@/store/useCartStore'

export function CartLink() {
  const hasItems = useCartStore((state) => state.items.length > 0)
  const mounted = useMounted()
  const showDot = mounted && hasItems

  return (
    <Link
      href="/cart"
      aria-label={showDot ? 'Cart, has items' : 'Cart'}
      className={`relative ${buttonVariants({variant: 'ghost', size: 'icon'})}`}
    >
      <ShoppingBag />
      {showDot && (
        <span
          aria-hidden="true"
          className="absolute right-1.5 top-1.5 size-2 rounded-full bg-red-500"
        />
      )}
    </Link>
  )
}