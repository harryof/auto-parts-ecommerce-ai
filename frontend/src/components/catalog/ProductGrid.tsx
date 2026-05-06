import React, { useEffect, useRef, useState } from "react";
import { Product } from "../../types/product";
import ProductCard from "./ProductCard";
import { PackageOpen } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const SkeletonCard: React.FC = () => (
  <div className="card flex flex-col h-full animate-pulse">
    <div className="bg-dark-700 rounded-t-2xl" style={{ height: 220 }} />
    <div className="p-4 flex flex-col gap-3">
      <div className="h-4 bg-dark-700 rounded w-3/4" />
      <div className="h-3 bg-dark-700 rounded w-1/2" />
      <div className="h-5 bg-dark-700 rounded w-1/3 mt-auto" />
    </div>
  </div>
);

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center mb-4">
          <PackageOpen size={36} className="text-dark-400" />
        </div>
        <h3 className="text-lg font-semibold text-dark-200 mb-2">Товары не найдены</h3>
        <p className="text-sm text-dark-400">Попробуйте изменить параметры фильтрации</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} visible={true} />
      ))}
    </div>
  );
};

export default ProductGrid;
