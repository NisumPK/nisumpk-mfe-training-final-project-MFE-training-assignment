import { type TypedUseSelectorHook } from 'react-redux';
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
  preferences: {
    theme: Theme;
  };
  features: FeatureFlags;
}
export declare const actions: {
  setFeatures: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    FeatureFlags,
    'features/setFeatures'
  >;
  setTheme: import('@reduxjs/toolkit').ActionCreatorWithPayload<Theme, 'preferences/setTheme'>;
  signIn: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      user: User;
      token: string;
    },
    'auth/signIn'
  >;
  signOut: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'auth/signOut'>;
  addItem: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      product: Product;
      quantity: number;
    },
    'cart/addItem'
  >;
  removeItem: import('@reduxjs/toolkit').ActionCreatorWithPayload<string, 'cart/removeItem'>;
  updateQuantity: import('@reduxjs/toolkit').ActionCreatorWithPayload<
    {
      productId: string;
      quantity: number;
    },
    'cart/updateQuantity'
  >;
  clearCart: import('@reduxjs/toolkit').ActionCreatorWithoutPayload<'cart/clearCart'>;
  hydrateCart: import('@reduxjs/toolkit').ActionCreatorWithPayload<Cart, 'cart/hydrateCart'>;
};
export declare const store: import('@reduxjs/toolkit').EnhancedStore<
  {
    auth: AuthSession;
    cart: Cart;
    preferences: {
      theme: Theme;
    };
    features: FeatureFlags;
  },
  import('redux').UnknownAction,
  import('@reduxjs/toolkit').Tuple<
    [
      import('redux').StoreEnhancer<{
        dispatch: import('redux-thunk').ThunkDispatch<
          {
            auth: AuthSession;
            cart: Cart;
            preferences: {
              theme: Theme;
            };
            features: FeatureFlags;
          },
          undefined,
          import('redux').UnknownAction
        >;
      }>,
      import('redux').StoreEnhancer,
    ]
  >
>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export declare const useAppDispatch: () => import('redux-thunk').ThunkDispatch<
  {
    auth: AuthSession;
    cart: Cart;
    preferences: {
      theme: Theme;
    };
    features: FeatureFlags;
  },
  undefined,
  import('redux').UnknownAction
> &
  import('redux').Dispatch<import('redux').UnknownAction>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
export declare const selectCartItemCount: (state: RootState) => number;
export declare const selectCartTotal: (state: RootState) => number;
/** Hydrates and syncs cart data across browser tabs using the Storage API. */
export declare function startCartPersistence(): () => void;
export declare function cartItem(product: Product, quantity?: number): CartItem;
