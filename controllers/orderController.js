const Order = require("../models/order");
const Cart = require("../models/cart");

exports.placeOrder = async (req, res) => {
  try {
    const { user_id, payment_method } = req.body;
    console.log(user_id, payment_method)

    const cart = await Cart.findOne({ user_id }).populate("items.product_id");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce((total, item) => total + item.total_price, 0);

    const order = new Order({
      user_id,
      cart: cart.items.map(item => ({
        product_id: item.product_id._id,
        quantity: item.quantity,
        total_price: item.total_price,
      })),
      total_amount: totalAmount,
      payment_method,
    });

    await order.save();
    cart.items = [];
    await cart.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};
