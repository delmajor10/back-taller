const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
