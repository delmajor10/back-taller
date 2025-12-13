const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  //product: { type: String, required: true, trim: true }, 

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },

  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  couponCode: { type: String, default: null }, // opcional
  discount: { type: Number, default: 0, min: 0 },
  total: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
