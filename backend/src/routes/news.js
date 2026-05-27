const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const upload = require('../middleware/upload');


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM news ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('GET /news error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM news WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Новость не найдена' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('GET /news/:id error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});


router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }
    const { title, excerpt, content, category } = req.body;
    let imageUrl = null;
    if (req.file) {
      imageUrl = '/uploads/' + req.file.filename;
    }
    
    const result = await pool.query(
      `INSERT INTO news (title, excerpt, content, image_url, category) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, excerpt, content, imageUrl, category || 'События']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /news error:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
