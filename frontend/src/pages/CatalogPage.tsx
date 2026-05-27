import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Filter, Search, LayoutGrid, List } from "lucide-react";
import { useCategories } from "../context/CategoriesContext";
import api from "../services/api";
import { Product } from "../types/product";
import ProductGrid from "../components/catalog/ProductGrid";
import CategorySidebar from "../components/catalog/CategorySidebar";
import ServiceTypeSelector from "../components/catalog/ServiceTypeSelector";
import FilterPanel, { FiltersState } from "../components/catalog/FilterPanel";
import VinSearchModal from "../components/catalog/VinSearchModal";

const DEFAULT_FILTERS: FiltersState = {
  priceMin: 0,
  priceMax: 1000000,
  brands: [],
  colors: [],
  inStockOnly: false,
};

const CatalogPage: React.FC = () => {
  const { categoryId, subCategoryId } = useParams<{ categoryId: string; subCategoryId: string }>();
  const { categories } = useCategories();


  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isVinOpen, setIsVinOpen] = useState(false);

  
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);

  const currentCategory = categoryId ? categories.find((c) => c.id === categoryId) : null;
  const currentSubCategory = subCategoryId
    ? currentCategory?.subCategories.find((s) => s.id === subCategoryId)
    : null;

  const isProductView = true;

  
  const fetchProducts = useCallback(() => {
    if (!isProductView) return;
    setLoadingProducts(true);

    const apiFilters: Record<string, any> = {
      category: categoryId,
      subcategory: subCategoryId,
      limit: 40,
    };
    if (searchQuery)          apiFilters.search    = searchQuery;
    if (filters.inStockOnly)  apiFilters.inStock   = true;
    if (filters.brands.length === 1) apiFilters.brand = filters.brands[0];
    if (filters.priceMin > 0) apiFilters.minPrice  = filters.priceMin;
    if (filters.priceMax < 1000000) apiFilters.maxPrice = filters.priceMax;


    api.getProducts(apiFilters)
      .then((res) => {
        let filtered = res.products;
        
        if (filters.brands.length > 1) {
          filtered = filtered.filter((p) => filters.brands.includes(p.brand));
        }
        setProducts(filtered);
        setTotalProducts(res.pagination.total);
        
        const brands = Array.from(new Set(res.products.map((p) => p.brand).filter(Boolean)));
        setAvailableBrands(brands);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoadingProducts(false));
  }, [isProductView, categoryId, subCategoryId, searchQuery, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  
  useEffect(() => {
    if (!isProductView) {
      setProducts([]);
      setAvailableBrands([]);
    }
  }, [isProductView]);

  
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredSubCategories = currentCategory?.subCategories.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className="max-w-[1600px] mx-auto px-4 py-8">

      
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-dark-400 mb-5 overflow-x-auto no-scrollbar whitespace-nowrap">
        <Link to="/" className="hover:text-white transition-colors">Главная</Link>
        <ChevronRight size={14} className="text-dark-500 flex-shrink-0" />
        <Link to="/catalog" className={`hover:text-white transition-colors ${!categoryId ? "text-white font-medium" : ""}`}>Каталог</Link>

        {currentCategory && (
          <>
            <ChevronRight size={14} className="text-dark-500 flex-shrink-0" />
            <Link
              to={`/catalog/${currentCategory.id}`}
              className={`hover:text-white transition-colors ${!subCategoryId ? "text-white font-medium" : ""}`}
            >
              {currentCategory.name}
            </Link>
          </>
        )}
        {currentSubCategory && (
          <>
            <ChevronRight size={14} className="text-dark-500 flex-shrink-0" />
            <span className="text-white font-medium">{currentSubCategory.name}</span>
          </>
        )}
      </nav>

      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="text-center md:text-left">
          <h1 className="section-title text-left">
            {currentSubCategory
              ? <span>{currentSubCategory.name}</span>
              : currentCategory
              ? <span>{currentCategory.name}</span>
              : <span>КАТАЛОГ</span>}
          </h1>
          <div className="accent-line mt-2 mb-4" />
          {(currentSubCategory?.description || currentCategory?.description) && (
            <p className="text-sm text-dark-400 mt-1 max-w-xl">
              {currentSubCategory?.description ?? currentCategory?.description}
            </p>
          )}
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Поиск по каталогу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-search pr-10 h-10 py-0"
          />
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400" />
        </div>
      </div>

      
      {!currentSubCategory && (
        <ServiceTypeSelector onVinSearch={() => setIsVinOpen(true)} />
      )}

      
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

        <CategorySidebar />

        <div className="flex-1 w-full min-w-0">

          
          {isProductView && (
            <>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden w-full flex items-center justify-center gap-2 py-3 mb-4 rounded-xl bg-dark-800 border border-white/5 text-sm font-semibold text-white"
              >
                <Filter size={16} />
                {isFilterOpen ? "Скрыть фильтры" : "Показать фильтры"}
              </button>

              <div className="flex flex-col xl:flex-row gap-6 items-start">
                <div className={`w-full xl:w-60 flex-shrink-0 ${isFilterOpen ? "block" : "hidden lg:block xl:block"}`}>
                  <FilterPanel
                    filters={filters}
                    onChange={setFilters}
                    availableBrands={availableBrands}
                    availableColors={[]}
                  />
                </div>

                <div className="flex-1 w-full min-w-0">
                  <div className="text-sm text-dark-400 mb-4">
                    Найдено товаров: <span className="text-white font-semibold">{totalProducts}</span>
                  </div>
                  <ProductGrid products={products} loading={loadingProducts} />
                </div>
              </div>
            </>
          )}

          
          {!currentSubCategory && currentCategory && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {filteredSubCategories?.map((sub) => (
                <Link
                  key={sub.id}
                  to={`/catalog/${currentCategory.id}/${sub.id}`}
                  className="group flex items-center gap-4 p-4 glass rounded-2xl border border-white/5 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                    <LayoutGrid size={18} className="text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors leading-tight mb-0.5">
                      {sub.name}
                    </h2>
                    <p className="text-xs text-dark-400 line-clamp-1">{sub.description}</p>
                  </div>
                  <ChevronRight size={14} className="text-dark-500 group-hover:text-primary-400 flex-shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          )}

          
          {!currentCategory && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {filteredCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/catalog/${cat.id}`}
                  className="group flex items-center gap-4 p-4 glass rounded-2xl border border-white/5 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                    <List size={18} className="text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors leading-tight mb-0.5">
                      {cat.name}
                    </h2>
                    <p className="text-xs text-dark-400 line-clamp-1">{cat.description}</p>
                  </div>
                  <ChevronRight size={14} className="text-dark-500 group-hover:text-primary-400 flex-shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    
    <VinSearchModal isOpen={isVinOpen} onClose={() => setIsVinOpen(false)} />
  </>
  );
};

export default CatalogPage;
