const jwt = require('jsonwebtoken');

/**
 * Middleware для проверки JWT-токена.
 * Ожидает заголовок: Authorization: Bearer <token>
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Требуется авторизация' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email, role }
    next();
  } catch {
    return res.status(401).json({ error: 'Токен недействителен или истёк' });
  }
}

/**
 * Middleware для проверки роли администратора.
 */
function adminMiddleware(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Доступ запрещён' });
  }
  next();
}

module.exports = { authMiddleware, adminMiddleware };
