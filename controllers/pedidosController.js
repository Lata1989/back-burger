// src/controllers/pedidosController.js
import * as estadoPedidoModel from '../models/estadoPedido.js';

// Obtiene todos los pedidos y los envía como respuesta JSON
const getPedidos = (req, res) => {
  const pedidos = estadoPedidoModel.getAll();
  res.json(pedidos);
};

// Obtiene todos los pedidos con estado 2 que es entregado
const getPedidosEntregados = (req, res) => {
    const pedidos = estadoPedidoModel.getAll().filter(p => p.id_estado === 2);
}
// Crea un nuevo pedido a partir del cuerpo de la petición y lo envía como respuesta
const createPedido = (req, res) => {
  const newPedido = estadoPedidoModel.create(req.body);
  res.status(201).json(newPedido);
};

// Actualiza un pedido por su ID y envía el objeto actualizado o un error si no se encuentra
const updatePedido = (req, res) => {
  const { id } = req.params;
  const { id_estado } = req.body;

  if (![1, 2, 3].includes(id_estado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  const updatedFields = { id_estado };

  // Si el pedido se marca como entregado, seteamos fecha_salida
  if (id_estado === 3) {
    updatedFields.fecha_salida = new Date().toISOString();
  }

  const updated = estadoPedidoModel.update(id, updatedFields);

  if (updated) {
    res.json(updated);
  } else {
    res.status(404).send('Pedido no encontrado');
  }
};

// Elimina un pedido por su ID y envía un estado de "sin contenido"
const deletePedido = (req, res) => {
  const deleted = estadoPedidoModel.remove(req.params.id);
  if (deleted) {
    res.status(204).send(); // 204: No Content
  } else {
    res.status(404).send('Pedido no encontrado');
  }
};

export {
  getPedidos,
  getPedidosEntregados,
  createPedido,
  updatePedido,
  deletePedido
};