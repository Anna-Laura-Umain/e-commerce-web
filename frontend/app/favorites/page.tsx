"use client";

import CoffeeCardItem from "@/components/CoffeeCard";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { Coffee } from "@/types/coffee";

export default function FavoritesPage() {
  const favorites = useFavoriteStore(
    (state: { favorites: Coffee[] }) => state.favorites
  );

  return (
    <main className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Favorites</h1>

      {favorites.length === 0 ? (
        <p>You have no favorites yet.</p>
      ) : (
        <div className="heading-display grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((coffee: Coffee) => (
            <CoffeeCardItem key={coffee._id} coffee={coffee} />
          ))}
        </div>
      )}
    </main>
  );
}