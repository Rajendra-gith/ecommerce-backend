const Product = require('../models/Product');

// Get all products (public route)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new product (protected route)
const addProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;

    const product = new Product({
      name,
      description,
      price,
      imageUrl,
    });

    const savedProduct = await product.save();
    res.status(201).json({
      message: 'Product added successfully',
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
};
