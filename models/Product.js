const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  description: {
    type: String,
    required: true, // Description is required
  },
  price: {
    type: Number,
    required: true, // Price is required
  },
  imageUrl: {
    type: String,
    required: false, // Image is optional
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically add created timestamp
  },
});

module.exports = mongoose.model('Product', productSchema);
