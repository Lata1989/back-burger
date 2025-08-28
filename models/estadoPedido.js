// src/models/estadoPedido.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname para compatibilidad con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo JSON
const mockDataPath = path.join(__dirname, '../data/mockData.json');

// Carga los datos del archivo JSON de manera estándar para mayor compatibilidad
let pedidos = [];
try {
  const jsonData = fs.readFileSync(mockDataPath, 'utf8');
  pedidos = JSON.parse(jsonData);
} catch (error) {
  console.error('Error al cargar los datos del mock:', error);
}

// Función auxiliar para guardar el array de pedidos de vuelta al archivo JSON
const saveData = () => {
  try {
    // Escribe el array JSON en el archivo con un formato legible (2 espacios de indentación)
    fs.writeFileSync(mockDataPath, JSON.stringify(pedidos, null, 2), 'utf8');
  } catch (error) {
    console.error('Error al guardar los datos:', error);
  }
};

// Obtiene todos los pedidos
const getAll = () => {
  return pedidos;
};

// Crea un nuevo pedido
const create = (newPedido) => {
  // Simula un ID de la base de datos
  const newId = pedidos.length > 0 ? Math.max(...pedidos.map(p => p.id_estado_pedido)) + 1 : 1;
  
  // Combina los datos del nuevo pedido con el ID y la fecha de ingreso
  const pedidoConId = {
    ...newPedido,
    id_estado_pedido: newId,
    fecha_ingreso: new Date().toISOString()
  };
  
  // Agrega el nuevo pedido al array
  pedidos.push(pedidoConId);
  
  // Guarda los cambios en el archivo JSON
  saveData();
  
  return pedidoConId;
};

// Actualiza un pedido por su ID
const update = (id, updatedData) => {
  const index = pedidos.findIndex(p => p.id_estado_pedido === parseInt(id));
  if (index !== -1) {
    // Sobrescribe los datos del pedido existente con los nuevos
    pedidos[index] = { ...pedidos[index], ...updatedData };
    saveData();
    return pedidos[index];
  }
  return null;
};

// Elimina un pedido por su ID
const remove = (id) => {
  const initialLength = pedidos.length;
  // Filtra el array para eliminar el pedido con el ID especificado
  pedidos = pedidos.filter(p => p.id_estado_pedido !== parseInt(id));
  
  // Guarda los cambios
  saveData();
  
  // Devuelve true si se eliminó un elemento, false si no se encontró el ID
  return pedidos.length < initialLength;
};

export {
  getAll,
  create,
  update,
  remove
};