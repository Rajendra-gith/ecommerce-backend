const express = require('express');
const { getProducts, addProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getProducts); // Public route
router.post('/add', authMiddleware, addProduct); // Protected route

module.exports = router;
