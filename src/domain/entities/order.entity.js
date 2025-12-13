class Order {
    constructor(id, product, quantity, unitPrice, couponCode = null, discount = 0, total) {
        this.id = id;
        this.product = product;       // de Product
        this.quantity = quantity;     // de Product
        this.unitPrice = unitPrice; 
        this.couponCode = couponCode; // opcional de Cupon
        this.discount = discount;     // opcional de Cupon
        this.total = total;
    }
}

module.exports = Order;
