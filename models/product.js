const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  imagen: {
    type: String,
    default: "https://via.placeholder.com/300x200.png"
  }
});

module.exports = mongoose.model("Producto", productoSchema);
