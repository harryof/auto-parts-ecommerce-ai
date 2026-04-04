import React from "react";
import { ShoppingCart, Heart, Truck, ShieldCheck, Minus, Plus, Star } from "lucide-react";
import { Product } from "../../data/products";

interface ProductActionCardProps {
  product: Product;
  quantity: number;
  handleQuantityChange: (val: number) => void;
  addItem: (item: any, quantity: number) => void;
  isFavorite: (id: string) => boolean;
  handleToggleFavorite: () => void;
}

const ProductActionCard: React.FC<ProductActionCardProps> = ({
  product,
  quantity,
  handleQuantityChange,
  addItem,
  isFavorite,
  handleToggleFavorite,
}) => {
  const fav = isFavorite(String(product.id));
  const rating = product.rating ?? 0;
  const reviews = product.reviewCount ?? 0;

  return (
    <div className="glass rounded-2xl p-6 flex-shrink-0 w-full md:w-80">
      {/* Price */}
      <div className="flex items-end gap-3 mb-2">
        <span className="text-3xl font-black text-white leading-none">
          {product.price.toLocaleString()} ₽
        </span>
        {product.oldPrice && (
          <span className="text-dark-500 line-through text-lg mb-0.5">
            {product.oldPrice.toLocaleString()} ₽
          </span>
        )}
      </div>

      {/* Rating */}
      {rating > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={star <= Math.round(rating) ? "text-primary-400 fill-primary-400" : "text-dark-600"}
              />
            ))}
          </div>
          <span className="text-sm text-dark-400">{rating.toFixed(1)}</span>
          {reviews > 0 && (
            <span className="text-xs text-dark-500">({reviews} отзывов)</span>
          )}
        </div>
      )}

      {/* Stock */}
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold mb-5
        ${product.inStock ? "bg-emerald-500/10 text-emerald-400" : "bg-dark-700 text-dark-400"}`}>
        <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-emerald-400" : "bg-dark-500"}`} />
        {product.inStock ? "● В наличии" : "● Под заказ"}
      </div>

      {/* Article */}
      {product.article && (
        <div className="text-xs text-dark-500 mb-5">
          Арт: <span className="text-dark-300 font-mono">{product.article}</span>
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-dark-400">Количество:</span>
        <div className="flex items-center gap-0 rounded-xl overflow-hidden border border-white/10 bg-dark-900">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="px-3 py-2 text-dark-300 hover:text-white hover:bg-white/5 disabled:opacity-40 transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="px-4 text-sm font-bold text-white min-w-[2rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-3 py-2 text-dark-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2 mb-5">
        <button
          onClick={() =>
            addItem(
              { id: product.id, title: product.name, price: product.price, image: product.image, article: product.id, quantity },
              quantity
            )
          }
          disabled={!product.inStock}
          className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={16} />
          {product.inStock ? "В корзину" : "Нет в наличии"}
        </button>

        <button
          onClick={handleToggleFavorite}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border font-semibold text-sm transition-all
            ${fav
              ? "border-primary-500/50 text-primary-400 bg-primary-500/10"
              : "border-white/10 text-dark-300 hover:text-white hover:border-white/20 bg-transparent"
            }`}
        >
          <Heart size={15} fill={fav ? "currentColor" : "none"} />
          {fav ? "В избранном" : "В избранное"}
        </button>
      </div>

      {/* Delivery info */}
      <div className="pt-4 border-t border-white/5 space-y-2">
        <div className="flex items-start gap-3">
          <ShieldCheck size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <span className="text-xs text-dark-300">Гарантия 14 дней на возврат товара</span>
        </div>
        <div className="flex items-start gap-3">
          <Truck size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <span className="text-xs text-dark-300">Бесплатная доставка при заказе от 5 000 ₽</span>
        </div>
      </div>
    </div>
  );
};

export default ProductActionCard;
