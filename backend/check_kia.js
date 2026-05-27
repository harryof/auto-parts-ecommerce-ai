const { Pool } = require('pg');
require('dotenv').config({ path: './backend/.env' });

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'autoparts',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

async function main() {
  try {
    
    const kiaResult = await pool.query(
      "SELECT name, brand, price, subcategory_id, compatible_cars FROM products WHERE array_to_string(compatible_cars, ' ') ILIKE '%Kia%' LIMIT 10"
    );
    console.log('\n=== Товары совместимые с Kia ===');
    console.log('Найдено:', kiaResult.rows.length);
    kiaResult.rows.forEach(r => {
      console.log(`  - ${r.name} | ${r.subcategory_id} | ${JSON.stringify(r.compatible_cars)}`);
    });

    
    const brakeKia = await pool.query(
      "SELECT name, brand, price, compatible_cars FROM products WHERE subcategory_id = 'brake-system' AND array_to_string(compatible_cars, ' ') ILIKE '%Kia%' LIMIT 5"
    );
    console.log('\n=== Тормоза для Kia ===');
    console.log('Найдено:', brakeKia.rows.length);
    brakeKia.rows.forEach(r => {
      console.log(`  - ${r.name} | ${r.price} руб. | совместимо: ${JSON.stringify(r.compatible_cars)}`);
    });

    
    const allBrakes = await pool.query(
      "SELECT name, brand, price, compatible_cars FROM products WHERE subcategory_id = 'brake-system' LIMIT 5"
    );
    console.log('\n=== Все тормоза в БД (первые 5) ===');
    console.log('Найдено:', allBrakes.rows.length);
    allBrakes.rows.forEach(r => {
      console.log(`  - ${r.name} | ${r.price} руб. | совместимо: ${JSON.stringify(r.compatible_cars)}`);
    });

    
    const sample = await pool.query(
      "SELECT id, compatible_cars FROM products WHERE compatible_cars IS NOT NULL LIMIT 3"
    );
    console.log('\n=== Формат compatible_cars (примеры) ===');
    sample.rows.forEach(r => {
      console.log(`  id=${r.id} | compatible_cars=${JSON.stringify(r.compatible_cars)}`);
    });

    
    const count = await pool.query("SELECT COUNT(*) FROM products");
    console.log('\n=== Всего товаров в БД:', count.rows[0].count, '===');

  } catch (err) {
    console.error('Ошибка:', err.message);
  } finally {
    await pool.end();
  }
}

main();
