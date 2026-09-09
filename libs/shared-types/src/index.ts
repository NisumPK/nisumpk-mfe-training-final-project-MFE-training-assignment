export type Theme = 'light' | 'dark';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inventory: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface AuthSession {
  user: User | null;
  token: string | null;
  status: 'anonymous' | 'authenticated';
}

export interface Order {
  id: string;
  createdAt: string;
  status: 'processing' | 'shipped' | 'delivered';
  total: number;
  itemCount: number;
}

export interface ApiErrorShape {
  message: string;
  code?: string;
}

export interface FeatureFlags {
  orders: boolean;
  productSearch: boolean;
}

export interface NisumEventMap {
  'cart:item-added': { product: Product; quantity: number };
  'cart:item-removed': { productId: string };
  'cart:checkout-requested': { itemCount: number; total: number };
  'order:created': { order: Order };
  'notification:show': { message: string; level: 'success' | 'error' | 'info' };
  'user:login': { user: User };
  'user:logout': undefined;
}
