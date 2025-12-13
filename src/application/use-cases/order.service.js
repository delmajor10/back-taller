const Order = require('../../domain/entities/order.entity');
const { NotFoundError } = require('../../domain/errors');

class OrderService {
    constructor(orderRepository) { // igual que ProductService
        this.orderRepository = orderRepository;
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
        const orderEntity = new Order(
            null,                   // ID generado por la DB
            orderData.product,      // nombre del producto
            orderData.quantity,
            orderData.unitPrice,
            orderData.couponCode || null,
            orderData.discount || 0,
            orderData.total
        );
        return this.orderRepository.create(orderEntity);
    }

    async updateOrder(id, orderData) {
        const existingOrder = await this.orderRepository.getById(id);
        if (!existingOrder) {
            throw new NotFoundError(`Order with id ${id} not found`);
        }

        const orderEntity = new Order(
            id,
            orderData.product,
            orderData.quantity,
            orderData.unitPrice,
            orderData.couponCode || null,
            orderData.discount || 0,
            orderData.total
        );
        return this.orderRepository.update(id, orderEntity);
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
