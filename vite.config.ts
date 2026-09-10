import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'products_mfe/ProductsPage': '/test/remotes/ProductsPage.tsx',
      'cart_mfe/CartPage': '/test/remotes/CartPage.tsx',
      'cart_mfe/CartPanel': '/test/remotes/CartPanel.tsx',
      'orders_mfe/OrdersPage': '/test/remotes/OrdersPage.tsx',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
