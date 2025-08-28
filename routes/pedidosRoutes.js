// src/routes/pedidosRoutes.js
import express from 'express';
import * as pedidosController from '../controllers/pedidosController.js';

const router = express.Router();

// Define la ruta GET para obtener todos los pedidos
router.get('/', pedidosController.getPedidos);

// Define la ruta POST para crear un nuevo pedido
router.post('/', pedidosController.createPedido);

// Define la ruta PUT para actualizar un pedido por su ID
router.put('/:id', pedidosController.updatePedido);

// Define la ruta DELETE para eliminar un pedido por su ID
router.delete('/:id', pedidosController.deletePedido);

// Usa una exportación con nombre, por ejemplo:

export default router;