import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import { Product } from "../types/product";
import ProductCard from "../components/catalog/ProductCard";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    api.getProducts({ search: query, limit: 40 })
      .then((res) => setResults(res.products))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-10">
      <h1 className="section-title text-center mb-4">
        {query ? <span>Результаты поиска: «{query}»</span> : <span>Поиск</span>}
      </h1>
      <div className="accent-line mx-auto mb-12" />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="bg-dark-700 rounded-t-2xl" style={{ height: 220 }} />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-dark-700 rounded w-3/4" />
                <div className="h-3 bg-dark-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : query && results.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-dark-300 mb-2">По запросу «{query}» ничего не найдено</p>
          <p className="text-sm text-dark-500">Попробуйте другие ключевые слова</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
