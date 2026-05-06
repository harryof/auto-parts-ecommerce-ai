const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

/**
 * GET /api/products
 * Query params:
 *   - category (string)        фильтр по категории
 *   - subcategory (string)     фильтр по подкатегории
 *   - brand (string)           фильтр по бренду
 *   - inStock (boolean)        только в наличии
 *   - isHit (boolean)          хиты
 *   - isNew (boolean)          новинки
 *   - isRecommended (boolean)  рекомендованные
 *   - search (string)          полнотекстовый поиск по name, brand, article
 *   - minPrice (number)        мин. цена
 *   - maxPrice (number)        макс. цена
 *   - page (number, default 1)
 *   - limit (number, default 20, max 100)
 *   - sortBy (price_asc | price_desc | rating | newest)
 */
router.get('/', async (req, res) => {
  try {
    const {
      category, subcategory, brand, inStock, isHit, isNew, isRecommended,
      search, minPrice, maxPrice,
      page = 1, limit = 20,
      sortBy = 'newest',
    } = req.query;

    const conditions = [];
    const params = [];
    let pIdx = 1;

    if (category) {
      conditions.push(`p.category_id = $${pIdx++}`);
      params.push(category);
    }
    if (subcategory) {
      conditions.push(`p.subcategory_id = $${pIdx++}`);
      params.push(subcategory);
    }
    if (brand) {
      conditions.push(`LOWER(p.brand) = LOWER($${pIdx++})`);
      params.push(brand);
    }
    if (inStock === 'true') {
      conditions.push(`p.in_stock = TRUE`);
    }
    if (isHit === 'true') {
      conditions.push(`p.is_hit = TRUE`);
    }
    if (isNew === 'true') {
      conditions.push(`p.is_new = TRUE`);
    }
    if (isRecommended === 'true') {
      conditions.push(`p.is_recommended = TRUE`);
    }
    if (minPrice) {
      conditions.push(`p.price >= $${pIdx++}`);
      params.push(Number(minPrice));
    }
    if (maxPrice) {
      conditions.push(`p.price <= $${pIdx++}`);
      params.push(Number(maxPrice));
    }
    if (search) {
      conditions.push(
        `to_tsvector('russian', p.name || ' ' || COALESCE(p.brand,'') || ' ' || COALESCE(p.article,'') || ' ' || COALESCE(p.description,''))
         @@ plainto_tsquery('russian', $${pIdx++})`
      );
      params.push(search);
    }

    const where = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    // Сортировка
    const orderMap = {
      price_asc:  'p.price ASC',
      price_desc: 'p.price DESC',
      rating:     'p.rating DESC',
      newest:     'p.created_at DESC',
    };
    const orderBy = orderMap[sortBy] || 'p.created_at DESC';

    // Пагинация
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    // Запрос товаров
    const dataQuery = `
      SELECT
        p.id, p.name, p.description, p.price, p.old_price,
        p.image_url, p.brand, p.in_stock,
        p.category_id, p.subcategory_id,
        p.article, p.rating, p.review_count,
        p.is_hit, p.is_new, p.is_recommended,
        p.service_type, p.compatible_cars, p.specifications,
        p.created_at,
        c.name AS category_name,
        s.name AS subcategory_name
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN subcategories s ON s.id = p.subcategory_id
      ${where}
      ORDER BY ${orderBy}
      LIMIT $${pIdx++} OFFSET $${pIdx++}
    `;
    params.push(limitNum, offset);

    // Запрос общего количества
    const countQuery = `SELECT COUNT(*) FROM products p ${where}`;
    const countParams = params.slice(0, params.length - 2); // без limit и offset

    const [dataResult, countResult] = await Promise.all([
      pool.query(dataQuery, params),
      pool.query(countQuery, countParams),
    ]);

    const total = parseInt(countResult.rows[0].count);

    res.json({
      products: dataResult.rows.map(formatProduct),
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    console.error('GET /products error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

/**
 * GET /api/products/featured
 * Возвращает хиты и рекомендованные (не более 12).
 */
router.get('/featured', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id, p.name, p.price, p.old_price, p.image_url, p.brand,
        p.in_stock, p.category_id, p.subcategory_id,
        p.article, p.rating, p.review_count,
        p.is_hit, p.is_new, p.is_recommended
      FROM products p
      WHERE p.is_hit = TRUE OR p.is_recommended = TRUE
      ORDER BY p.rating DESC, p.review_count DESC
      LIMIT 12
    `);
    res.json(result.rows.map(formatProduct));
  } catch (err) {
    console.error('GET /products/featured error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

/**
 * GET /api/products/:id
 * Возвращает один товар по id.
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT
        p.*,
        c.name AS category_name,
        s.name AS subcategory_name
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN subcategories s ON s.id = p.subcategory_id
      WHERE p.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Товар не найден' });
    }

    res.json(formatProduct(result.rows[0]));
  } catch (err) {
    console.error('GET /products/:id error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ─── Хелпер форматирования ───────────────────────────────────
function formatProduct(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: parseFloat(row.price),
    oldPrice: row.old_price ? parseFloat(row.old_price) : null,
    image: row.image_url || null,
    brand: row.brand,
    inStock: row.in_stock,
    categoryId: row.category_id,
    categoryName: row.category_name || null,
    subCategoryId: row.subcategory_id,
    subCategoryName: row.subcategory_name || null,
    article: row.article,
    rating: parseFloat(row.rating) || 0,
    reviewCount: row.review_count || 0,
    isHit: row.is_hit,
    isNew: row.is_new,
    isRecommended: row.is_recommended,
    serviceType: row.service_type || null,
    compatibleCars: row.compatible_cars || [],
    specifications: row.specifications || {},
    createdAt: row.created_at,
  };
}

const { authMiddleware } = require('../middleware/auth');
const upload = require('../middleware/upload');

/**
 * POST /api/products
 * Создание товара (Admin)
 */
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }
    const { 
      name, description, price, oldPrice, brand, categoryId, subcategoryId, 
      article, serviceType, inStock, isHit, isNew, isRecommended 
    } = req.body;

    let imageUrl = null;
    if (req.file) {
      imageUrl = '/uploads/' + req.file.filename;
    }

    const id = req.body.id || `prod_${Date.now()}`;
    const priceNum = Number(price);
    const oldPriceNum = oldPrice ? Number(oldPrice) : null;

    const result = await pool.query(
      `INSERT INTO products (
        id, name, description, price, old_price, image_url, brand, 
        category_id, subcategory_id, article, service_type,
        in_stock, is_hit, is_new, is_recommended
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [
        id, name, description || null, priceNum, oldPriceNum, imageUrl, brand || null,
        categoryId || null, subcategoryId || null, article || null, serviceType || null,
        inStock === 'true' || inStock === true, 
        isHit === 'true' || isHit === true, 
        isNew === 'true' || isNew === true, 
        isRecommended === 'true' || isRecommended === true
      ]
    );

    res.status(201).json(formatProduct(result.rows[0]));
  } catch (err) {
    console.error('POST /products error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
