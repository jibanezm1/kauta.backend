// src/routes/localizacionRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../utils/db'); // Importar la conexión a la base de datos

router.get('/', (req, res) => {
  db.query('SELECT * FROM localizacion', (err, rows) => {
    if (err) {
      console.error('Error al ejecutar consulta', err);
      res.status(500).json({ error: 'Error al obtener datos de la tabla localizacion' });
      return;
    }
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { lat, lng, idPersona, idMedida, ruc } = req.body;

  // Verificar que se hayan proporcionado los campos necesarios
  if (!lat || !lng || !idPersona || !idMedida || !ruc) {
    return res.status(400).json({ error: 'Se requieren latitud, longitud, idPersona, idMedida y RUC para crear una nueva localización' });
  }

  // Insertar nueva localización en la base de datos
  const query = 'INSERT INTO localizacion (lat, lng, id_persona, id_medida, ruc, fechaHora) VALUES (?, ?, ?, ?, ?, NOW())';
  db.query(query, [lat, lng, idPersona, idMedida, ruc], (err, result) => {
    if (err) {
      console.error('Error al insertar localización en la base de datos', err);
      return res.status(500).json({ error: 'Error al insertar localización en la base de datos' });
    }

    res.status(201).json({ message: 'Localización insertada correctamente', localizacionId: result.insertId });
  });
});


module.exports = router;
