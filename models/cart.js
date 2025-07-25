const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      total_price: { type: Number },
      cod_available: { type: Boolean, required: true },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
