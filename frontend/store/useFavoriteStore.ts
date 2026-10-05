import { create } from 'zustand'
import { Coffee } from '@/types/coffee'

type FavoriteStore = {
  favorites: Coffee[]
  toggleFavorite: (coffee: Coffee) => void
};

export const useFavoriteStore = create<FavoriteStore>((set) => ({
    favorites: [],

    toggleFavorite: (coffee) =>
    set((state) => {
      const alreadyFavorite = state.favorites.some(
        (favorite) => favorite._id === coffee._id
      );

      const updatedFavorites = alreadyFavorite
    ? state.favorites.filter((favorite) => favorite._id !== coffee._id)
    : [...state.favorites, coffee];
      console.log(updatedFavorites)


      return {
        favorites: updatedFavorites,
      };
    }),
}));