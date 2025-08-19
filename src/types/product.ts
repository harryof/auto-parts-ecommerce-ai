export interface ProductType {
  id: number | string;
  title: string;
  price: number;
  oldPrice?: number | null;
  image: string;
  images?: string[];
  description?: string;
  category?: string;
  categoryId?: string;
  subCategoryId?: string;
  brand?: string;
  article?: string;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
  isHit?: boolean;
  isNew?: boolean;
  isRecommended?: boolean;
}

export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  article: string;
}
