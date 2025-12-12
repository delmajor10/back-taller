const Order = require('../../domain/entities/order.entity');
const { NotFoundError } = require('../../domain/errors');

class OrderService {
    constructor(orderRepository) {
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
        const {
            product,
            description,
            quantity,
            price,
            discount = 0,
            total,
            date = new Date()
        } = orderData;

        // Validación básica (puedes ajustar según tu lógica)
        if (!product || !quantity || !price || total === undefined) {
            throw new Error("Missing required order fields");
        }

        // Aquí podrías agregar validación para total correcto:
        // Ejemplo: total esperado = (price * quantity) - discount
        const expectedTotal = (price * quantity) - discount;
        if (total !== expectedTotal) {
            throw new Error(`Invalid total. Expected ${expectedTotal}, got ${total}`);
        }

        const orderEntity = new Order(
            null, // ID se genera en la base
            product,
            description,
            quantity,
            price,
            discount,
            total,
            date
        );

        return this.orderRepository.create(orderEntity);
    }

    async updateOrder(id, orderData) {
        const existingOrder = await this.orderRepository.getById(id);
        if (!existingOrder) {
            throw new NotFoundError(`Order with id ${id} not found`);
        }

        const {
            product,
            description,
            quantity,
            price,
            discount = 0,
            total,
            date = existingOrder.date
        } = orderData;

        // Validación básica
        if (!product || !quantity || !price || total === undefined) {
            throw new Error("Missing required order fields");
        }

        // Validar total también en update
        const expectedTotal = (price * quantity) - discount;
        if (total !== expectedTotal) {
            throw new Error(`Invalid total. Expected ${expectedTotal}, got ${total}`);
        }

        const orderEntity = new Order(
            id,
            product,
            description,
            quantity,
            price,
            discount,
            total,
            date
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
