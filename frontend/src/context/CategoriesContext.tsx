/**
 * React Context for categories — fetched once from the API and shared everywhere.
 * Wrap your app (or Layout) with <CategoriesProvider>.
 */
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { Category } from "../types/product";

interface CategoriesContextValue {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const CategoriesContext = createContext<CategoriesContextValue>({
  categories: [],
  loading: true,
  error: null,
});

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getCategories()
      .then(setCategories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
