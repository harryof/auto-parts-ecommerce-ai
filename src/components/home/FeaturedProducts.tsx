import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { ProductType } from "../../types/product";
import { products } from "../../data/products";

const FeaturedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState("hits");
  const { addItem } = useCartStore();

  const filteredProducts = products.filter((product) => {
    if (activeTab === "hits") return product.isHit;
    if (activeTab === "new") return product.isNew;
    if (activeTab === "recommended") return product.isRecommended;
    return true;
  });

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary-800">
          Лучшие предложения
        </h2>

        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <button
            onClick={() => setActiveTab("hits")}
            className={`px-3 py-1 text-sm ${
              activeTab === "hits"
                ? "bg-primary-700 text-white"
                : "bg-white text-secondary-700 hover:bg-gray-100"
            }`}
          >
            Хиты
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-3 py-1 text-sm ${
              activeTab === "new"
                ? "bg-primary-700 text-white"
                : "bg-white text-secondary-700 hover:bg-gray-100"
            }`}
          >
            Новинки
          </button>
          <button
            onClick={() => setActiveTab("recommended")}
            className={`px-3 py-1 text-sm ${
              activeTab === "recommended"
                ? "bg-primary-700 text-white"
                : "bg-white text-secondary-700 hover:bg-gray-100"
            }`}
          >
            Рекомендуем
          </button>
        </div>

        <Link
          to="/catalog"
          className="text-sm text-primary-700 hover:text-primary-800 font-medium hidden sm:inline-block"
        >
          Весь каталог
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card group">
            <div className="relative">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover object-center"
                />
              </Link>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isHit && (
                  <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded">
                    Хит
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    Новинка
                  </span>
                )}
                {product.oldPrice && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Скидка
                  </span>
                )}
              </div>

              {/* Quick actions */}
              <div className="absolute top-2 right-2">
                <button className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Heart
                    size={18}
                    className="text-gray-600 hover:text-primary-600"
                  />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="text-xs text-gray-500 mb-1">
                Арт: {product.article}
              </div>

              <Link to={`/product/${product.id}`} className="block mb-2">
                <h3 className="text-secondary-800 font-medium hover:text-primary-700 line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-baseline mb-2">
                <span className="text-xl font-bold text-secondary-800">
                  {product.price.toLocaleString()} ₽
                </span>

                {product.oldPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {product.oldPrice.toLocaleString()} ₽
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  {product.inStock ? (
                    <span className="text-green-600">В наличии</span>
                  ) : (
                    <span className="text-gray-500">Под заказ</span>
                  )}
                </div>

                <button
                  onClick={() =>
                    addItem(
                      {
                        id: product.id,
                        title: product.name,
                        price: product.price,
                        image: product.image,
                        article: product.article || product.id,
                        quantity: 1,
                      },
                      1
                    )
                  }
                  disabled={!product.inStock}
                  className={`p-2 rounded-md ${
                    product.inStock
                      ? "bg-primary-700 text-white hover:bg-primary-800"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
