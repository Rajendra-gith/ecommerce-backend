const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get the cart for the logged-in user
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate('products.product', 'name price'); // Populate product details

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a product to the cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // Find or create cart for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [],
      });
    }

    // Check if product already exists in cart
    const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (existingProductIndex !== -1) {
      // If exists, update quantity
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // If not, add new product
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();

    res.json({
      message: 'Product added to cart',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
};
