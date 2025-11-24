// server.js
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Servir frontend
app.use(express.static("public"));  // <<--- ESTA LÍNEA ES LA SOLUCIÓN

// ---------------------------
//  Conexión a MongoDB Atlas
// ---------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Conectado a MongoDB Atlas"))
  .catch((err) => console.error(" Error conectando a MongoDB:", err));

// ---------------------------
//   Modelo (Productos)
// ---------------------------
const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
imagen :{type:String}
});

const Producto = mongoose.model("Producto", productSchema);

// --------------------------------
//   RUTAS CRUD - API REST
// --------------------------------
app.get("/api/productos", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

app.get("/api/productos/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: "No encontrado" });
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json({ message: "ID inválido" });
  }
});

app.post("/api/productos", async (req, res) => {
  try {
    const nuevo = new Producto(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ message: "Error al crear producto" });
  }
});

app.put("/api/productos/:id", async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!actualizado)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.status(200).json(actualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar" });
  }
});

app.delete("/api/productos/:id", async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado)
      return res.status(404).json({ message: "No encontrado" });

    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar" });
  }
});

// ---------------------------
//  Servidor
// ---------------------------
const PORT = 3000;
// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
