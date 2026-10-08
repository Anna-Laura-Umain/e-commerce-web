'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMounted } from '@/hooks/use-mounted'
import { useCartStore } from '@/store/useCartStore'
import {formatPrice} from '@/lib/utils'

export function CartView() {
  const items = useCartStore((state) => state.items)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clear = useCartStore((state) => state.clear)

  const mounted = useMounted()
  if (!mounted) return null

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-lg text-muted-foreground">Your cart is empty.</p>
        <Link
          href="/"
          className="inline-block max-w-2xs rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
        >
          Continue shopping
        </Link>
      </div>
    )
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="grid gap-10 lg:grid-cols-3">
      <ul className="min-w-0 divide-y lg:col-span-2">
        {items.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 py-6">
            <div className="min-w-0 basis-full sm:basis-auto sm:flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted-foreground">SEK {item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Decrease quantity"
                onClick={() => setQuantity(item.id, item.quantity - 1)}
              >
                <Minus />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                aria-label="Increase quantity"
                onClick={() => setQuantity(item.id, item.quantity + 1)}
              >
                <Plus />
              </Button>
            </div>

            <p className="ml-auto text-right font-medium sm:ml-0 sm:w-24">
              SEK {formatPrice(item.price * item.quantity)}
            </p>

            <Button
              variant="ghost"
              size="icon"
              aria-label={`Remove ${item.name}`}
              onClick={() => removeItem(item.id)}
            >
              <Trash2 />
            </Button>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-lg border p-6">
        <div className="flex justify-between text-lg font-semibold">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
          <span>SEK</span>
        </div>
        <Button className="mt-6 w-full">Checkout</Button>
        <Button variant="ghost" className="mt-2 w-full" onClick={clear}>
          Clear cart
        </Button>
      </aside>
    </div>
  )
}