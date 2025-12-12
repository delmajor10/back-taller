const mongoose = require('mongoose');

const cuponSchema = new mongoose.Schema({
  tipoDescuento: { type: String, required: true, trim: true }, //tipo Porcentaje del total o monto fijo
  valorDescuento: { type: Number, required: true, min: 0 }, //Porcentaje o monto
  idProducto: { type: String, required: true}, //Producto a aplicar el descuento
  fechaIni: { type: Date, required: true}, //fecha de inicio de la vigencia del cupon
  fechaFin: { type: Date, required: true }, //fecha de finalización de la vigencia del cupon
  estado: { type: String, required: true }, //Si esta vigente, expirado
}, { timestamps: true });

module.exports = mongoose.model('Cupon', cuponSchema);
