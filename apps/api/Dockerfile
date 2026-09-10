FROM node:22-alpine AS build
WORKDIR /workspace
COPY package.json package-lock.json tsconfig.json ./
COPY apps ./apps
COPY libs ./libs
RUN npm ci
RUN npm run build --workspace=@nisum/api

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=4000
COPY --from=build /workspace/node_modules ./node_modules
COPY --from=build /workspace/apps/api/dist ./dist
EXPOSE 4000
CMD ["node", "dist/server.js"]
