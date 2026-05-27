import React, { useState, useEffect, useRef } from "react";
import { X, Search, Car, ChevronRight, Loader2, AlertCircle, CheckCircle2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import api, { VinCar, Product } from "../../services/api";

interface VinSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VinSearchModal: React.FC<VinSearchModalProps> = ({ isOpen, onClose }) => {
  const [vin, setVin] = useState("");
  const [partQuery, setPartQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foundCar, setFoundCar] = useState<VinCar | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searched, setSearched] = useState(false);

  const vinInputRef = useRef<HTMLInputElement>(null);

  
  useEffect(() => {
    if (!isOpen) {
      setVin("");
      setPartQuery("");
      setError(null);
      setFoundCar(null);
      setProducts([]);
      setSearched(false);
      setLoading(false);
    } else {
      setTimeout(() => vinInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedVin = vin.trim();
    if (trimmedVin.length < 3) {
      setError("Введите минимум 3 символа VIN");
      return;
    }

    setLoading(true);
    setError(null);
    setFoundCar(null);
    setProducts([]);
    setSearched(false);

    try {
      const result = await api.searchByVin(trimmedVin, partQuery.trim());
      setFoundCar(result.car);
      setProducts(result.products);
      setSearched(true);
    } catch (err: any) {
      setError(err.message || "Ошибка поиска");
    } finally {
      setLoading(false);
    }
  };

  const handleVinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const val = e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, "");
    setVin(val.slice(0, 17));
    setError(null);
  };

  const vinIsValid = vin.trim().length >= 3;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn" />

      
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-dark-900 border border-white/10 rounded-3xl shadow-2xl shadow-black/50 animate-slideUp overflow-hidden">

        
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center">
              <Car size={20} className="text-primary-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Поиск по VIN</h2>
              <p className="text-xs text-dark-400">Подбор запчастей для вашего автомобиля</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-dark-400 hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>

        
        <div className="flex-1 overflow-y-auto">

          
          <form onSubmit={handleSearch} className="p-6 space-y-4">
            
            <div>
              <label className="text-xs font-semibold text-dark-300 uppercase tracking-wider mb-2 block">
                VIN номер автомобиля
              </label>
              <div className="relative">
                <input
                  ref={vinInputRef}
                  id="vin-input"
                  type="text"
                  value={vin}
                  onChange={handleVinInput}
                  placeholder="Например: XTACGNE3T1VL67P3D"
                  className={`w-full h-12 px-4 pr-24 rounded-xl border text-white text-sm font-mono tracking-widest placeholder:text-dark-500 placeholder:font-sans placeholder:tracking-normal bg-dark-800 outline-none transition-all
                    ${error ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-primary-500"}`}
                  autoComplete="off"
                  spellCheck={false}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className={`text-xs font-mono transition-colors ${vin.length === 17 ? "text-emerald-400" : "text-dark-500"}`}>
                    {vin.length}/17
                  </span>
                  {vin.length >= 3 && (
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  )}
                </div>
              </div>
              <p className="text-xs text-dark-500 mt-1.5">
                Минимум 3 символа • По первым 3 буквам (WMI) определяется производитель
              </p>
            </div>

            
            <div>
              <label className="text-xs font-semibold text-dark-300 uppercase tracking-wider mb-2 block">
                Нужная запчасть <span className="text-dark-500 font-normal normal-case">(необязательно)</span>
              </label>
              <div className="relative">
                <input
                  id="part-query-input"
                  type="text"
                  value={partQuery}
                  onChange={(e) => setPartQuery(e.target.value)}
                  placeholder="Например: тормозные колодки, масляный фильтр..."
                  className="w-full h-12 px-4 rounded-xl border border-white/10 focus:border-primary-500 text-white text-sm bg-dark-800 outline-none transition-all placeholder:text-dark-500"
                />
                <Search size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500" />
              </div>
            </div>

            
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            
            <button
              type="submit"
              disabled={!vinIsValid || loading}
              id="vin-search-submit"
              className="w-full h-12 rounded-xl bg-primary-500 hover:bg-primary-400 disabled:bg-dark-700 disabled:text-dark-500 disabled:cursor-not-allowed text-dark-900 font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Поиск...</>
              ) : (
                <><Search size={18} /> Найти запчасти</>
              )}
            </button>
          </form>

          
          {searched && !loading && (
            <div className="px-6 pb-6">
              
              {foundCar && (
                <div className="mb-5 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                    <Car size={24} className="text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-emerald-400 font-bold text-base">{foundCar.full_name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        foundCar.matchType === 'exact'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {foundCar.matchType === 'exact' ? 'Точное совпадение' : `По WMI (${foundCar.wmi})`}
                      </span>
                    </div>
                    <p className="text-xs text-dark-400 font-mono">{vin.toUpperCase()}</p>
                  </div>
                </div>
              )}

              
              <div className="text-sm text-dark-400 mb-4">
                {products.length > 0 ? (
                  <>Найдено запчастей: <span className="text-white font-semibold">{products.length}</span>
                    {partQuery && <> для <span className="text-primary-400">«{partQuery}»</span></>}
                  </>
                ) : (
                  <span className="text-dark-400">Запчасти не найдены. Попробуйте другой запрос.</span>
                )}
              </div>

              
              {products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="group flex gap-3 p-3 rounded-xl bg-dark-800 border border-white/5 hover:border-primary-500/30 hover:bg-dark-700 transition-all"
                    >
                      
                      <div className="w-16 h-16 rounded-lg bg-dark-700 flex-shrink-0 overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingCart size={20} className="text-dark-500" />
                          </div>
                        )}
                      </div>

                      
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-dark-400 mb-0.5">{product.brand}</p>
                        <h3 className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors line-clamp-2 leading-tight mb-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-primary-400 font-bold text-sm">
                            {product.price.toLocaleString("ru-RU")} ₽
                          </span>
                          {product.inStock ? (
                            <span className="text-xs text-emerald-400">В наличии</span>
                          ) : (
                            <span className="text-xs text-dark-500">Под заказ</span>
                          )}
                        </div>
                      </div>

                      <ChevronRight size={14} className="text-dark-500 group-hover:text-primary-400 flex-shrink-0 self-center transition-colors" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VinSearchModal;
