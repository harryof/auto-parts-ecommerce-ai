require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const path = require('path');

// ─── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-domain.com']              // замените на продакшн-домен
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Раздача статики для uploads
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// ─── Роуты ──────────────────────────────────────────────────
app.use('/api/products',   require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/orders',     require('./routes/orders'));
app.use('/api/news',       require('./routes/news'));
app.use('/api/vin',        require('./routes/vin'));

// ─── Хелс-чек ───────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ─── 404 ────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Маршрут ${req.method} ${req.path} не найден` });
});

// ─── Глобальный обработчик ошибок ───────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// ─── Запуск ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Сервер запущен на порту ${PORT}`);
  console.log(`   http://localhost:${PORT}/api/health\n`);
});
