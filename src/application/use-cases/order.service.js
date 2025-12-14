const Order = require('../../domain/entities/order.entity');
const { NotFoundError, BadRequestError } = require('../../domain/errors');

class OrderService {
    
    constructor(orderRepository, productRepository, couponRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.couponRepository = couponRepository;
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

        const totalAntesDeDescuento = unitPrice * quantity;

        let finalDiscount = 0;
        let finalCouponCode = couponCode || null;

        if (couponCode) {
            const coupon = await this.couponRepository.getByCode(finalCouponCode);
            if (coupon.valorDescuento > totalAntesDeDescuento) {
                throw new BadRequestError('Coupon invalid: Discount exceeds order subtotal.');
            }
            // el descuento debe ser un monto fijo
            finalDiscount = coupon.valorDescuento; 
            finalCouponCode = coupon.codCupon;
        }

        const total = totalAntesDeDescuento - finalDiscount;

        const orderEntity = new Order(
            null, 
            { id: product.id, name: product.name },
            quantity,
            unitPrice,
            finalCouponCode,
            finalDiscount,
            total
        );
        
        return this.orderRepository.create(orderEntity);
    }
    
    async updateOrder(id, orderData) {

        const existingOrder = await this.orderRepository.getById(id);

        if (!existingOrder) {
            throw new NotFoundError(`Order with id ${id} not found`);
        }

        let currentProductId = existingOrder.productId; 
        let currentProductName = existingOrder.product;
        let currentUnitPrice = existingOrder.unitPrice; 
        let productDetails = null; 

        // ... (Lógica para determinar el nuevo precio unitario) ...

        const finalQuantity = orderData.quantity !== undefined ? orderData.quantity : existingOrder.quantity;
        const finalUnitPrice = currentUnitPrice; 
        
        const finalCouponCode = orderData.couponCode !== undefined ? orderData.couponCode : existingOrder.couponCode;

        let finalDiscount = 0; 

        if (finalCouponCode && typeof finalCouponCode === 'string' && finalCouponCode.trim() !== '') {
            
            // subtotal
            const totalBeforeDiscount = finalUnitPrice * finalQuantity; 
            
            const coupon = await this.couponRepository.getByCode(finalCouponCode.trim()); 
            
            if (coupon) {

                if (coupon.valorDescuento > totalBeforeDiscount) {
                    throw new BadRequestError('Coupon invalid: Discount exceeds order subtotal.');
                }
                finalDiscount = coupon.valorDescuento; // Descuento monto fijo
            } else {
                console.log(`[AVISO] Cupón ${finalCouponCode} no encontrado durante el update. Será removido.`);
                finalCouponCode = null; 
            }
        } else {
            finalCouponCode = null;
        }

        const total = totalBeforeDiscount - finalDiscount; 

        const updatedOrderEntity = new Order(
            id, 
            { id: currentProductId, name: currentProductName }, 
            finalQuantity,
            finalUnitPrice,
            finalCouponCode, 
            finalDiscount,   
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