import express from 'express';
import usuarioServicio from '../servicios/usuarios.js';

const router = express.Router();

/**
 * POST /api/v1/usuario/signup
 * Registro de un nuevo usuario.
 */
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username y password son obligatorios' });
    }

    const usuario = await usuarioServicio.registro(username, password);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * POST /api/v1/usuario/login
 * Inicio de sesión y obtención de JWT.
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username y password son obligatorios' });
    }

    const resultado = await usuarioServicio.login(username, password);
    res.json(resultado);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

/**
 * GET /api/v1/usuario/:id
 * Obtener información de un usuario por ID.
 */
router.get('/:id', async (req, res) => {
  try {
    const usuario = await usuarioServicio.obtenerPorId(req.params.id);
    res.json(usuario);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
