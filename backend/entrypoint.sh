#!/bin/sh
# entrypoint.sh — ждём PostgreSQL, запускаем миграции, seed, затем сервер

set -e

echo "⏳ Ожидаем PostgreSQL на ${DB_HOST}:${DB_PORT}..."

until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" 2>/dev/null; do
  echo "   PostgreSQL недоступен — ждём 2 секунды..."
  sleep 2
done

echo "✅ PostgreSQL готов!"

echo "🔄 Запускаем миграции..."
node src/db/migrate.js

echo "🌱 Запускаем seed (если таблицы пустые)..."
node src/db/seed_full.js || echo "ℹ️  Seed пропущен (данные уже есть или ошибка)"

echo "🚀 Запускаем сервер..."
exec node src/index.js
