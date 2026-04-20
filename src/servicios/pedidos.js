import Pedido from '../modelos/pedido.js';

/**
 * Servicio para crear un nuevo pedido.
 */
const crearPedido = async (datosPedido) => {
  try {
    const nuevoPedido = new Pedido(datosPedido);
    return await nuevoPedido.save();
  } catch (error) {
    throw error;
  }
};

/**
 * Servicio para listar todos los pedidos con filtros opcionales.
 */
const listarPedidos = async (filtros = {}) => {
  try {
    const query = {};
    
    if (filtros.nombre) {
      query.nombre = { $regex: filtros.nombre, $options: 'i' }; // Búsqueda parcial e insensible a mayúsculas
    }
    
    if (filtros.pagado) {
      // Si se envía un string de 'true'/'false' o similar, adaptamos según sea necesario
      // Aquí asumimos que filtramos si el array 'pagado' contiene ciertos valores o está vacío
      query.pagado = { $in: [filtros.pagado] };
    }

    return await Pedido.find(query).sort({ fecha_solicitud: -1 });
  } catch (error) {
    throw error;
  }
};

/**
 * Servicio para obtener un pedido por su ID.
 */
const obtenerPorId = async (id) => {
  try {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }
    return pedido;
  } catch (error) {
    throw error;
  }
};

/**
 * Servicio para actualizar un pedido existente.
 */
const actualizarPedido = async (id, datosActualizados) => {
  try {
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id, 
      datosActualizados, 
      { new: true, runValidators: true }
    );
    
    if (!pedidoActualizado) {
      throw new Error('Pedido no encontrado');
    }
    
    return pedidoActualizado;
  } catch (error) {
    throw error;
  }
};

/**
 * Servicio para eliminar un pedido.
 */
const eliminarPedido = async (id) => {
  try {
    const pedidoEliminado = await Pedido.findByIdAndDelete(id);
    if (!pedidoEliminado) {
      throw new Error('Pedido no encontrado');
    }
    return pedidoEliminado;
  } catch (error) {
    throw error;
  }
};

export default {
  crearPedido,
  listarPedidos,
  obtenerPorId,
  actualizarPedido,
  eliminarPedido
};
