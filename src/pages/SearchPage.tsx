import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/catalog/ProductCard";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState(products);
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (query) {
      const filteredProducts = products.filter((product) => {
        const searchString =
          `${product.name} ${product.brand} ${product.id}`.toLowerCase();
        return searchString.includes(query.toLowerCase());
      });
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {query ? `Результаты поиска: "${query}"` : "Поиск"}
      </h1>

      {query && searchResults.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            По вашему запросу ничего не найдено
          </p>
          <p className="text-sm text-gray-500">
            Попробуйте изменить параметры поиска или использовать другие
            ключевые слова
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
