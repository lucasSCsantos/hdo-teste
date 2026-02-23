FROM node:20-alpine

WORKDIR /app

# copia configs do NX
COPY package*.json nx.json tsconfig.base.json ./

# copia só o app
COPY apps/backend ./apps/backend

# RUN npm install

RUN npx nx build backend

EXPOSE 3333

CMD ["node", "dist/apps/backend/main.js"]