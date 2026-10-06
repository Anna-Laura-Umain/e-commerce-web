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
      className={`rounded-full bg-white p-2 shadow ${className}`}
      aria-label={
        showAsFavorite
          ? 'Remove from favorites'
          : 'Add to favorites'
      }
      onClick={() => toggleFavorite(product)}
    >
      <Heart
        className={`h-6 w-6 ${
          showAsFavorite
            ? 'fill-red-500 text-red-500'
            : 'text-black'
        }`}
      />
    </button>
  )
}