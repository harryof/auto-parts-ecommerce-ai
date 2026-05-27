const express = require('express');
const router = express.Router();
const pool = require('../db/pool');


router.get('/', async (req, res) => {
  try {
    const catsResult = await pool.query(
      'SELECT id, name, description, icon FROM categories ORDER BY name'
    );
    const subsResult = await pool.query(
      'SELECT id, category_id, name, description FROM subcategories ORDER BY name'
    );

    const subcategoriesMap = {};
    for (const sub of subsResult.rows) {
      if (!subcategoriesMap[sub.category_id]) {
        subcategoriesMap[sub.category_id] = [];
      }
      subcategoriesMap[sub.category_id].push({
        id: sub.id,
        name: sub.name,
        description: sub.description,
      });
    }

    const categories = catsResult.rows.map((cat) => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      icon: cat.icon,
      subCategories: subcategoriesMap[cat.id] || [],
    }));

    res.json(categories);
  } catch (err) {
    console.error('GET /categories error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const catResult = await pool.query(
      'SELECT id, name, description, icon FROM categories WHERE id = $1',
      [id]
    );
    if (catResult.rows.length === 0) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    const cat = catResult.rows[0];

    const subsResult = await pool.query(
      'SELECT id, name, description FROM subcategories WHERE category_id = $1 ORDER BY name',
      [id]
    );
    cat.subCategories = subsResult.rows;

    res.json(cat);
  } catch (err) {
    console.error('GET /categories/:id error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
