FROM node:22-alpine AS build
WORKDIR /workspace
COPY package.json package-lock.json tsconfig.json vite.config.ts .env.production ./
COPY apps ./apps
COPY libs ./libs
RUN npm ci
ARG VITE_API_URL=http://localhost:4000/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build --workspace=@nisum/products-mfe

FROM nginx:1.27-alpine
COPY infra/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/apps/products-mfe/dist /usr/share/nginx/html
EXPOSE 80
