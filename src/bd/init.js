import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

/**
 * Configura e inicializa la conexión a la base de datos MongoDB usando Mongoose.
 * Optimizado para entornos serverless (Vercel).
 */
const conectarBD = async () => {
  if (isConnected) {
    console.log('=> Usando conexión existente a MongoDB');
    return;
  }

  try {
    const url = process.env.DATABASE_URL || 'mongodb://localhost:27017/pedidos_db';
    
    const db = await mongoose.connect(url);
    isConnected = db.connections[0].readyState;
    
    console.log('✅ Nueva conexión exitosa a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    // En serverless no siempre queremos hacer process.exit(1)
    throw error;
  }
};

export default conectarBD;
