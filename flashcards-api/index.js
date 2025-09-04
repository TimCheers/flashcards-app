require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Card } = require('./models'); // Импортируем нашу модель Card

// Инициализация Express приложения
const app = express();

// Настройка CORS. Это позволяет фронтенду на другом порту отправлять запросы
app.use(cors());

// Middleware для парсинга JSON-тела запросов
app.use(express.json());

// Роуты API (маршруты)

// GET /api/cards - получить все карточки
app.get('/api/cards', async (req, res) => {
    try {
        const cards = await Card.findAll(); // Sequelize-метод для получения всех записей
        res.json(cards);
    } catch (error) {
        res.status(500).json({ error: 'Произошла ошибка при получении карточек' });
    }
});

// POST /api/cards - создать новую карточку
app.post('/api/cards', async (req, res) => {
    try {
        const { word, translation } = req.body;
        const newCard = await Card.create({ word, translation }); // Sequelize-метод для создания записи
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ error: 'Произошла ошибка при создании карточки' });
    }
});

// Установка порта и запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});