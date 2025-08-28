// src/controllers/pedidosController.js
import * as estadoPedidoModel from '../models/estadoPedido.js';

// Obtiene todos los pedidos y los envía como respuesta JSON
const getPedidos = (req, res) => {
  const pedidos = estadoPedidoModel.getAll();
  res.json(pedidos);
};

// Crea un nuevo pedido a partir del cuerpo de la petición y lo envía como respuesta
const createPedido = (req, res) => {
  const newPedido = estadoPedidoModel.create(req.body);
  res.status(201).json(newPedido);
};

// Actualiza un pedido por su ID y envía el objeto actualizado o un error si no se encuentra
const updatePedido = (req, res) => {
  const updated = estadoPedidoModel.update(req.params.id, req.body);
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
  createPedido,
  updatePedido,
  deletePedido
};