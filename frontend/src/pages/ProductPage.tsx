import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useFavoritesStore } from "../store/favoritesStore";
import { products } from "../data/products";
import { categories } from "../data/categories";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductActionCard from "../components/product/ProductActionCard";
import ProductTabs from "../components/product/ProductTabs";
import RelatedProducts from "../components/product/RelatedProducts";

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();

  const product = products.find((p) => String(p.id) === productId);

  if (!product) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-black text-white mb-4">Товар не найден</h1>
        <p className="text-dark-400 mb-6">К сожалению, запрашиваемый товар не существует.</p>
        <Link to="/catalog" className="btn-primary inline-flex">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  // Get real category and subcategory names
  const category    = categories.find((c) => c.id === product.categoryId);
  const subCategory = category?.subCategories.find((s) => s.id === product.subCategoryId);

  // Related products: same subcategory, exclude current
  const related = products.filter(
    (p) =>
      p.id !== product.id &&
      p.subCategoryId === product.subCategoryId
  );
  // If not enough, fallback to same category
  const relatedFinal =
    related.length >= 2
      ? related
      : products.filter((p) => p.id !== product.id && p.categoryId === product.categoryId);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) setQuantity(value);
  };

  const handleToggleFavorite = () => {
    if (isFavorite(String(product.id))) {
      removeFromFavorites(String(product.id));
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">

      {/* ── Breadcrumbs ── */}
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
            <Link
              to={`/catalog/${product.categoryId}/${product.subCategoryId}`}
              className="hover:text-white transition-colors"
            >
              {subCategory.name}
            </Link>
          </>
        )}

        <ChevronRight size={14} className="text-dark-500 flex-shrink-0" />
        <span className="text-white font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* ── Product title (mobile) ── */}
      <div className="mb-8">
        <h1 className="section-title text-left">
          <span>{product.name}</span>
        </h1>
        <div className="accent-line mt-2" />
      </div>

      {/* ── Main product block ── */}
      <div className="glass rounded-2xl p-5 lg:p-7 mb-6">
        <div className="flex flex-col lg:flex-row gap-7">
          {/* Gallery */}
          <ProductGallery image={product.image} images={product.images} name={product.name} />

          {/* Info + Action */}
          <div className="flex-1 flex flex-col md:flex-row gap-6">
            <ProductInfo
              brand={product.brand}
              inStock={product.inStock}
              color={product.color}
              serviceType={product.serviceType}
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

      {/* ── Tabs ── */}
      <ProductTabs product={product} />

      {/* ── Related products ── */}
      <RelatedProducts products={relatedFinal} />
    </div>
  );
};

export default ProductPage;
