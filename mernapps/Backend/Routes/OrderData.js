const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// Save order
router.post('/orderData', async (req, res) => {
  const { email, order_data } = req.body;

  // Convert current date to IST
  const istDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata"
  });

  try {
    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      await Order.create({
        email,
        order_data: [[{ Order_date: istDate }, ...order_data]]
      });
    } else {
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: [{ Order_date: istDate }, ...order_data] } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get order history
router.post('/myOrderData', async (req, res) => {
  try {
    const myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData?.order_data || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;