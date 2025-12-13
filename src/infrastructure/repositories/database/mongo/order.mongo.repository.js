const OrderRepository = require('../../../../domain/repositories/order.repository.interface');
const OrderModel = require('./models/order.model');
const Order = require('../../../../domain/entities/order.entity');

class OrderMongoRepository extends OrderRepository {
    async getAll() {
        const orders = await OrderModel.find();
        return orders.map(o => new Order(
            o._id.toString(),
            o.product,
            o.quantity,
            o.unitPrice,
            o.couponCode,
            o.discount,
            o.total
        ));
    }

    async getById(id) {
        const order = await OrderModel.findById(id);
        if (!order) return null;
        return new Order(
            order._id.toString(),
            order.product,
            order.quantity,
            order.unitPrice,
            order.couponCode,
            order.discount,
            order.total
        );
    }

    async create(orderEntity) {
        const newOrder = new OrderModel({
            product: orderEntity.product,
            quantity: orderEntity.quantity,
            unitPrice: orderEntity.unitPrice,
            couponCode: orderEntity.couponCode,
            discount: orderEntity.discount,
            total: orderEntity.total
        });

        const savedOrder = await newOrder.save();
        return new Order(
            savedOrder._id.toString(),
            savedOrder.product,
            savedOrder.quantity,
            savedOrder.unitPrice,
            savedOrder.couponCode,
            savedOrder.discount,
            savedOrder.total
        );
    }

    async update(id, orderEntity) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, {
            product: orderEntity.product,
            quantity: orderEntity.quantity,
            unitPrice: orderEntity.unitPrice,
            couponCode: orderEntity.couponCode,
            discount: orderEntity.discount,
            total: orderEntity.total
        }, { new: true });

        if (!updatedOrder) return null;
        return new Order(
            updatedOrder._id.toString(),
            updatedOrder.product,
            updatedOrder.quantity,
            updatedOrder.unitPrice,
            updatedOrder.couponCode,
            updatedOrder.discount,
            updatedOrder.total
        );
    }

    async delete(id) {
        await OrderModel.findByIdAndDelete(id);
    }
}

module.exports = OrderMongoRepository;
