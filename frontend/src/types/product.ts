/**
 * Общий тип Product, используемый по всему фронтенду.
 * Соответствует формату API (/api/products).
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice: number | null;
  image: string | null;
  brand: string;
  inStock: boolean;
  categoryId: string;
  categoryName: string | null;
  subCategoryId: string;
  subCategoryName: string | null;
  article: string;
  rating: number;
  reviewCount: number;
  isHit: boolean;
  isNew: boolean;
  isRecommended: boolean;
  serviceType: 'maintenance' | 'repair' | null;
  compatibleCars: string[];
  specifications: Record<string, string>;
  createdAt?: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string | null;
  quantity: number;
  article: string;
}

export interface SubCategory {
  id: string;
  name: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  subCategories: SubCategory[];
}
