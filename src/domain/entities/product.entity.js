class Product {
    constructor(id, name, description, price, stock, category, imageUrl, marca) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.imageUrl = imageUrl;
        this.marca = marca;
    }
}

module.exports = Product;