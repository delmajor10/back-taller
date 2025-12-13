const OrderRepository = require('../../../../domain/repositories/order.repository.interface');
const OrderModel = require('./models/order.model'); 
const Order = require('../../../../domain/entities/order.entity'); 

class OrderMongoRepository extends OrderRepository {
    
    _mapProductData(orderDoc) {
        if (orderDoc.product) {
            return {
                id: orderDoc.product._id.toString(), 
                name: orderDoc.product.name  
            };
        }
        return { 
            id: null, 
            name: 'Producto no disponible / Eliminado' 
        };
    }

    async getAll() {
        const orders = await OrderModel.find().populate('product'); 
        return orders.map(o =>
            new Order(
                o._id.toString(),
                this._mapProductData(o), 
                o.quantity,
                o.unitPrice,
                o.couponCode,
                o.discount,
                o.total
            )
        );
    }

    async getById(id) {
        const order = await OrderModel.findById(id).populate('product'); 
        if (!order) return null;

        return new Order(
            order._id.toString(),
            this._mapProductData(order),
            order.quantity,
            order.unitPrice,
            order.couponCode,
            order.discount,
            order.total
        );
    }

    async create(orderEntity) {
        const newOrder = new OrderModel({
            
            product: orderEntity.productId,
            quantity: orderEntity.quantity,
            unitPrice: orderEntity.unitPrice,
            couponCode: orderEntity.couponCode,
            discount: orderEntity.discount,
            total: orderEntity.total
        });

        const savedOrder = await newOrder.save();

        await savedOrder.populate('product'); 

        return new Order(
            savedOrder._id.toString(),
            this._mapProductData(savedOrder),
            savedOrder.quantity,
            savedOrder.unitPrice,
            savedOrder.couponCode,
            savedOrder.discount,
            savedOrder.total
        );
    }

    async update(id, orderEntity) {

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            {
                product: orderEntity.productId,
                quantity: orderEntity.quantity,
                unitPrice: orderEntity.unitPrice,
                couponCode: orderEntity.couponCode,
                discount: orderEntity.discount,
                total: orderEntity.total
            },
            { new: true }
        ).populate('product');

        if (!updatedOrder) return null;

        return new Order(
            updatedOrder._id.toString(),
            this._mapProductData(updatedOrder), 
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