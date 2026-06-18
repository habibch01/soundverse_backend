const express    = require('express');
const router     = express.Router();
const Order      = require('../models/Order');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const requireAdmin = require('../middlewares/requireAdmin');

// POST create order (logged in user)
router.post('/', ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const order = new Order({ ...req.body, clerkUserId: req.auth.userId });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET my orders (logged in user)
router.get('/my-orders', ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const orders = await Order.find({ clerkUserId: req.auth.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all orders (admin only)
router.get('/', ClerkExpressRequireAuth(), requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update order status (admin only)
router.put('/:id/status', ClerkExpressRequireAuth(), requireAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE order (admin only)
router.delete('/:id', ClerkExpressRequireAuth(), requireAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;