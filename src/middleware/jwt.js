import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware para requerir autenticación mediante JWT.
 * Valida el token enviado en el header 'Authorization: Bearer <token>'.
 */
export const requireAuth = expressjwt({
  secret: JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'auth', // El payload del token estará disponible en req.auth
}).unless({
  // Rutas que no requieren autenticación (como login y signup)
  path: [
    '/api/v1/usuario/login',
    '/api/v1/usuario/signup'
  ]
});

/**
 * Middleware para manejar errores de autenticación JWT.
 */
export const handleAuthError = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Token inválido o no proporcionado'
    });
  }
  next(err);
};
