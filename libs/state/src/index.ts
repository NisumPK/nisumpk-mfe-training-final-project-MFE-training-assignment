import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type {
  AuthSession,
  Cart,
  CartItem,
  FeatureFlags,
  Product,
  Theme,
  User,
} from '@nisum/shared-types';

export interface AppState {
  auth: AuthSession;
  cart: Cart;
  preferences: { theme: Theme };
  features: FeatureFlags;
}

const initialCart: Cart = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {
    addItem(state, action: PayloadAction<{ product: Product; quantity: number }>) {
      const current = state.items.find((item) => item.product.id === action.payload.product.id);
      if (current) current.quantity += action.payload.quantity;
      else
        state.items.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const item = state.items.find((entry) => entry.product.id === action.payload.productId);
      if (!item) return;
      if (action.payload.quantity <= 0) state.items = state.items.filter((entry) => entry !== item);
      else item.quantity = action.payload.quantity;
    },
    clearCart: () => initialCart,
    hydrateCart: (_state, action: PayloadAction<Cart>) => action.payload,
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, status: 'anonymous' } as AuthSession,
  reducers: {
    signIn: (_state, action: PayloadAction<{ user: User; token: string }>) => ({
      ...action.payload,
      status: 'authenticated' as const,
    }),
    signOut: () => ({ user: null, token: null, status: 'anonymous' as const }),
  },
});

const preferenceSlice = createSlice({
  name: 'preferences',
  initialState: { theme: 'light' } as { theme: Theme },
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

const featureSlice = createSlice({
  name: 'features',
  initialState: { orders: true, productSearch: true } as FeatureFlags,
  reducers: {
    setFeatures: (_state, action: PayloadAction<FeatureFlags>) => action.payload,
  },
});

export const actions = {
  ...cartSlice.actions,
  ...authSlice.actions,
  ...preferenceSlice.actions,
  ...featureSlice.actions,
};

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    preferences: preferenceSlice.reducer,
    features: featureSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

const CART_STORAGE_KEY = 'nisum:commerce:cart:v1';

/** Hydrates and syncs cart data across browser tabs using the Storage API. */
export function startCartPersistence() {
  if (typeof window === 'undefined') return () => undefined;
  const saved = window.localStorage.getItem(CART_STORAGE_KEY);
  if (saved) {
    try {
      store.dispatch(actions.hydrateCart(JSON.parse(saved) as Cart));
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  }
  const unsubscribe = store.subscribe(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(store.getState().cart));
  });
  const receiveExternalCart = (event: StorageEvent) => {
    if (event.key !== CART_STORAGE_KEY || !event.newValue) return;
    try {
      store.dispatch(actions.hydrateCart(JSON.parse(event.newValue) as Cart));
    } catch {
      /* Invalid third-party storage data is intentionally ignored. */
    }
  };
  window.addEventListener('storage', receiveExternalCart);
  return () => {
    unsubscribe();
    window.removeEventListener('storage', receiveExternalCart);
  };
}

export function cartItem(product: Product, quantity = 1): CartItem {
  return { product, quantity };
}
