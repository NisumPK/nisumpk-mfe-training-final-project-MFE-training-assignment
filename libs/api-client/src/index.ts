import type {
  ApiErrorShape,
  CartItem,
  FeatureFlags,
  Order,
  Product,
  User,
} from '@nisum/shared-types';

const apiUrl = () => import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

export class ApiError extends Error {
  constructor(
    message: string,
    public status = 0,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${apiUrl()}${path}`, {
      headers: { 'Content-Type': 'application/json', ...init?.headers },
      ...init,
    });
  } catch {
    throw new ApiError('The service is unavailable. Check that the API is running.');
  }
  if (!response.ok) {
    const body = (await response
      .json()
      .catch(() => ({ message: response.statusText }))) as ApiErrorShape;
    throw new ApiError(body.message || 'The request failed.', response.status);
  }
  return response.json() as Promise<T>;
}

export const api = {
  products: () => request<Product[]>('/products'),
  features: () => request<FeatureFlags>('/config'),
  login: (email: string) =>
    request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  orders: (token: string) =>
    request<Order[]>('/orders', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  checkout: (token: string, items: CartItem[]) =>
    request<Order>('/orders', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ items }),
    }),
};
