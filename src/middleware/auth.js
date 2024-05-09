// middleware/auth.js

// Función para verificar el token de autenticación
function verifyToken(req, res, next) {
    // Obtener el token de los headers de la solicitud
    const token = req.headers['authorization'];
  
    // Verificar si se proporcionó un token
    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado: token no proporcionado' });
    }
  
    // Verificar si el token es válido (aquí puedes usar la librería JWT o tu método de autenticación preferido)
    // Por simplicidad, en este ejemplo, solo verificamos que el token no esté vacío
    if (!token.trim()) {
      return res.status(401).json({ error: 'Acceso no autorizado: token inválido' });
    }
  
    // Si el token es válido, pasa al siguiente middleware o ruta
    next();
  }
  
  module.exports = { verifyToken };
  