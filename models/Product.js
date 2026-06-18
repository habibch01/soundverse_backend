const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id:       { type: Number, required: true, unique: true },
  name:     { type: String, required: true },
  brand:    { type: String, required: true },
  price:    { type: Number, required: true },
  oldPrice: { type: Number },
  category: { type: String, enum: ['AirPods', 'Over-Ear', 'Earbuds', 'Gaming'], required: true },
  stock:    { type: Number, required: true, default: 0 },
  image:    { type: String },
  color:    { type: String },
  rating:   { type: Number, default: 4.0 },
  reviews:  { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);