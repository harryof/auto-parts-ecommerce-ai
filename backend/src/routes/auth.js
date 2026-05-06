const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const pool = require('../db/pool');
const { authMiddleware } = require('../middleware/auth');

/**
 * POST /api/auth/register
 */
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Имя обязательно'),
    body('email').isEmail().withMessage('Некорректный email').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Пароль минимум 6 символов'),
    body('phone').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;
    try {
      // Проверка существующего пользователя
      const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (existing.rows.length > 0) {
        return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const result = await pool.query(
        `INSERT INTO users (name, email, phone, password_hash, loyalty_status, loyalty_discount)
         VALUES ($1, $2, $3, $4, 'bronze', 2.00)
         RETURNING id, name, email, phone, role, created_at, loyalty_status, loyalty_discount`,
        [name, email, phone || null, passwordHash]
      );

      const user = result.rows[0];
      const token = generateToken(user);

      res.status(201).json({
        message: 'Регистрация прошла успешно',
        token,
        user,
      });
    } catch (err) {
      console.error('POST /auth/register error:', err.message);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
);

/**
 * POST /api/auth/login
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Некорректный email').normalizeEmail(),
    body('password').notEmpty().withMessage('Пароль обязателен'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const result = await pool.query(
        'SELECT id, name, email, phone, role, avatar_url, loyalty_status, loyalty_discount, password_hash FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }

      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }

      const token = generateToken(user);

      res.json({
        message: 'Вход выполнен успешно',
        token,
        user: { 
          id: user.id, name: user.name, email: user.email, phone: user.phone, 
          role: user.role, avatar_url: user.avatar_url, 
          loyalty_status: user.loyalty_status, loyalty_discount: user.loyalty_discount 
        },
      });
    } catch (err) {
      console.error('POST /auth/login error:', err.message);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
);

/**
 * GET /api/auth/me
 * Возвращает профиль текущего пользователя.
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, role, avatar_url, loyalty_status, loyalty_discount, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('GET /auth/me error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

/**
 * PUT /api/auth/me
 * Обновление профиля (имя, телефон).
 */
router.put('/me', authMiddleware, [
  body('name').optional().trim().notEmpty(),
  body('phone').optional().trim(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, phone } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET
         name  = COALESCE($1, name),
         phone = COALESCE($2, phone)
       WHERE id = $3
       RETURNING id, name, email, phone, role`,
      [name || null, phone || null, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /auth/me error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

const upload = require('../middleware/upload');

/**
 * POST /api/auth/avatar
 * Загрузка аватара пользователя
 */
router.post('/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не найден' });
    }
    const avatarUrl = '/uploads/' + req.file.filename;
    const result = await pool.query(
      `UPDATE users SET avatar_url = $1 WHERE id = $2 RETURNING avatar_url`,
      [avatarUrl, req.user.id]
    );
    res.json({ message: 'Аватар обновлен', avatar_url: result.rows[0].avatar_url });
  } catch (err) {
    console.error('POST /auth/avatar error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

/**
 * PUT /api/auth/password
 * Изменение пароля
 */
router.put('/password', authMiddleware, [
  body('currentPassword').notEmpty().withMessage('Укажите текущий пароль'),
  body('newPassword').isLength({ min: 6 }).withMessage('Новый пароль минимум 6 символов'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { currentPassword, newPassword } = req.body;
  try {
    const result = await pool.query('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];
    
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Текущий пароль неверен' });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, req.user.id]);
    
    res.json({ message: 'Пароль успешно изменен' });
  } catch (err) {
    console.error('PUT /auth/password error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ─── Хелпер генерации токена ─────────────────────────────────
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

module.exports = router;
