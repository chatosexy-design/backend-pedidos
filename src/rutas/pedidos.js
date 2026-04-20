import express from 'express';
import pedidoServicio from '../servicios/pedidos.js';

const router = express.Router();

/**
 * GET /api/v1/pedidos
 * Listar pedidos con filtros opcionales (nombre, pagado).
 */
router.get('/', async (req, res) => {
  try {
    const { nombre, pagado } = req.query;
    const pedidos = await pedidoServicio.listarPedidos({ nombre, pagado });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/v1/pedidos/:id
 * Obtener un pedido específico por ID.
 */
router.get('/:id', async (req, res) => {
  try {
    const pedido = await pedidoServicio.obtenerPorId(req.params.id);
    res.json(pedido);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

/**
 * POST /api/v1/pedidos
 * Crear un nuevo pedido.
 */
router.post('/', async (req, res) => {
  try {
    const nuevoPedido = await pedidoServicio.crearPedido(req.body);
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * PATCH /api/v1/pedidos/:id
 * Actualizar parcialmente un pedido.
 */
router.patch('/:id', async (req, res) => {
  try {
    const pedidoActualizado = await pedidoServicio.actualizarPedido(req.params.id, req.body);
    res.json(pedidoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /api/v1/pedidos/:id
 * Eliminar un pedido.
 */
router.delete('/:id', async (req, res) => {
  try {
    await pedidoServicio.eliminarPedido(req.params.id);
    res.json({ mensaje: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
