FROM node:22-alpine AS build
WORKDIR /workspace
COPY package.json package-lock.json tsconfig.json vite.config.ts .env.production ./
COPY apps ./apps
COPY libs ./libs
RUN npm ci
ARG VITE_API_URL=http://localhost:4000/api
ARG VITE_PRODUCTS_REMOTE_URL=http://localhost:4171/remoteEntry.js
ARG VITE_CART_REMOTE_URL=http://localhost:4172/remoteEntry.js
ARG VITE_ORDERS_REMOTE_URL=http://localhost:4173/remoteEntry.js
ARG VITE_ENABLE_ORDERS=true
ENV VITE_API_URL=$VITE_API_URL VITE_PRODUCTS_REMOTE_URL=$VITE_PRODUCTS_REMOTE_URL VITE_CART_REMOTE_URL=$VITE_CART_REMOTE_URL VITE_ORDERS_REMOTE_URL=$VITE_ORDERS_REMOTE_URL VITE_ENABLE_ORDERS=$VITE_ENABLE_ORDERS
RUN npm run build --workspace=@nisum/gateway

FROM nginx:1.27-alpine
COPY infra/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/apps/gateway/dist /usr/share/nginx/html
EXPOSE 80
