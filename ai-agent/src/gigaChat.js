const axios = require('axios');
const https = require('https');
const { v4: uuidv4 } = require('uuid');

class GigaChatService {
  constructor() {
    this.credentials = process.env.GIGACHAT_CREDENTIALS;
    this.accessToken = null;
    this.expiresAt = null;
    
    // Игнорируем проблемы с сертификатами (частая особенность работы со Сбером вне их экосистемы)
    this.httpsAgent = new https.Agent({ rejectUnauthorized: false });
  }

  async getAccessToken() {
    // Возвращаем токен если он ещё жив
    if (this.accessToken && this.expiresAt && Date.now() < this.expiresAt) {
      return this.accessToken;
    }

    if (!this.credentials || this.credentials === 'your_base64_credentials_here') {
      console.warn("GIGACHAT_CREDENTIALS не установлены.");
      return null;
    }

    try {
      const response = await axios({
        method: 'POST',
        url: 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'RqUID': uuidv4(),
          'Authorization': `Basic ${this.credentials}`
        },
        data: 'scope=GIGACHAT_API_PERS', // или GIGACHAT_API_CORP в зависимости от аккаунта
        httpsAgent: this.httpsAgent
      });

      this.accessToken = response.data.access_token;
      // expires_at возвращается в миллисекундах (Unix time)
      this.expiresAt = response.data.expires_at - 60000; // запас 1 минута
      return this.accessToken;
    } catch (error) {
      console.error('Ошибка получения токена GigaChat:', error.response?.data || error.message);
      return null;
    }
  }

  async sendMessage(messages) {
    const token = await this.getAccessToken();
    
    // Fallback для разработки, если ключей еще нет
    if (!token) {
      return {
        role: "assistant",
        content: "[В РЕЖИМЕ ЗАГЛУШКИ] Привет! К сожалению, GigaChat пока не настроен. Для его работы необходимо прописать ключи (GIGACHAT_CREDENTIALS) в .env файле внутри папки ai-agent."
      };
    }

    try {
      const response = await axios({
        method: 'POST',
        url: 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: {
          model: 'GigaChat', // или GigaChat-Plus
          messages: messages,
          temperature: 0.7,
        },
        httpsAgent: this.httpsAgent
      });

      return response.data.choices[0].message;
    } catch (error) {
      console.error('Ошибка отправки сообщения в GigaChat:', error.response?.data || error.message);
      throw new Error("Ошибка коммуникации с ИИ");
    }
  }
}

module.exports = new GigaChatService();
