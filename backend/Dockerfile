# ============================================================
# Dockerfile — Backend (Node.js / Express)
# ============================================================
FROM node:20-alpine

# pg_isready нужен для entrypoint.sh
RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Даём права на выполнение entrypoint
RUN chmod +x entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["sh", "entrypoint.sh"]
