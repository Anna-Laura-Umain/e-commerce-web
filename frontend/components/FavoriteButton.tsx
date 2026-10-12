'use client'

import { Heart } from 'lucide-react'
import { useFavoriteStore } from '@/store/useFavoriteStore'
import { useMounted } from '@/hooks/use-mounted'
import type { Product } from '@/types/product'

type FavoriteButtonProps = {
  product: Product
  className?: string
}

export function FavoriteButton({
  product,
  className = '',
}: FavoriteButtonProps) {
  const mounted = useMounted()

  const isFavorite = useFavoriteStore((state) =>
    state.favorites.some(
      (favorite) => favorite._id === product._id
    )
  )

  const toggleFavorite = useFavoriteStore(
    (state) => state.toggleFavorite
  )

  const showAsFavorite = mounted && isFavorite

  return (
    <button
      type="button"
      className={`flex size-11 items-center justify-center rounded-full bg-white/95 shadow-sm transition-colors hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800 ${className}`}
      aria-pressed={showAsFavorite}
      aria-label={
        showAsFavorite
          ? `Remove ${product.name} from favorites`
          : `Add ${product.name} to favorites`
      }
      onClick={() => toggleFavorite(product)}
    >
      <Heart
        className={`size-5 ${
          showAsFavorite
            ? 'fill-red-500 text-red-500'
            : 'text-black'
        }`}
      />
    </button>
  )
}