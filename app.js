// app.js
const express = require('express');
const app = express();

app.use(express.json());

require('dotenv').config(); // Cargar variables de entorno desde .env

// Importar rutas
 const localizacionRoutes = require("./src/routes/localizacionRoutes");
app.use("/localizacion", localizacionRoutes);

// Usar las rutas
app.use('/localizacion', localizacionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
