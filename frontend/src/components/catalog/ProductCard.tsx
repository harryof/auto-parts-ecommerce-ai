import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useFavoritesStore } from "../../store/favoritesStore";
import { Product } from "../../data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
  visible?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0, visible = true }) => {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();
  const fav = isFavorite(product.id);

  const handleCart = () => {
    addItem({ id: product.id, title: product.name, price: product.price, image: product.image, article: product.id, quantity: 1 }, 1);
  };

  const handleFav = () => {
    if (fav) removeFromFavorites(product.id);
    else addToFavorites(product);
  };

  return (
    <div
      className={`group relative card flex flex-col h-full cursor-pointer transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: 220 }}>
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
        />

        {/* Gradient overlay */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
             style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.1) 60%)' }} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isHit && <span className="badge badge-hit">Хит</span>}
          {product.isNew && <span className="badge badge-new">New</span>}
        </div>

        {/* Action icons top-right */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 z-10 transition-all duration-300 ${hovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
          <button
            onClick={handleFav}
            className={`w-9 h-9 flex items-center justify-center rounded-2xl glass transition-all hover:scale-110 ${fav ? 'text-primary-400 bg-primary-500/20' : 'text-dark-200 hover:text-primary-400'}`}
          >
            <Heart size={14} fill={fav ? "currentColor" : "none"} />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="w-9 h-9 flex items-center justify-center rounded-2xl glass text-dark-200 hover:text-white transition-all hover:scale-110"
          >
            <Eye size={14} />
          </Link>
        </div>

        {/* Bottom action bar */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 z-10 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <button
            onClick={handleCart}
            disabled={!product.inStock}
            className="btn-primary w-full py-2 text-xs justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={13} />
            {product.inStock ? "В корзину" : "Нет в наличии"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className={`text-sm font-semibold leading-snug mb-2 line-clamp-2 transition-colors ${hovered ? 'text-white' : 'text-dark-100'}`}>
            {product.name}
          </h3>
        </Link>

        <div className="flex items-end justify-between mt-auto pt-2 border-t border-white/5">
          <div>
            <div className="text-lg font-black text-white leading-none">
              {product.price.toLocaleString()} ₽
            </div>
            {product.oldPrice && (
              <div className="text-xs text-dark-500 line-through">{product.oldPrice.toLocaleString()} ₽</div>
            )}
          </div>
          <span className={`text-xs font-semibold ${product.inStock ? 'text-emerald-400' : 'text-dark-500'}`}>
            {product.inStock ? "● В наличии" : "● Под заказ"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
