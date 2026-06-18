const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  name:      { type: String, required: true },
  brand:     { type: String },
  price:     { type: Number, required: true },
  quantity:  { type: Number, required: true, default: 1 },
  image:     { type: String },
});

const orderSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true },
  items:       { type: [orderItemSchema], required: true },
  total:       { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    name:    String,
    address: String,
    city:    String,
    zip:     String,
    country: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);