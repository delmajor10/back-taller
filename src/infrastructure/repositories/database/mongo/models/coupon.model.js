const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  tipoDescuento: { type: String, required: true}, 
  valorDescuento: { type: Number, required: true, min: 0 }, 
  fechaIni: { type: Date, required: true}, 
  fechaFin: { type: Date, required: true }, 
  estado: { type: String, required: true },
  codCupon: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
