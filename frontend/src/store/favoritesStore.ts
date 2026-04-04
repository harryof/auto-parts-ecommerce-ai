import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../data/products";
import { ProductType } from "../types/product";
import { getCurrentUser } from "../data/users";

interface FavoritesState {
  items: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

interface FavoritesStore {
  items: ProductType[];
  addItem: (item: ProductType) => void;
  removeItem: (itemId: string | number) => void;
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
    {
      name: `favorites-storage-${getCurrentUser()?.email || "guest"}`,
    }
  )
);

export const useFavoritesStore2 = create<FavoritesStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),
  clearFavorites: () => set({ items: [] }),
}));
