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
];

export default defineConfig({
  envDir: '../..',
  plugins: [
    react(),
    federation({
      name: 'products_mfe',
      filename: 'remoteEntry.js',
      dts: false,
      exposes: { './ProductsPage': './src/ProductsPage.tsx' },
      shared,
    }),
  ],
  server: { port: 4171, strictPort: true },
  preview: { port: 4171, strictPort: true },
  build: { target: 'esnext' },
});
