import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Package } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useFavoritesStore } from "../store/favoritesStore";
import { useCategories } from "../context/CategoriesContext";
import api from "../services/api";
import { Product } from "../types/product";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductActionCard from "../components/product/ProductActionCard";
import ProductTabs from "../components/product/ProductTabs";
import RelatedProducts from "../components/product/RelatedProducts";

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const { addItem } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();
  const { categories } = useCategories();

  
  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    setNotFound(false);
    api.getProduct(productId)
      .then((p) => {
        setProduct(p);
        
        return api.getProducts({
          subcategory: p.subCategoryId,
          limit: 6,
        });
      })
      .then((res) => {
        setRelated(res.products.filter((p) => p.id !== productId));
      })
      .catch((err) => {
        if (err.message?.includes("404") || err.message?.includes("не найден")) {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-20">
        <div className="glass rounded-2xl p-5 lg:p-7 animate-pulse">
          <div className="flex flex-col lg:flex-row gap-7">
            <div className="w-full lg:w-96 h-80 bg-dark-700 rounded-xl" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-dark-700 rounded w-3/4" />
              <div className="h-4 bg-dark-700 rounded w-1/2" />
              <div className="h-4 bg-dark-700 rounded w-2/3" />
              <div className="h-10 bg-dark-700 rounded w-1/3 mt-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 glass rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Package size={40} className="text-dark-400" />
        </div>
        <h1 className="text-3xl font-black text-white mb-4">Товар не найден</h1>
        <p className="text-dark-400 mb-6">К сожалению, запрашиваемый товар не существует.</p>
        <Link to="/catalog" className="btn-primary inline-flex">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  
  const category = categories.find((c) => c.id === product.categoryId);
  const subCategory = category?.subCategories.find((s) => s.id === product.subCategoryId);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) setQuantity(value);
  };

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) removeFromFavorites(product.id);
    else addToFavorites(product);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">

      
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-dark-400 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap">
        <Link to="/" className="hover:text-white transition-colors">Главная</Link>
        <ChevronRight size={14} className="text-dark-500 flex-shrink-0" />
        <Link to="/catalog" className="hover:text-white transition-colors">Каталог</Link>

        {category && (
          <>
            <ChevronRight size={14} className="text-dark-500 flex-shrink-0" />
            <Link to={`/catalog/${category.id}`} className="hover:text-white transition-colors">
              {category.name}
            </Link>
          </>
        )}
        {subCategory && (
          <>
            <ChevronRight size={14} className="text-dark-500 flex-shrink-0" />
            <Link to={`/catalog/${product.categoryId}/${product.subCategoryId}`} className="hover:text-white transition-colors">
              {subCategory.name}
            </Link>
          </>
        )}
        <ChevronRight size={14} className="text-dark-500 flex-shrink-0" />
        <span className="text-white font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      
      <div className="mb-8">
        <h1 className="section-title text-left">
          <span>{product.name}</span>
        </h1>
        <div className="accent-line mt-2" />
      </div>

      
      <div className="glass rounded-2xl p-5 lg:p-7 mb-6">
        <div className="flex flex-col lg:flex-row gap-7">
          
          <ProductGallery
            image={product.image ?? undefined}
            images={product.image ? [product.image] : undefined}
            name={product.name}
          />

          
          <div className="flex-1 flex flex-col md:flex-row gap-6">
            <ProductInfo
              brand={product.brand}
              inStock={product.inStock}
              color={undefined}
              serviceType={product.serviceType ?? undefined}
            />
            <ProductActionCard
              product={product}
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
              addItem={addItem}
              isFavorite={isFavorite}
              handleToggleFavorite={handleToggleFavorite}
            />
          </div>
        </div>
      </div>

      
      <ProductTabs product={product} />

      
      <RelatedProducts products={related} />
    </div>
  );
};

export default ProductPage;
