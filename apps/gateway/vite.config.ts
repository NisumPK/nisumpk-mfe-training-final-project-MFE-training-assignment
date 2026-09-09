import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const shared = [
  'react',
  'react-dom',
  'react-redux',
  '@reduxjs/toolkit',
  '@nisum/state',
  '@nisum/events',
  '@nisum/shared-ui',
  '@nisum/shared-types',
  '@nisum/api-client',
  'react-router-dom',
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../..', '');
  return {
    envDir: '../..',
    plugins: [
      react(),
      federation({
        name: 'gateway',
        dts: false,
        remotes: {
          products_mfe: {
            type: 'module',
            name: 'products_mfe',
            entry: env.VITE_PRODUCTS_REMOTE_URL,
          },
          cart_mfe: { type: 'module', name: 'cart_mfe', entry: env.VITE_CART_REMOTE_URL },
          orders_mfe: { type: 'module', name: 'orders_mfe', entry: env.VITE_ORDERS_REMOTE_URL },
        },
        shared,
      }),
    ],
    server: { port: 4170, strictPort: true },
    preview: { port: 4170, strictPort: true },
    build: { target: 'esnext' },
  };
});
