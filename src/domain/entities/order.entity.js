class Order {
    constructor(id, productMap, quantity, unitPrice, couponCode, discount, total) {
        this.id = id;
        this.productId = productMap.id;    
        this.product = productMap.name;
        this.quantity = quantity;      
        this.unitPrice = unitPrice; 
        this.couponCode = couponCode;   
        this.discount = discount;
        this.total = total;
    }

    toResponse() {
        return {
            id: this.id,
            product: this.product,
            quantity: this.quantity,
            unitPrice: this.unitPrice,
            couponCode: this.couponCode,
            discount: this.discount,
            total: this.total,
        };
    }

}

module.exports = Order;
