const Product = require("../models/product");

exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, category, cod_available, image_url } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      cod_available,
      image_url,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};
