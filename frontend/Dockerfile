# ============================================================
# Dockerfile — Frontend (React/Vite → Nginx)
# Многоступенчатая сборка: build stage + nginx stage
# ============================================================

# ── Stage 1: сборка React-приложения ──────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: раздача статики через Nginx ──────────────────
FROM nginx:1.25-alpine

# Копируем собранные файлы в папку Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем кастомный конфиг Nginx (proxy к backend и ai-agent)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
