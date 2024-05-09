// personasRoutes.js
const express = require('express');
const router = express.Router();

const db = require('../utils/db'); // Importar la conexión a la base de datos

// Endpoint para obtener personas con sus medidas cautelares
router.get('/', (req, res) => {
  const query = `
    SELECT p.nombre AS nombre_persona, 
           m.nombre_tipo AS medida_cautelar,
           mc.fecha_creacion AS fecha_creacion_medida
    FROM persona p
    JOIN medidasCautelares mc ON p.id_persona = mc.id_persona
    JOIN tipo_medida_cautelar m ON mc.tipo_medida = m.id_tipo_medida
    ORDER BY p.id_persona, mc.fecha_creacion;
  `;

  db.query(query, (err, rows) => {
    if (err) {
      console.error('Error al ejecutar consulta', err);
      res.status(500).json({ error: 'Error al obtener datos de personas con medidas cautelares' });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;
