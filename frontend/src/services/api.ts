/**
 * Сервис для работы с Backend API.
 * Базовый URL: /api (проксируется Vite на http://localhost:5000)
 *
 * Использование:
 *   import api from '../services/api';
 *   const products = await api.getProducts({ category: 'spare-parts' });
 */

const BASE_URL = '/api';

// ─── Хелпер запросов ─────────────────────────────────────────
async function request(path: string, options: RequestInit = {}): Promise<any> {
  const token = localStorage.getItem('token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }

  return data;
}

// ─────────────────────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────────────────────

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  inStock?: boolean;
  isHit?: boolean;
  isNew?: boolean;
  isRecommended?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

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
  createdAt: string;
}

/** Получить список товаров с фильтрами */
async function getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      params.set(key, String(val));
    }
  });
  const qs = params.toString();
  return request(`/products${qs ? '?' + qs : ''}`);
}

/** Получить один товар по ID */
async function getProduct(id: string): Promise<Product> {
  return request(`/products/${id}`);
}

/** Получить хиты и рекомендованные товары (до 12) */
async function getFeaturedProducts(): Promise<Product[]> {
  return request('/products/featured');
}

// ─────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────

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

/** Получить все категории с подкатегориями */
async function getCategories(): Promise<Category[]> {
  return request('/categories');
}

/** Получить одну категорию */
async function getCategory(id: string): Promise<Category> {
  return request(`/categories/${id}`);
}

// ─────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: 'customer' | 'admin';
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

/** Регистрация нового пользователя */
async function register(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<AuthResponse> {
  const result = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (result.token) {
    localStorage.setItem('token', result.token);
    localStorage.setItem('currentUser', JSON.stringify(result.user));
  }
  return result;
}

/** Вход в аккаунт */
async function login(email: string, password: string): Promise<AuthResponse> {
  const result = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (result.token) {
    localStorage.setItem('token', result.token);
    localStorage.setItem('currentUser', JSON.stringify(result.user));
  }
  return result;
}

/** Выход из аккаунта */
function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
}

/** Получить профиль текущего пользователя */
async function getMe(): Promise<User> {
  return request('/auth/me');
}

/** Обновить профиль */
async function updateMe(data: { name?: string; phone?: string }): Promise<User> {
  return request('/auth/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/** Проверить, авторизован ли пользователь (локально) */
function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

/** Получить текущего пользователя из localStorage */
function getCurrentUser(): User | null {
  const raw = localStorage.getItem('currentUser');
  return raw ? JSON.parse(raw) : null;
}

// ─────────────────────────────────────────────────────────────
// ORDERS
// ─────────────────────────────────────────────────────────────

export interface OrderItem {
  id: number;
  productId: string;
  productName: string;
  quantity: number;
  priceAtTime: number;
}

export interface Order {
  id: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  deliveryAddress: string | null;
  notes: string | null;
  createdAt: string;
  items: OrderItem[];
}

/** Получить заказы текущего пользователя */
async function getOrders(): Promise<Order[]> {
  return request('/orders');
}

/** Создать заказ */
async function createOrder(data: {
  items: { productId: string; quantity: number }[];
  deliveryAddress?: string;
  notes?: string;
}): Promise<{ message: string; order: Order }> {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ─────────────────────────────────────────────────────────────
// AI CHAT
// ─────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/** Отправка сообщения в AI Ассистент */
async function sendChatMessage(message: string, history: ChatMessage[] = []): Promise<ChatMessage> {
  // /api/chat проксируется:
  //   локально — через Vite proxy → localhost:5000 (backend не обрабатывает, нужна отдельная nginx-логика)
  //   в Docker  — Nginx проксирует /api/chat → ai-agent:5001/api/chat
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, history }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return data;
}

// ─────────────────────────────────────────────────────────────
// VIN SEARCH
// ─────────────────────────────────────────────────────────────

export interface VinCar {
  vin: string;
  make: string;
  model: string;
  year: number;
  full_name: string;
  matchType: 'exact' | 'wmi';
  wmi?: string;
}

export interface VinSearchResponse {
  car: VinCar;
  part: string | null;
  products: Product[];
  total: number;
}

/** Найти автомобиль по VIN */
async function vinLookup(vin: string): Promise<VinCar> {
  return request(`/vin/lookup?vin=${encodeURIComponent(vin)}`);
}

/** Найти запчасти по VIN и названию детали */
async function searchByVin(vin: string, part: string): Promise<VinSearchResponse> {
  const params = new URLSearchParams({ vin });
  if (part) params.set('part', part);
  return request(`/vin/search?${params.toString()}`);
}

// ─────────────────────────────────────────────────────────────
// Экспорт
// ─────────────────────────────────────────────────────────────
const api = {
  // Products
  getProducts,
  getProduct,
  getFeaturedProducts,
  // Categories
  getCategories,
  getCategory,
  // Auth
  register,
  login,
  logout,
  getMe,
  updateMe,
  isAuthenticated,
  getCurrentUser,
  // Orders
  getOrders,
  createOrder,
  // AI
  sendChatMessage,
  // VIN
  vinLookup,
  searchByVin,
};

export default api;
