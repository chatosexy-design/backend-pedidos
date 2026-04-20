import app from './src/app.js';
import conectarBD from './src/bd/init.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Función principal para arrancar el servidor localmente.
 */
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

export default app;
