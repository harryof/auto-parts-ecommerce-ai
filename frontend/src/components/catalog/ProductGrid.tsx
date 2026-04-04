import React, { useEffect, useRef, useState } from "react";
import { Product } from "../../data/products";
import ProductCard from "./ProductCard";
import { PackageOpen } from "lucide-react";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

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
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} visible={visible} />
      ))}
    </div>
  );
};

export default ProductGrid;
