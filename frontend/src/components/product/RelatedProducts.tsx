import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "../../types/product";
import { useCartStore } from "../../store/cartStore";
import { useFavoritesStore } from "../../store/favoritesStore";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  title = "Похожие товары",
}) => {
  const { addItem } = useCartStore();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();

  if (!products.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-black text-white mb-5">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.slice(0, 5).map((p) => {
          const fav = isFavorite(p.id);
          return (
            <div key={p.id} className="card group flex flex-col">
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 160 }}>
                <Link to={`/product/${p.id}`}>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-dark-700 flex items-center justify-center">
                      <span className="text-dark-500 text-xs text-center px-2 line-clamp-2">{p.name}</span>
                    </div>
                  )}
                </Link>
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {p.isHit && <span className="badge badge-hit">Хит</span>}
                  {p.isNew && <span className="badge badge-new">New</span>}
                </div>
                {/* Fav button */}
                <button
                  onClick={() => fav ? removeFromFavorites(p.id) : addToFavorites(p)}
                  className={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-xl glass transition-all opacity-0 group-hover:opacity-100
                    ${fav ? "text-primary-400" : "text-dark-300 hover:text-primary-400"}`}
                >
                  <Heart size={12} fill={fav ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col flex-1">
                <Link to={`/product/${p.id}`} className="flex-1">
                  <h3 className="text-xs font-semibold text-dark-100 group-hover:text-white transition-colors line-clamp-2 mb-2 leading-snug">
                    {p.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5 gap-2">
                  <div className="text-sm font-black text-white">{p.price.toLocaleString()} ₽</div>
                  <button
                    onClick={() =>
                      addItem({ id: p.id, title: p.name, price: p.price, image: p.image ?? null, article: p.article || p.id, quantity: 1 }, 1)
                    }
                    disabled={!p.inStock}
                    className="btn-primary py-1.5 px-2.5 text-xs disabled:opacity-40"
                  >
                    <ShoppingCart size={11} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
