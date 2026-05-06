-- ============================================================
-- Миграция 002: Добавление профиля лояльности и новостей
-- ============================================================

-- Добавление новых полей в users
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS loyalty_status VARCHAR(20) DEFAULT 'bronze' CHECK (loyalty_status IN ('bronze', 'silver', 'gold', 'platinum'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS loyalty_discount NUMERIC(4,2) DEFAULT 2.00;

-- ─── Новости ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS news (
  id          SERIAL       PRIMARY KEY,
  title       VARCHAR(300) NOT NULL,
  excerpt     TEXT,
  content     TEXT,
  image_url   TEXT,
  category    VARCHAR(100) DEFAULT 'События',
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- Индекс для новостей
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);

-- Триггер обновления updated_at для новостей
CREATE OR REPLACE TRIGGER trg_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
