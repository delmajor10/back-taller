const Order = require('../../domain/entities/order.entity');
const { NotFoundError } = require('../../domain/errors');

class OrderService {
    
    constructor(orderRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    async getAllOrders() {
        return this.orderRepository.getAll();
    }

    async getOrderById(id) {
        const order = await this.orderRepository.getById(id);
        if (!order) {
            throw new NotFoundError(`Order with id ${id} not found`);
        }
        return order;
    }

    async createOrder(orderData) {
        const { product: productIdentifier, quantity, couponCode } = orderData; 

        const product = await this.productRepository.getByName(productIdentifier); 

        if (!product) {
            throw new NotFoundError(`Product with name ${productIdentifier} not found`);
        }

        const unitPrice = product.price;

        const discount = 0; 
        const total = (unitPrice * quantity) - discount;

        const orderEntity = new Order(
            null, 
            { id: product.id, name: product.name },
            quantity,
            unitPrice,
            couponCode || null,
            discount,
            total
        );
        
        return this.orderRepository.create(orderEntity);
    }
    
    async updateOrder(id, orderData) {

        const existingOrder = await this.orderRepository.getById(id);

        if (!existingOrder) {
            throw new NotFoundError(`Order with id ${id} not found`);
        }

        const { product: productIdentifier, quantity, couponCode } = orderData; 
        
        let currentProductId = existingOrder.productId; 
        let currentProductName = existingOrder.product;
        let currentUnitPrice = existingOrder.unitPrice; 
        let productDetails = null; 

        if (productIdentifier) {
            productDetails = await this.productRepository.getByName(productIdentifier); 
            
            if (!productDetails) {
                throw new NotFoundError(`El producto con nombre "${productIdentifier}" no existe o no está disponible.`);
            }

            currentProductId = productDetails.id;
            currentProductName = productDetails.name;
            currentUnitPrice = productDetails.price;
        }

        const finalQuantity = quantity !== undefined ? quantity : existingOrder.quantity;
        const finalUnitPrice = currentUnitPrice; 
        const finalCouponCode = couponCode !== undefined ? couponCode : existingOrder.couponCode;
        
        const discount = 0; 
        const total = (finalUnitPrice * finalQuantity) - discount;

        const updatedOrderEntity = new Order(
            id, 
            { id: currentProductId, name: currentProductName }, 
            finalQuantity,
            finalUnitPrice,
            finalCouponCode,
            discount,
            total
        );


        return this.orderRepository.update(id, updatedOrderEntity); 
    }

    async deleteOrder(id) {
        const order = await this.orderRepository.getById(id);
        if (!order) {
            throw new NotFoundError(`Order with id ${id} not found`);
        }
        return this.orderRepository.delete(id);
    }
    
}

module.exports = OrderService; 