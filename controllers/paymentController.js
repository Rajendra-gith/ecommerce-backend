const Payment = require('../models/Payment');
const Order = require('../models/Order');

// Process a dummy payment
const makePayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.body;

    // Find the order and check if it belongs to the user
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found or does not belong to user' });
    }

    if (order.status === 'Completed') {
      return res.status(400).json({ message: 'Order already paid' });
    }

    // Create a payment record
    const payment = new Payment({
      order: orderId,
      amount: order.totalPrice,
    });

    await payment.save();

    // Update order status to 'Completed'
    order.status = 'Completed';
    await order.save();

    res.status(200).json({
      message: 'Payment successful',
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  makePayment,
};
