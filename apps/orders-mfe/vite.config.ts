import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

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
];
export default defineConfig({
  envDir: '../..',
  plugins: [
    react(),
    federation({
      name: 'orders_mfe',
      filename: 'remoteEntry.js',
      dts: false,
      exposes: { './OrdersPage': './src/OrdersPage.tsx' },
      shared,
    }),
  ],
  server: { port: 4173, strictPort: true },
  preview: { port: 4173, strictPort: true },
  build: { target: 'esnext' },
});
