const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cart: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      total_price: { type: Number },
    },
  ],
  total_amount: { type: Number, required: true },
  payment_method: { type: String, enum: ["COD", "online"], required: true },
  status: { type: String, enum: ["placed", "shipped", "delivered"], default: "placed" },
});

module.exports = mongoose.model("Order", orderSchema);
