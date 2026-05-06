# Backend — Магазин автозапчастей

REST API на Node.js + Express + PostgreSQL.

---

## 📋 Структура файлов

```
backend/
├── src/
│   ├── index.js                    # Точка входа, Express-сервер
│   ├── db/
│   │   ├── pool.js                 # Подключение к PostgreSQL
│   │   ├── migrate.js              # Скрипт запуска миграций
│   │   ├── seed.js                 # Скрипт заполнения тестовыми данными
│   │   └── migrations/
│   │       └── 001_init.sql        # SQL-схема базы данных
│   ├── routes/
│   │   ├── products.js             # GET /api/products, /api/products/:id
│   │   ├── categories.js           # GET /api/categories
│   │   ├── auth.js                 # POST /api/auth/register, /login
│   │   └── orders.js               # GET/POST /api/orders
│   └── middleware/
│       └── auth.js                 # JWT-проверка
├── .env.example                    # Шаблон переменных окружения
├── .env                            # Твой файл конфигурации (не в git!)
└── package.json
```

---

## 🚀 Установка и запуск

### 1. Установить PostgreSQL

1. Скачай PostgreSQL с [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
2. В процессе установки задай пароль для пользователя `postgres` — **запомни его**
3. После установки в меню «Пуск» появится **pgAdmin** — это графический инструмент управления БД

### 2. Создать базу данных

**Вариант A — через pgAdmin (рекомендуется для начала):**
1. Открой pgAdmin → Servers → PostgreSQL → правой кнопкой на «Databases» → «Create» → «Database»
2. Имя базы: `autoparts`
3. Нажми «Save»

**Вариант B — через командную строку:**
```powershell
# Открой PowerShell и выполни:
psql -U postgres -c "CREATE DATABASE autoparts;"
```

### 3. Настроить переменные окружения

```powershell
# В папке backend/ скопируй шаблон:
copy .env.example .env
```

Открой файл `.env` и заполни:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=autoparts
DB_USER=postgres
DB_PASSWORD=твой_пароль_от_postgresql

JWT_SECRET=придумай_любую_длинную_строку_минимум_32_символа
JWT_EXPIRES_IN=7d

PORT=5000
NODE_ENV=development
```

### 4. Установить зависимости

```powershell
cd C:\Diploma\CourseProject\backend
npm install
```

### 5. Создать таблицы и заполнить данными

```powershell
# Создаёт все таблицы в БД:
npm run migrate

# Заполняет БД начальными данными (по 1 образцу в каждой подкатегории):
npm run seed

# Или обе команды сразу:
npm run setup
```

### 6. Запустить сервер

```powershell
# Режим разработки (перезапуск при изменениях):
npm run dev

# Или обычный запуск:
npm start
```

Сервер запустится на `http://localhost:5000`.  
Проверь: `http://localhost:5000/api/health`

---

## 📡 API Эндпоинты

### Товары
| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/products` | Список товаров (с фильтрами) |
| GET | `/api/products/featured` | Хиты + рекомендуемые (до 12) |
| GET | `/api/products/:id` | Один товар |

**Параметры фильтрации `/api/products`:**

| Параметр | Тип | Пример |
|----------|-----|--------|
| `category` | string | `?category=spare-parts` |
| `subcategory` | string | `?subcategory=engine-parts` |
| `brand` | string | `?brand=Bosch` |
| `inStock` | boolean | `?inStock=true` |
| `isHit` | boolean | `?isHit=true` |
| `isNew` | boolean | `?isNew=true` |
| `search` | string | `?search=фильтр` |
| `minPrice` | number | `?minPrice=1000` |
| `maxPrice` | number | `?maxPrice=50000` |
| `page` | number | `?page=2` |
| `limit` | number | `?limit=20` |
| `sortBy` | string | `?sortBy=price_asc` \| `price_desc` \| `rating` \| `newest` |

### Категории
| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/categories` | Все категории с подкатегориями |
| GET | `/api/categories/:id` | Одна категория |

### Аутентификация
| Метод | URL | Описание |
|-------|-----|----------|
| POST | `/api/auth/register` | Регистрация |
| POST | `/api/auth/login` | Вход, получение JWT |
| GET | `/api/auth/me` | Профиль (требует токен) |
| PUT | `/api/auth/me` | Обновить профиль |

### Заказы (требуют авторизации)
| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/orders` | Мои заказы |
| GET | `/api/orders/:id` | Один заказ |
| POST | `/api/orders` | Создать заказ |

---

## 🗄️ Управление базой данных

### Добавить товар вручную (SQL)

В pgAdmin открой «Query Tool» для базы `autoparts` и выполни:

```sql
INSERT INTO products (
  id, name, description, price, old_price,
  image_url, brand, in_stock,
  category_id, subcategory_id,
  article, rating, review_count,
  is_hit, is_new, is_recommended,
  compatible_cars, specifications
)
VALUES (
  'bosch-air-filter-001',             -- уникальный ID (латиница, дефисы)
  'Фильтр воздушный Bosch S0001',     -- название
  'Описание товара...',               -- описание
  850,                                -- цена (руб)
  1000,                               -- старая цена (или NULL)
  NULL,                               -- URL картинки (или NULL пока нет)
  'Bosch',                            -- бренд
  TRUE,                               -- в наличии
  'filters',                          -- ID категории
  'air-filter',                       -- ID подкатегории
  '1457433063',                       -- артикул
  4.7,                                -- рейтинг (0-5)
  42,                                 -- количество отзывов
  FALSE,                              -- хит
  TRUE,                               -- новинка
  FALSE,                              -- рекомендованный
  ARRAY['VW Golf 5', 'Audi A4 B7'],  -- совместимые авто (или '{}'::text[])
  '{
    "Артикул": "1457433063",
    "Тип": "Бумажный",
    "Диаметр": "60 мм"
  }'::jsonb                           -- характеристики
);
```

### Обновить товар

```sql
UPDATE products
SET price = 900, in_stock = TRUE, is_hit = TRUE
WHERE id = 'bosch-air-filter-001';
```

### Удалить товар

```sql
DELETE FROM products WHERE id = 'bosch-air-filter-001';
```

### Удалить образцы и добавить реальные

```sql
-- Удалить все товары-образцы (они начинаются с 'sample-')
DELETE FROM products WHERE id LIKE 'sample-%';

-- После этого добавляй реальные товары через INSERT выше
```

### Посмотреть все ID категорий и подкатегорий

```sql
-- Категории:
SELECT id, name FROM categories ORDER BY name;

-- Подкатегории (с привязкой к категории):
SELECT s.id, s.name, c.name AS category
FROM subcategories s
JOIN categories c ON c.id = s.category_id
ORDER BY c.name, s.name;
```

### Добавить изображение товара

Сейчас поле `image_url` хранит URL картинки. Варианты:
1. **Внешняя ссылка:** `https://example.com/images/product.jpg`
2. **Локальный файл:** положи картинку в `frontend/public/images/` → укажи `/images/product.jpg`

```sql
UPDATE products SET image_url = '/images/bosch-air-filter.jpg' WHERE id = 'bosch-air-filter-001';
```

---

## 🔍 Проверка API через PowerShell

```powershell
# Получить все категории
Invoke-RestMethod http://localhost:5000/api/categories | ConvertTo-Json -Depth 3

# Получить товары из категории "Фильтры"
Invoke-RestMethod "http://localhost:5000/api/products?category=filters"

# Поиск
Invoke-RestMethod "http://localhost:5000/api/products?search=фильтр"

# Регистрация
Invoke-RestMethod -Method POST `
  -Uri http://localhost:5000/api/auth/register `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"name":"Иван","email":"ivan@mail.ru","phone":"79001234567","password":"123456"}'

# Вход
Invoke-RestMethod -Method POST `
  -Uri http://localhost:5000/api/auth/login `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"email":"ivan@mail.ru","password":"123456"}'
```

---

## ⚡ Запуск фронтенда вместе с бэкендом

Открой **два терминала**:

**Терминал 1 — Backend:**
```powershell
cd C:\Diploma\CourseProject\backend
npm run dev
```

**Терминал 2 — Frontend:**
```powershell
cd C:\Diploma\CourseProject\frontend
npm run dev
```

Фронтенд: `http://localhost:5173`  
Бэкенд:   `http://localhost:5000`

> Vite автоматически проксирует все запросы `/api/*` на бэкенд — CORS не нужен.

---

## 🛠️ Инструменты для работы с БД

| Инструмент | Скачать | Описание |
|-----------|---------|----------|
| **pgAdmin** | Устанавливается вместе с PostgreSQL | Официальный GUI для PostgreSQL |
| **DBeaver** | [dbeaver.io](https://dbeaver.io) | Бесплатный. Поддерживает все БД. Рекомендуется |
| **TablePlus** | [tableplus.com](https://tableplus.com) | Платный, но есть бесплатная версия |

### Подключение в DBeaver / pgAdmin

- Host: `localhost`
- Port: `5432`
- Database: `autoparts`
- Username: `postgres`
- Password: *твой пароль*
