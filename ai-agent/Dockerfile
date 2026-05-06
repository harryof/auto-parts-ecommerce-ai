# ============================================================
# Dockerfile — AI Agent
# ВАЖНО: build context должен быть корень проекта (CourseProject/)
# чтобы скопировать backend/vins_dataset.json
# ============================================================
FROM node:20-alpine

WORKDIR /app

# Копируем зависимости ai-agent
COPY ai-agent/package*.json ./
RUN npm ci --omit=dev

# Копируем исходный код ai-agent
COPY ai-agent/ .

# Копируем VIN датасет из backend (нужен для поиска по VIN)
# В контейнере будет лежать по пути /app/vins_dataset.json
COPY backend/vins_dataset.json ./vins_dataset.json

EXPOSE 5001

CMD ["node", "src/server.js"]
