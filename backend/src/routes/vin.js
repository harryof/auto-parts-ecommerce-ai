const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const pool = require('../db/pool');

// Загружаем VIN-датасет один раз при старте
const VINS_PATH = path.join(__dirname, '../../vins_dataset.json');
let vinsDataset = [];
try {
  vinsDataset = JSON.parse(fs.readFileSync(VINS_PATH, 'utf8'));
  console.log(`✅ VIN dataset загружен: ${vinsDataset.length} записей`);
} catch (e) {
  console.error('⚠️  Не удалось загрузить vins_dataset.json:', e.message);
}

/**
 * Найти авто по VIN:
 * 1. Точное совпадение
 * 2. По первым 3 символам (WMI) — производитель
 */
function lookupVin(vin) {
  const upperVin = vin.trim().toUpperCase();

  // Точное совпадение
  const exact = vinsDataset.find(v => v.vin.toUpperCase() === upperVin);
  if (exact) {
    return { ...exact, matchType: 'exact' };
  }

  // По WMI (первые 3 символа)
  const wmi = upperVin.slice(0, 3);
  const byWmi = vinsDataset.find(v => v.vin.toUpperCase().startsWith(wmi));
  if (byWmi) {
    return { ...byWmi, matchType: 'wmi', wmi };
  }

  return null;
}

/**
 * GET /api/vin/lookup?vin=XTACGNE3T1VL67P3D
 * Определяет автомобиль по VIN
 */
router.get('/lookup', (req, res) => {
  const { vin } = req.query;

  if (!vin || vin.trim().length < 3) {
    return res.status(400).json({ error: 'Укажите VIN (минимум 3 символа)' });
  }

  const result = lookupVin(vin);

  if (!result) {
    return res.status(404).json({
      error: 'Автомобиль не найден в базе. Проверьте VIN номер.',
      vin: vin.trim().toUpperCase(),
    });
  }

  res.json(result);
});

/**
 * GET /api/vin/search?vin=XTACGNE3T1VL67P3D&part=тормозные+колодки
 * Ищет подходящие запчасти по VIN + название детали
 */
router.get('/search', async (req, res) => {
  const { vin, part } = req.query;

  if (!vin || vin.trim().length < 3) {
    return res.status(400).json({ error: 'Укажите VIN (минимум 3 символа)' });
  }

  // Определяем авто
  const car = lookupVin(vin);
  if (!car) {
    return res.status(404).json({
      error: 'Автомобиль не найден. Проверьте VIN номер.',
      vin: vin.trim().toUpperCase(),
    });
  }

  try {
    const params = [];
    const conditions = [];
    let pIdx = 1;

    // Фильтр по марке авто через compatible_cars (JSON array как text)
    conditions.push(`p.compatible_cars::text ILIKE $${pIdx++}`);
    params.push(`%${car.make}%`);

    // Поиск по названию запчасти (если указан)
    if (part && part.trim()) {
      conditions.push(`(
        p.name ILIKE $${pIdx} OR
        p.description ILIKE $${pIdx} OR
        to_tsvector('russian', p.name || ' ' || COALESCE(p.description,''))
          @@ plainto_tsquery('russian', $${pIdx})
      )`);
      params.push(`%${part.trim()}%`);
      pIdx++;

      // Дополнительно: точный полнотекстовый поиск по русскому языку
      // (уже встроен выше через ILIKE)
    }

    const where = 'WHERE ' + conditions.join(' AND ');

    const query = `
      SELECT
        p.id, p.name, p.description, p.price, p.old_price,
        p.image_url, p.brand, p.in_stock,
        p.category_id, p.subcategory_id,
        p.article, p.rating, p.review_count,
        p.is_hit, p.is_new, p.is_recommended,
        p.service_type, p.compatible_cars, p.specifications,
        c.name AS category_name,
        s.name AS subcategory_name
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN subcategories s ON s.id = p.subcategory_id
      ${where}
      ORDER BY p.rating DESC, p.review_count DESC
      LIMIT 40
    `;

    const result = await pool.query(query, params);

    res.json({
      car,
      part: part?.trim() || null,
      products: result.rows.map(formatProduct),
      total: result.rows.length,
    });
  } catch (err) {
    console.error('GET /vin/search error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера при поиске запчастей' });
  }
});

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
  };
}

module.exports = router;
