const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  cod_available: { type: Boolean, default: false },
  category: { type: String, required: true },
  image_url: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
