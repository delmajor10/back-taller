const Order = require('../../domain/entities/order.entity');
const { NotFoundError } = require('../../domain/errors');

class OrderService {
    constructor(orderRepository, productRepository, couponRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;   // Para validar producto
        this.couponRepository = couponRepository;     // Para validar cupón
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
        const { productId, quantity, couponCode } = orderData;

        // Validar producto
        const product = await this.productRepository.getById(productId);
        if (!product) {
            throw new NotFoundError(`Product with id ${productId} not found`);
        }

        const unitPrice = product.price;

        // Validar cupón si existe
        let discount = 0;
        if (couponCode) {
            const coupon = await this.couponRepository.getByCode(couponCode);
            if (!coupon) {
                throw new NotFoundError(`Coupon with code ${couponCode} not found`);
            }
            discount = coupon.discount; // asumimos cantidad fija
        }

        // Calcular total
        const total = (unitPrice * quantity) - discount;
        if (total < 0) {
            throw new Error("Total cannot be negative");
        }

        const orderEntity = new Order(
            null,       // ID generado por DB
            product,    // referencia a Product
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

        const { productId, quantity, couponCode } = orderData;

        // Validar producto
        const product = await this.productRepository.getById(productId);
        if (!product) {
            throw new NotFoundError(`Product with id ${productId} not found`);
        }

        const unitPrice = product.price;

        // Validar cupón si existe
        let discount = 0;
        if (couponCode) {
            const coupon = await this.couponRepository.getByCode(couponCode);
            if (!coupon) {
                throw new NotFoundError(`Coupon with code ${couponCode} not found`);
            }
            discount = coupon.discount;
        }

        // Calcular total
        const total = (unitPrice * quantity) - discount;
        if (total < 0) {
            throw new Error("Total cannot be negative");
        }

        const orderEntity = new Order(
            id,
            product,
            quantity,
            unitPrice,
            couponCode || null,
            discount,
            total
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