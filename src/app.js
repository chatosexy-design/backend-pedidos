import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import rutaPedidos from './rutas/pedidos.js';
import rutaUsuarios from './rutas/usuarios.js';
import { requireAuth, handleAuthError } from './middleware/jwt.js';
import conectarBD from './bd/init.js';

const app = express();

// Middleware para asegurar conexión a BD (Serverless friendly)
app.use(async (req, res, next) => {
  try {
    await conectarBD();
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error de conexión a la base de datos' });
  }
});

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de Usuarios (Públicas y Privadas manejadas internamente o por el middleware general)
app.use('/api/v1/usuario', rutaUsuarios);

// Aplicar middleware de autenticación a las rutas de pedidos
app.use('/api/v1/pedidos', requireAuth, rutaPedidos);

// Manejador de errores de autenticación
app.use(handleAuthError);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '🔥 Bienvenido a la API de Leños - Gestión de Pedidos 🔥',
    descripcion: 'Sistema de pedidos con soporte para imágenes en movimiento y arquitectura por capas.',
    status: 'online'
  });
});

export default app;
