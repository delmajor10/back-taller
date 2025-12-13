class Coupon {
    constructor(id, tipoDescuento, valorDescuento, fechaIni, fechaFin, estado, codCupon) {
        this.id = id;
        this.tipoDescuento = tipoDescuento; 
        this.valorDescuento = valorDescuento; 
        this.fechaIni = fechaIni; 
        this.fechaFin = fechaFin; 
        this.estado = estado; 
        this.codCupon = codCupon; 
    }
}

module.exports = Coupon;