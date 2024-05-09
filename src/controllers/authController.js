const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../utils/db');
require('dotenv').config(); // Cargar variables de entorno desde .env

// Función para registrar un nuevo usuario
async function register(req, res) {
  try {
    const { nombreUsuario, password } = req.body;
    // Hash del password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Guardar usuario en la base de datos
    const query = 'INSERT INTO usuarios (nombreUsuario, password) VALUES (?, ?)';
    await db.query(query, [nombreUsuario, hashedPassword]);
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
}


async function login(req, res) {
    try {
        const { nombreUsuario, password } = req.body;
        
        // Buscar usuario en la base de datos
        db.query('SELECT * FROM usuarios WHERE nombreUsuario = ?', [nombreUsuario], (err, rows) => {
            if (err) {
                console.error('Error al ejecutar consulta', err);
                return res.status(500).json({ error: 'Error al obtener datos de la tabla usuarios' });
            }

            // Verificar si se encontró un usuario
            if (!rows || !rows.length) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const user = rows[0];

            // Verificar contraseña
            bcrypt.compare(password, user.password, (err, validPassword) => {
                if (err) {
                    console.error('Error al comparar contraseñas', err);
                    return res.status(500).json({ error: 'Error al verificar la contraseña' });
                }

                if (!validPassword) {
                    return res.status(401).json({ error: 'Contraseña incorrecta' });
                }

                // Generar token JWT
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            });
        });
    } catch (error) {
        console.error('Error al iniciar sesión', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
}

module.exports = { register, login };
