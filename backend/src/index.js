require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const path = require('path');


app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-domain.com']              
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));


app.use('/api/products',   require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/orders',     require('./routes/orders'));
app.use('/api/news',       require('./routes/news'));
app.use('/api/vin',        require('./routes/vin'));


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});


app.use((req, res) => {
  res.status(404).json({ error: `Маршрут ${req.method} ${req.path} не найден` });
});


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});


app.listen(PORT, () => {
  console.log(`\n🚀 Сервер запущен на порту ${PORT}`);
  console.log(`   http://localhost:${PORT}/api/health\n`);
});
