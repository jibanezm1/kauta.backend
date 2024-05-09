// app.js
const express = require('express');
const app = express();

app.use(express.json());

require('dotenv').config(); // Cargar variables de entorno desde .env

// Importar rutas
 const localizacionRoutes = require("./src/routes/localizacionRoutes");
 const personasRoutes = require("./src/routes/personasRoutes");
 const authRoutes = require('./src/routes/authRoutes');


app.use("/localizacion", localizacionRoutes);
app.use('/auth', authRoutes);
app.use("/persona",personasRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} ahora vamos a ver que pasa!!!`);
});
