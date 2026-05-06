import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/product";

interface FavoritesState {
  items: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      addToFavorites: (product) => {
        const { items } = get();
        if (!items.some((item) => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },
      removeFromFavorites: (productId) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== productId) });
      },
      isFavorite: (productId) => {
        const { items } = get();
        return items.some((item) => item.id === productId);
      },
      clearFavorites: () => set({ items: [] }),
    }),
    { name: "favorites-storage-guest" }
  )
);
