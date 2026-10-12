'use client'

import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import {useFavoriteStore} from '@/store/useFavoriteStore'
import {useMounted} from '@/hooks/use-mounted'

export default function FavoritesPage() {
  const favorites = useFavoriteStore((state) => state.favorites)

  const mounted = useMounted()

  return (
    <main className="container py-12">
      <h1 className="heading-display mb-8 border-b border-stone-200 pb-6 text-4xl tracking-tight text-stone-900">Favorites</h1>

      {mounted && favorites.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-lg text-muted-foreground">You have no favorites yet.</p>
          <Link
            href="/shop"
            className="rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white"
          >
            Browse the shop
          </Link>
        </div>
      )}

      {mounted && favorites.length > 0 && (
        <div className="grid auto-rows-fr items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}