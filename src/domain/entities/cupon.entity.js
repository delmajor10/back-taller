class Cupon {
    constructor(id, tipoDescuento, valorDescuento, idProducto, fechaIni, fechaFin, estado) {
        this.id = id;
        this.tipoDescuento = tipoDescuento; //tipo Porcentaje del total o monto fijo
        this.valorDescuento = valorDescuento; //Porcentaje o monto
        this.idProducto = idProducto; //Producto a aplicar el descuento
        this.fechaIni = fechaIni; //fecha de inicio de la vigencia del cupon
        this.fechaFin = fechaFin; //fecha de finalización de la vigencia del cupon
        this.estado = estado; //Si esta vigente, expirado

    }
}

module.exports = Cupon;