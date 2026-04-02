# --- BUILD ------------------

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# --- PRODUCTION IMAGE --------

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/views ./views

EXPOSE 3000

CMD ["node", "dist/server.js"]