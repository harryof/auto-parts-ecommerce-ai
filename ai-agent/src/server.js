require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const db = require('./db');
const gigaChat = require('./gigaChat');

const app = express();
const PORT = process.env.PORT || 5001;

// Загружаем датасет VIN номеров
// В Docker: файл скопирован в /app/vins_dataset.json (рядом с package.json)
// Локально: файл лежит в backend/vins_dataset.json (два уровня выше src/)
let vinsDataset = [];
try {
  const candidates = [
    path.join(__dirname, '../vins_dataset.json'),           // Docker: /app/vins_dataset.json
    path.join(__dirname, '../../backend/vins_dataset.json'), // Локально
  ];
  const vinsPath = candidates.find(p => fs.existsSync(p));
  if (vinsPath) {
    vinsDataset = JSON.parse(fs.readFileSync(vinsPath, 'utf8'));
    console.log(`✅ Загружено ${vinsDataset.length} VIN номеров из датасета`);
  } else {
    console.warn(`⚠️ Файл vins_dataset.json не найден`);
  }
} catch (err) {
  console.error('❌ Ошибка загрузки vins_dataset.json:', err.message);
}

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Функция примитивного поиска товаров по ключевым словам из последнего сообщения
async function searchProductsForContext(queryStr) {
  try {
    // Разбиваем строку на слова, фильтруем короткие слова и формируем запрос для полнотекстового поиска
    const words = queryStr.split(/\s+/).filter(w => w.length > 2).map(w => w.replace(/[^\wа-яА-ЯёЁ]/g, ''));
    if (words.length === 0) return [];
    
    // Берем первые 3 важных слова для простого поиска ILIKE (или FTS как в основном бэкенде)
    const searchQuery = words.slice(0, 3).join(' | ');
    
    const result = await db.query(`
      SELECT name, price, brand, in_stock, compatible_cars 
      FROM products 
      WHERE to_tsvector('russian', name || ' ' || COALESCE(brand,'') || ' ' || COALESCE(description,'') || ' ' || COALESCE(array_to_string(compatible_cars, ' '), '')) 
            @@ to_tsquery('russian', $1)
      LIMIT 5
    `, [searchQuery]);

    // Если ничего не нашли через FTS, пробуем обычный ILIKE по первому слову
    if (result.rows.length === 0 && words.length > 0) {
      const ilikeResult = await db.query(`
        SELECT name, price, brand, in_stock, compatible_cars 
        FROM products 
        WHERE name ILIKE $1 OR brand ILIKE $1 OR array_to_string(compatible_cars, ' ') ILIKE $1
        LIMIT 5
      `, [`%${words[0]}%`]);
      return ilikeResult.rows;
    }

    return result.rows;
  } catch (error) {
    console.error("Ошибка поиска контекста:", error.message);
    return [];
  }
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Сообщение не предоставлено' });
    }

    let modifiedMessage = message;
    let vinInfoText = "";

    // Поиск VIN номера (17 символов, буквы и цифры)
    const vinMatch = message.match(/\b[A-HJ-NPR-Z0-9]{17}\b/i);
    if (vinMatch) {
      const foundVin = vinMatch[0].toUpperCase();
      const carInfo = vinsDataset.find(v => v.vin === foundVin);
      
      if (carInfo) {
        vinInfoText = `Система автоматически определила автомобиль по VIN (${foundVin}): ${carInfo.full_name}. Учитывай это при ответе.`;
        // Добавляем марку и модель в запрос, чтобы FTS нашел нужные запчасти
        modifiedMessage = `${message} ${carInfo.full_name}`;
      } else {
        vinInfoText = `Пользователь указал VIN номер ${foundVin}, но его нет в нашей базе. Скажи ему об этом.`;
      }
    }

    // 1. Ищем релевантные товары в БД
    const relevantProducts = await searchProductsForContext(modifiedMessage);
    
    // 2. Формируем контекст наличия (для промпта)
    let contextText = "Сообщи пользователю, что актуальная информация по базе:\n";
    if (vinInfoText) {
      contextText += `ИНФОРМАЦИЯ О VIN: ${vinInfoText}\n\n`;
    }
    
    if (relevantProducts.length > 0) {
      contextText += relevantProducts.map(p => 
        `- ${p.name} (Бренд: ${p.brand || 'Неизвестно'}): ${p.price} руб. В наличии: ${p.in_stock ? 'Да' : 'Нет'}`
      ).join("\n");
    } else {
      contextText += "По данному запросу товаров в базе не найдено. Предложи помощь по другим товарам или скажи что мы работаем под заказ.";
    }

    // 3. Собираем массив сообщений для GigaChat
    const systemPrompt = {
      role: "system",
      content: `Ты дружелюбный и профессиональный AI-продавец-консультант интернет-магазина автозапчастей. 
Твоя цель - помочь клиенту найти нужную деталь, подсказать по наличию и стоимости, а также помочь с выбором. 
Используй следующий контекст из нашей базы данных для ответа на текущий вопрос:
===
${contextText}
===
Никогда не придумывай цены или товары, если их нет в контексте, опирайся строго на него. Будь вежлив и предлагай добавить товар в корзину. Не пиши слишком длинно.`
    };

    const messagesForAI = [
      systemPrompt,
      ...history.map(m => ({ role: m.role, content: m.content })),
      { role: "user", content: message }
    ];

    // 4. Отправляем запрос
    const aiResponse = await gigaChat.sendMessage(messagesForAI);

    // 5. Возвращаем ответ
    res.json({
      role: aiResponse.role,
      content: aiResponse.content
    });

  } catch (err) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера AI агента' });
  }
});

app.listen(PORT, () => {
  console.log(`🤖 AI Agent microservice running on port ${PORT}`);
});
