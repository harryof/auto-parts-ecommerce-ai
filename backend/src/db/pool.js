const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'autoparts',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

// Проверка подключения при старте
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Ошибка подключения к PostgreSQL:', err.message);
  } else {
    console.log('✅ Подключение к PostgreSQL успешно');
    release();
  }
});

module.exports = pool;
