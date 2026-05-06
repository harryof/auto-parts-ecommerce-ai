const pool = require('./src/db/pool');

async function checkDb() {
  try {
    const users = await pool.query('SELECT COUNT(*) FROM users');
    const products = await pool.query('SELECT COUNT(*) FROM products');
    const categories = await pool.query('SELECT COUNT(*) FROM categories');
    
    console.log('Users count:', users.rows[0].count);
    console.log('Products count:', products.rows[0].count);
    console.log('Categories count:', categories.rows[0].count);

    if (products.rows[0].count > 0) {
        const sampleProduct = await pool.query('SELECT id, name, category_id, subcategory_id FROM products LIMIT 2');
        console.log('\nSample products:', sampleProduct.rows);
    }

    if (categories.rows[0].count > 0) {
        const sampleCategory = await pool.query('SELECT id, name FROM categories LIMIT 2');
        console.log('\nSample categories:', sampleCategory.rows);
    }
  } catch (err) {
    console.error('DB Error:', err);
  } finally {
    process.exit();
  }
}

checkDb();
