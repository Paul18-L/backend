const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// === Middlewares ===
app.use(cors());
app.use(express.json());

// --- PRODUCTOS ---
const productos = [
  { id: 1, nombre: "Capuccino", precio: 2.50, categoria: "Café" },
  { id: 2, nombre: "Latte", precio: 2.80, categoria: "Café" },
  { id: 3, nombre: "Espresso", precio: 2.00, categoria: "Café" },
  { id: 4, nombre: "Brownie", precio: 3.00, categoria: "Postre" },
  { id: 5, nombre: "Cheesecake", precio: 3.50, categoria: "Postre" },
  { id: 6, nombre: "Tostadas", precio: 2.20, categoria: "Desayuno" },
  { id: 7, nombre: "Sandwich", precio: 2.80, categoria: "Desayuno" },
  { id: 8, nombre: "Batido de Fresa", precio: 2.50, categoria: "Batido" },
  { id: 9, nombre: "Batido de Chocolate", precio: 2.70, categoria: "Batido" },
  { id: 10, nombre: "Helado de Vainilla", precio: 1.80, categoria: "Helado" },
  { id: 11, nombre: "Helado de Fresa", precio: 1.90, categoria: "Helado" }
];

// --- EMPLEADOS ---
const empleados = [
  { id: 1, nombre: "Ana Torres", cargo: "Barista Principal" },
  { id: 2, nombre: "Luis Gómez", cargo: "Cocinero" },
  { id: 3, nombre: "María López", cargo: "Repostera" },
  { id: 4, nombre: "Pedro Ruiz", cargo: "Cajero" }
];


// Obtener todos los productos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// Obtener todos los empleados
app.get('/api/empleados', (req, res) => {
  res.json(empleados);
});


// Sirve todos los archivos de la carpeta actual (incluyendo index.html)
app.use(express.static(path.join(__dirname)));

// Cuando el usuario entra a la raíz "/", enviamos el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`☕ Servidor Café Digital corriendo en http://localhost:${PORT}`);
});