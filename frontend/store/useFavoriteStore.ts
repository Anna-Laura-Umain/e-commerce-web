import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import type {Product} from '@/types/product'

type FavoriteStore = {
  favorites: Product[]
  toggleFavorite: (product: Product) => void
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set) => ({
      favorites: [],

      // Adds the product if it's not in favorites, removes it if it is
      toggleFavorite: (product) =>
        set((state) => {
          const alreadyFavorite = state.favorites.some((favorite) => favorite._id === product._id)

          return {
            favorites: alreadyFavorite
              ? state.favorites.filter((favorite) => favorite._id !== product._id)
              : [...state.favorites, product],
          }
        }),
    }),
    {name: 'leaf-bean-favorites'}, // key in localStorage
  ),
)