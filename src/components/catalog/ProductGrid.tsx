import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "../../data/products";
import { useCartStore } from "../../store/cartStore";
import { useFavoritesStore } from "../../store/favoritesStore";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { addItem } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();

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

  const handleToggleFavorite = (product: Product) => {
    if (isFavorite(String(product.id))) {
      removeFromFavorites(String(product.id));
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
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
            <p className="text-sm text-gray-500 mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                {product.price} ₽
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleFavorite(product)}
                  className={`p-2 ${
                    isFavorite(String(product.id))
                      ? "text-red-600 hover:text-red-700"
                      : "text-gray-600 hover:text-red-600"
                  }`}
                  title={
                    isFavorite(String(product.id))
                      ? "Удалить из избранного"
                      : "Добавить в избранное"
                  }
                >
                  <Heart
                    size={20}
                    className={
                      isFavorite(String(product.id)) ? "fill-current" : ""
                    }
                  />
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-2 text-gray-600 hover:text-primary-600"
                  title="Добавить в корзину"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
