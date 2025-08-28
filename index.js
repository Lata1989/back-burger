import express from 'express';
import pedidosRoutes from './routes/pedidosRoutes.js';
import cors from 'cors';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡El servidor de la API de pedidos está funcionando!');
});

app.use('/pedidos', pedidosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
