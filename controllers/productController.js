const Product = require('../models/product');

// GET /api/products
async function getAll(req, res) {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({ message: 'Error al obtener productos', error: err.message });
    }
}

// GET /api/products/:id
async function getById(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        return res.status(200).json(product);
    } catch (err) {
        return res.status(400).json({ message: 'ID inválido', error: err.message });
    }
}

// POST /api/products
async function create(req, res) {
    try {
        const { nombre, descripcion, precio, imagen, disponible } = req.body;
        if (!nombre || precio === undefined) {
            return res.status(400).json({ message: 'Faltan campos requeridos: nombre y precio' });
        }
        const product = new Product({ nombre, descripcion, precio, imagen, disponible });
        await product.save();
        return res.status(201).json(product);
    } catch (err) {
        return res.status(500).json({ message: 'Error al crear producto', error: err.message });
    }
}

// PUT /api/products/:id
async function update(req, res) {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
        return res.status(200).json(updated);
    } catch (err) {
        return res.status(400).json({ message: 'Error al actualizar', error: err.message });
    }
}

// DELETE /api/products/:id
async function remove(req, res) {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
        return res.status(200).json({ message: 'Producto eliminado' });
    } catch (err) {
        return res.status(400).json({ message: 'ID inválido', error: err.message });
    }
}

module.exports = { getAll, getById, create, update, remove };