const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Папка для статических файлов

let playersData = [];

app.post('/submit', (req, res) => {
    playersData.push(req.body.troops);

    if (playersData.length === 2) {
        const results = calculateResults(playersData);
        res.json({ message: `Результаты: Игрок 1: ${results[0]} поля, Игрок 2: ${results[1]} поля` });
        playersData = [];
    } else {
        res.json({ message: "Ожидание другого игрока..." });
    }
});

function calculateResults(playersData) {
    let results = [0, 0];
    for (let i = 0; i < playersData[0].length; i++) {
        if (playersData[0][i] > playersData[1][i]) {
            results[0]++;
        } else if (playersData[1][i] > playersData[0][i]) {
            results[1]++;
        }
    }
    return results;
}

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
