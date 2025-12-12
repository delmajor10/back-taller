class Order {
    constructor(id, product, description, quantity, price, discount, total, date) {
        this.id = id;
        this.product = product;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.discount = discount;
        this.total = total;
        this.date = date;
    }
}

module.exports = Order;
