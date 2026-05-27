

const BASE_URL = '/api';


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


async function getProduct(id: string): Promise<Product> {
  return request(`/products/${id}`);
}


async function getFeaturedProducts(): Promise<Product[]> {
  return request('/products/featured');
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


async function getCategories(): Promise<Category[]> {
  return request('/categories');
}


async function getCategory(id: string): Promise<Category> {
  return request(`/categories/${id}`);
}


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


function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
}


async function getMe(): Promise<User> {
  return request('/auth/me');
}


async function updateMe(data: { name?: string; phone?: string }): Promise<User> {
  return request('/auth/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}


function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}


function getCurrentUser(): User | null {
  const raw = localStorage.getItem('currentUser');
  return raw ? JSON.parse(raw) : null;
}


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


async function getOrders(): Promise<Order[]> {
  return request('/orders');
}


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


export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}


async function sendChatMessage(message: string, history: ChatMessage[] = []): Promise<ChatMessage> {
  
  
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


async function vinLookup(vin: string): Promise<VinCar> {
  return request(`/vin/lookup?vin=${encodeURIComponent(vin)}`);
}


async function searchByVin(vin: string, part: string): Promise<VinSearchResponse> {
  const params = new URLSearchParams({ vin });
  if (part) params.set('part', part);
  return request(`/vin/search?${params.toString()}`);
}


const api = {
  
  getProducts,
  getProduct,
  getFeaturedProducts,
  
  getCategories,
  getCategory,
  
  register,
  login,
  logout,
  getMe,
  updateMe,
  isAuthenticated,
  getCurrentUser,
  
  getOrders,
  createOrder,
  
  sendChatMessage,
  
  vinLookup,
  searchByVin,
};

export default api;
