const Cart = require("../models/cart");
const Product = require("../models/product");

exports.addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const product = await Product.findById(product_id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    let cart = await Cart.findOne({ user_id });

    if (!cart) {
      cart = new Cart({ user_id, items: [] });
    }

    const existingProductIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);
    
    if (existingProductIndex !== -1) {
      cart.items[existingProductIndex].quantity += quantity;
      cart.items[existingProductIndex].total_price = cart.items[existingProductIndex].quantity * product.price;
    } else {
      cart.items.push({
        product_id,
        quantity,
        total_price: quantity * product.price,
        cod_available: product.cod_available,
      });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { user_id } = req.query;
    const cart = await Cart.findOne({ user_id }).populate("items.product_id");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};
