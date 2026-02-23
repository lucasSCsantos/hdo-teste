FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json nx.json tsconfig.base.json ./
COPY apps/frontend ./apps/frontend

# RUN npm install
RUN npx nx build frontend

FROM nginx:alpine
COPY --from=build /app/dist/apps/frontend /usr/share/nginx/html
EXPOSE 4200