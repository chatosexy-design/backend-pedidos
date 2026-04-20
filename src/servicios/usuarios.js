import Usuario from '../modelos/usuario.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Servicio para el registro de nuevos usuarios.
 */
const registro = async (username, password) => {
  try {
    const usuarioExistente = await Usuario.findOne({ username });
    if (usuarioExistente) {
      throw new Error('El nombre de usuario ya existe');
    }

    const nuevoUsuario = new Usuario({ username, password });
    await nuevoUsuario.save();

    // No devolvemos el password
    const usuarioData = nuevoUsuario.toObject();
    delete usuarioData.password;
    
    return usuarioData;
  } catch (error) {
    throw error;
  }
};

/**
 * Servicio para el login de usuarios y generación de JWT.
 */
const login = async (username, password) => {
  try {
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    const esValido = await usuario.compararPassword(password);
    if (!esValido) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Generar JWT
    const token = jwt.sign(
      { id: usuario._id, username: usuario.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      usuario: {
        id: usuario._id,
        username: usuario.username
      }
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Servicio para obtener información del usuario por ID.
 */
const obtenerPorId = async (id) => {
  try {
    const usuario = await Usuario.findById(id).select('-password');
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  } catch (error) {
    throw error;
  }
};

export default {
  registro,
  login,
  obtenerPorId
};
