const express = require('express');
const { placeOrder, getOrders } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/place', authMiddleware, placeOrder); // Place an order
router.get('/', authMiddleware, getOrders); // View all orders for the user

module.exports = router;
