// src/routes/localizacionRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../utils/db'); // Importar la conexión a la base de datos
const { verifyToken } = require('../middleware/auth'); // Importar middleware para verificar el token

// Obtener todas las localizaciones (requiere token)
router.get('/', verifyToken, (req, res) => {
  db.query('SELECT * FROM localizacion', (err, rows) => {
    if (err) {
      console.error('Error al ejecutar consulta', err);
      res.status(500).json({ error: 'Error al obtener datos de la tabla localizacion' });
      return;
    }
    res.json(rows);
  });
});

// Obtener una localización por su ID (requiere token)
router.get('/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM localizacion WHERE id_localizacion = ?', [id], (err, rows) => {
    if (err) {
      console.error('Error al ejecutar consulta', err);
      res.status(500).json({ error: 'Error al obtener la localización' });
      return;
    }
    if (rows.length === 0) {
      res.status(404).json({ error: 'Localización no encontrada' });
      return;
    }
    res.json(rows[0]);
  });
});

// Crear una nueva localización (requiere token)
router.post('/', verifyToken, (req, res) => {
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

// Actualizar una localización por su ID (requiere token)
router.put('/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  const { lat, lng, idPersona, idMedida, ruc } = req.body;

  // Construir objeto con los campos a actualizar
  const fieldsToUpdate = {
    lat,
    lng,
    id_persona: idPersona,
    id_medida: idMedida,
    ruc
  };

  // Filtrar los campos que no se han proporcionado
  const filteredFields = Object.fromEntries(Object.entries(fieldsToUpdate).filter(([key, value]) => value !== undefined));

  // Verificar si se proporcionaron campos para actualizar
  if (Object.keys(filteredFields).length === 0) {
    return res.status(400).json({ error: 'Se requiere al menos uno de los siguientes campos: latitud, longitud, idPersona, idMedida o RUC para actualizar la localización' });
  }

  // Agregar la fechaHora actual
  filteredFields.fechaHora = new Date();

  // Construir la consulta SQL para actualizar
  const query = 'UPDATE localizacion SET ? WHERE id_localizacion = ?';

  // Ejecutar la consulta SQL
  db.query(query, [filteredFields, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar localización en la base de datos', err);
      return res.status(500).json({ error: 'Error al actualizar localización en la base de datos' });
    }

    res.json({ message: 'Localización actualizada correctamente' });
  });
});

// Eliminar una localización por su ID (requiere token)
router.delete('/:id', verifyToken, (req, res) => {
  const id = req.params.id;

  // Eliminar la localización de la base de datos
  const query = 'DELETE FROM localizacion WHERE id_localizacion = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar localización de la base de datos', err);
      return res.status(500).json({ error: 'Error al eliminar localización de la base de datos' });
    }

    res.json({ message: 'Localización eliminada correctamente' });
  });
});

module.exports = router;
