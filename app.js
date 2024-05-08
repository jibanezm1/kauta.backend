// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('¡Hola, mundoaaaa!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendooooo en el puerto ${PORT}`);
});

