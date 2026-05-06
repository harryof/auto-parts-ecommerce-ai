-- ============================================================
-- Миграция 001: Инициализация базы данных магазина автозапчастей
-- ============================================================

-- Расширение для UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Категории ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id          VARCHAR(60)  PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  description TEXT,
  icon        VARCHAR(60)  NOT NULL DEFAULT 'Box',
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ─── Подкатегории ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subcategories (
  id          VARCHAR(60)  PRIMARY KEY,
  category_id VARCHAR(60)  NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name        VARCHAR(200) NOT NULL,
  description TEXT,
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ─── Товары ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id               VARCHAR(120) PRIMARY KEY,
  name             VARCHAR(300) NOT NULL,
  description      TEXT,
  price            NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  old_price        NUMERIC(12,2) CHECK (old_price >= 0),
  image_url        TEXT,
  brand            VARCHAR(150),
  in_stock         BOOLEAN      NOT NULL DEFAULT TRUE,
  category_id      VARCHAR(60)  REFERENCES categories(id) ON DELETE SET NULL,
  subcategory_id   VARCHAR(60)  REFERENCES subcategories(id) ON DELETE SET NULL,
  article          VARCHAR(120),
  rating           NUMERIC(3,1) DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  review_count     INTEGER DEFAULT 0 CHECK (review_count >= 0),
  is_hit           BOOLEAN DEFAULT FALSE,
  is_new           BOOLEAN DEFAULT FALSE,
  is_recommended   BOOLEAN DEFAULT FALSE,
  service_type     VARCHAR(20)  CHECK (service_type IN ('maintenance', 'repair')),
  compatible_cars  TEXT[],
  specifications   JSONB        DEFAULT '{}',
  created_at       TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_products_category    ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_products_brand       ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_in_stock    ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_is_hit      ON products(is_hit);
CREATE INDEX IF NOT EXISTS idx_products_is_new      ON products(is_new);
-- Полнотекстовый поиск
CREATE INDEX IF NOT EXISTS idx_products_fts ON products
  USING GIN (to_tsvector('russian', name || ' ' || COALESCE(description, '') || ' ' || COALESCE(brand, '') || ' ' || COALESCE(article, '')));

-- ─── Пользователи ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(200) NOT NULL,
  email         VARCHAR(200) NOT NULL UNIQUE,
  phone         VARCHAR(30),
  password_hash TEXT         NOT NULL,
  role          VARCHAR(20)  NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ─── Заказы ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               SERIAL       PRIMARY KEY,
  user_id          UUID         REFERENCES users(id) ON DELETE SET NULL,
  status           VARCHAR(30)  NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  total_amount     NUMERIC(12,2) NOT NULL,
  delivery_address TEXT,
  notes            TEXT,
  created_at       TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);

-- ─── Позиции заказа ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id             SERIAL       PRIMARY KEY,
  order_id       INTEGER      NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id     VARCHAR(120) REFERENCES products(id) ON DELETE SET NULL,
  product_name   VARCHAR(300) NOT NULL,  -- снимок названия на момент заказа
  quantity       INTEGER      NOT NULL CHECK (quantity > 0),
  price_at_time  NUMERIC(12,2) NOT NULL  -- цена на момент заказа
);

-- ─── Триггер обновления updated_at ──────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
