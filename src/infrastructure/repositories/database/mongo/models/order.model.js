const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, //de Product
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  couponCode: { type: String, default: null },   // opcional
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);