import type { CartItem, FeatureFlags, Order, Product, User } from '@nisum/shared-types';
export declare class ApiError extends Error {
  status: number;
  constructor(message: string, status?: number);
}
export declare const api: {
  products: () => Promise<Product[]>;
  features: () => Promise<FeatureFlags>;
  login: (email: string) => Promise<{
    user: User;
    token: string;
  }>;
  orders: (token: string) => Promise<Order[]>;
  checkout: (token: string, items: CartItem[]) => Promise<Order>;
};
