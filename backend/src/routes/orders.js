const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db/pool');
const { authMiddleware } = require('../middleware/auth');

// Все маршруты требуют авторизации
router.use(authMiddleware);

/**
 * GET /api/orders
 * Возвращает список заказов текущего пользователя.
 */
router.get('/', async (req, res) => {
  try {
    const ordersResult = await pool.query(
      `SELECT id, status, total_amount, delivery_address, notes, created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    // Позиции заказов
    const orderIds = ordersResult.rows.map((o) => o.id);
    let items = [];
    if (orderIds.length > 0) {
      const itemsResult = await pool.query(
        `SELECT oi.order_id, oi.id, oi.product_id, oi.product_name, oi.quantity, oi.price_at_time
         FROM order_items oi
         WHERE oi.order_id = ANY($1::int[])`,
        [orderIds]
      );
      items = itemsResult.rows;
    }

    const orders = ordersResult.rows.map((order) => ({
      id: order.id,
      status: order.status,
      totalAmount: parseFloat(order.total_amount),
      deliveryAddress: order.delivery_address,
      notes: order.notes,
      createdAt: order.created_at,
      items: items
        .filter((i) => i.order_id === order.id)
        .map((i) => ({
          id: i.id,
          productId: i.product_id,
          productName: i.product_name,
          quantity: i.quantity,
          priceAtTime: parseFloat(i.price_at_time),
        })),
    }));

    res.json(orders);
  } catch (err) {
    console.error('GET /orders error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

/**
 * GET /api/orders/:id
 * Возвращает конкретный заказ (только свои).
 */
router.get('/:id', async (req, res) => {
  try {
    const orderResult = await pool.query(
      `SELECT id, status, total_amount, delivery_address, notes, created_at
       FROM orders WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.user.id]
    );
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }
    const order = orderResult.rows[0];

    const itemsResult = await pool.query(
      `SELECT id, product_id, product_name, quantity, price_at_time
       FROM order_items WHERE order_id = $1`,
      [order.id]
    );

    res.json({
      id: order.id,
      status: order.status,
      totalAmount: parseFloat(order.total_amount),
      deliveryAddress: order.delivery_address,
      notes: order.notes,
      createdAt: order.created_at,
      items: itemsResult.rows.map((i) => ({
        id: i.id,
        productId: i.product_id,
        productName: i.product_name,
        quantity: i.quantity,
        priceAtTime: parseFloat(i.price_at_time),
      })),
    });
  } catch (err) {
    console.error('GET /orders/:id error:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

/**
 * POST /api/orders
 * Создать новый заказ.
 * Body: { items: [{ productId, quantity }], deliveryAddress, notes }
 */
router.post(
  '/',
  [
    body('items').isArray({ min: 1 }).withMessage('Список товаров не может быть пустым'),
    body('items.*.productId').notEmpty().withMessage('Укажите productId'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Количество минимум 1'),
    body('deliveryAddress').optional().trim(),
    body('notes').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, deliveryAddress, notes } = req.body;
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Получаем данные и цены товаров из БД
      const productIds = items.map((i) => i.productId);
      const productsResult = await client.query(
        'SELECT id, name, price, in_stock FROM products WHERE id = ANY($1::text[])',
        [productIds]
      );

      const productMap = {};
      for (const p of productsResult.rows) {
        productMap[p.id] = p;
      }

      // Проверка наличия всех товаров
      for (const item of items) {
        if (!productMap[item.productId]) {
          await client.query('ROLLBACK');
          return res.status(400).json({ error: `Товар ${item.productId} не найден` });
        }
        if (!productMap[item.productId].in_stock) {
          await client.query('ROLLBACK');
          return res.status(400).json({
            error: `Товар "${productMap[item.productId].name}" отсутствует в наличии`,
          });
        }
      }

      // Вычисляем сумму
      const totalAmount = items.reduce((sum, item) => {
        return sum + parseFloat(productMap[item.productId].price) * item.quantity;
      }, 0);

      // Создаём заказ
      const orderResult = await client.query(
        `INSERT INTO orders (user_id, total_amount, delivery_address, notes)
         VALUES ($1, $2, $3, $4)
         RETURNING id, status, total_amount, created_at`,
        [req.user.id, totalAmount, deliveryAddress || null, notes || null]
      );
      const order = orderResult.rows[0];

      // Добавляем позиции
      for (const item of items) {
        const product = productMap[item.productId];
        await client.query(
          `INSERT INTO order_items (order_id, product_id, product_name, quantity, price_at_time)
           VALUES ($1, $2, $3, $4, $5)`,
          [order.id, item.productId, product.name, item.quantity, product.price]
        );
      }

      await client.query('COMMIT');

      res.status(201).json({
        message: 'Заказ оформлен',
        order: {
          id: order.id,
          status: order.status,
          totalAmount: parseFloat(order.total_amount),
          createdAt: order.created_at,
        },
      });
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('POST /orders error:', err.message);
      res.status(500).json({ error: 'Ошибка сервера' });
    } finally {
      client.release();
    }
  }
);

module.exports = router;
