import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  X,
  CheckSquare,
} from "lucide-react";
import { ProductType } from "../types/product";
import { categories } from "../data/categories";
import { products } from "../data/products";
import ProductGrid from "../components/catalog/ProductGrid";

const CatalogPage: React.FC = () => {
  const { categoryId, subCategoryId } = useParams<{
    categoryId: string;
    subCategoryId: string;
  }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000000,
  });
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [searchQuery, setSearchQuery] = useState("");

  const currentCategory = categoryId
    ? categories.find((cat) => cat.id === categoryId)
    : null;

  const currentSubCategory = subCategoryId
    ? currentCategory?.subCategories.find(
        (subCat) => subCat.id === subCategoryId
      )
    : null;

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubCategories = currentCategory?.subCategories.filter(
    (subCat) =>
      subCat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subCat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !categoryId || product.categoryId === categoryId;
    const matchesSubCategory =
      !subCategoryId || product.subCategoryId === subCategoryId;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      product.price >= priceRange.min && product.price <= priceRange.max;
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    return (
      matchesCategory &&
      matchesSubCategory &&
      matchesSearch &&
      matchesPrice &&
      matchesBrand
    );
  });

  const uniqueBrands = Array.from(
    new Set(
      products
        .filter(
          (product) =>
            (!categoryId || product.categoryId === categoryId) &&
            (!subCategoryId || product.subCategoryId === subCategoryId)
        )
        .map((product) => product.brand)
    )
  );

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {currentSubCategory
            ? currentSubCategory.name
            : currentCategory
            ? currentCategory.name
            : "Каталог"}
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск по каталогу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {currentCategory && !currentSubCategory && (
        <div className="mb-8">
          <Link
            to="/catalog"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Назад к категориям
          </Link>
        </div>
      )}

      {currentSubCategory && (
        <div className="mb-8">
          <Link
            to={`/catalog/${currentCategory?.id}`}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Назад к подкатегориям
          </Link>
        </div>
      )}

      {currentSubCategory ? (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-lg mb-4">Фильтры</h2>

            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Цена, ₽</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      min: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="От"
                />
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="До"
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Бренд</h3>
              <div className="space-y-2">
                {uniqueBrands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(
                            selectedBrands.filter((b) => b !== brand)
                          );
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      ) : currentCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubCategories?.map((subCategory) => (
            <div
              key={subCategory.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={subCategory.image}
                alt={subCategory.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {subCategory.name}
                </h2>
                <p className="text-gray-600 mb-4">{subCategory.description}</p>
                <Link
                  to={`/catalog/${currentCategory.id}/${subCategory.id}`}
                  className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Перейти
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Link
                  to={`/catalog/${category.id}`}
                  className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Перейти
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
