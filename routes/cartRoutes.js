const express = require('express');
const { getCart, addToCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getCart); // Protected route to view cart
router.post('/add', authMiddleware, addToCart); // Protected route to add product

module.exports = router;
