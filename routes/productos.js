const express = require('express');
const router = express.Router();

const productos = [
    { id: 1, nombre: 'Capuchino', precio: 2.50 },
    { id: 2, nombre: 'Latte', precio: 3.00 },
    { id: 3, nombre: 'Té Verde', precio: 1.80 },
];

router.get('/', (req, res) => {
    res.json(productos);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    res.json(producto || { mensaje: 'Producto no encontrado' });
});

module.exports = router;