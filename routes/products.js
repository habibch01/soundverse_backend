const express    = require('express');
const router     = express.Router();
const Product    = require('../models/Product');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const requireAdmin = require('../middlewares/requireAdmin');

// GET all products (public)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category) query.category = category;
    if (search)   query.$or = [
      { name:  { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } },
    ];
    console.log('GET /api/products query:', query);
    const products = await Product.find(query).sort({ createdAt: -1 });
    console.log('Found products:', products.length);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create product (admin only)
router.post('/', ClerkExpressRequireAuth(), requireAdmin, async (req, res) => {
  try {
    console.log('Creating product:', req.body);
    const existing = await Product.findOne({ id: req.body.id });
    if (existing) return res.status(400).json({ error: 'Product ID already exists' });
    const product = new Product(req.body);
    await product.save();
    console.log('Product saved:', product);
    res.status(201).json(product);
  } catch (err) {
    console.error('Error saving product:', err);
    res.status(400).json({ error: err.message });
  }
});

// PUT update product (admin only)
router.put('/:id', ClerkExpressRequireAuth(), requireAdmin, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE product (admin only)
router.delete('/:id', ClerkExpressRequireAuth(), requireAdmin, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;