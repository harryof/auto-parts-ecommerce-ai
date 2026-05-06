import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useFavoritesStore } from "../store/favoritesStore";
import { useCartStore } from "../store/cartStore";
import { Product } from "../types/product";

const FavoritesPage: React.FC = () => {
  const { items, removeFromFavorites } = useFavoritesStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addItem(
      {
        id: product.id,
        title: product.name,
        price: product.price,
        image: product.image,
        article: product.id,
        quantity: 1,
      },
      1
    );
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="section-title text-center mb-4">
        <span>Избранное</span>
      </h1>
      <div className="accent-line mx-auto mb-12" />

      {items.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            В избранном пока ничего нет
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Добавляйте товары в избранное, чтобы не потерять их
          </p>
          <div className="mt-6">
            <Link
              to="/catalog"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Перейти в каталог
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image ?? undefined}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price} ₽
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2 text-gray-600 hover:text-primary-600"
                      title="Добавить в корзину"
                    >
                      <ShoppingCart size={20} />
                    </button>
                    <button
                      onClick={() => removeFromFavorites(product.id)}
                      className="p-2 text-gray-600 hover:text-red-600"
                      title="Удалить из избранного"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
