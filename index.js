// src/index.js
import express from 'express';
// Esta es la forma correcta de importar un 'export default'
import pedidosRoutes from './routes/pedidosRoutes.js';

// Carga el puerto desde las variables de entorno, usando un valor por defecto si no existe
const PORT = process.env.PORT || 4000;

// Crea una instancia de la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Nueva ruta para la página de inicio (ruta raíz)
// Muestra un mensaje simple para confirmar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('¡El servidor de la API de pedidos está funcionando!');
});

// Monta el router de pedidos en la ruta '/pedidos'
app.use('/pedidos', pedidosRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
