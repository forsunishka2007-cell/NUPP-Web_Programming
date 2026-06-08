const express = require('express');
const path = require('path');
const app = express();

// Налаштовуємо роздачу статичних файлів (css, картинки) 
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));

// Окремий роут для сторінки фільму 
app.get('/film', (req, res) => {
    res.sendFile(path.join(__dirname, 'film.html'));
});

// Окремий роут для сторінки книги 
app.get('/book', (req, res) => {
    res.sendFile(path.join(__dirname, 'book.html'));
});

// Головна сторінка (просто для зручності навігації)
app.get('/', (req, res) => {
    res.send(`
        <h1>Лабораторна робота</h1>
        <ul>
            <li><a href="/film">Мій улюблений фільм (/film)</a></li>
            <li><a href="/book">Моя улюблена книга (/book)</a></li>
        </ul>
    `);
});

// Налаштування порту для локального запуску та хостингу [cite: 85]
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порту ${PORT}`);
    console.log(`Перегляд фільму: http://localhost:${PORT}/film`);
    console.log(`Перегляд книги: http://localhost:${PORT}/book`);
});