const express = require('express');
const router = express.Router();

const empleados = [
    { id: 1, nombre: 'Laura Gómez', cargo: 'Barista' },
    { id: 2, nombre: 'Carlos Pérez', cargo: 'Cajero' },
    { id: 3, nombre: 'Ana Ruiz', cargo: 'Gerente' },
];

router.get('/', (req, res) => {
    res.json(empleados);
});

module.exports = router;