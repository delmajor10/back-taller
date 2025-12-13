const Coupon = require('../../domain/entities/coupon.entity');
const { NotFoundError } = require('../../domain/errors');

class CouponService {
    constructor(couponRepository) { 
        this.couponRepository = couponRepository;
    }
    
    async getAllCoupons() {
        return this.couponRepository.getAll();
    }

    async getCouponById(id) {
        const coupon = await this.couponRepository.getById(id);
        if (!coupon) {
            throw new NotFoundError(`Coupon with id ${id} not found`);
        }
        return coupon;
    }

    async createCoupon(couponData) {
        const couponEntity = new Coupon(
            null, 
            couponData.tipoDescuento, //tipo Porcentaje del total o monto fijo
            couponData.valorDescuento, //Porcentaje o monto
            couponData.fechaIni, //fecha de inicio de la vigencia del cupon
            couponData.fechaFin, //fecha de finalización de la vigencia del cupon
            couponData.estado, //Si esta vigente, expirado
            couponData.codCupon
        );
        return this.couponRepository.create(couponEntity);
    }

    async updateCoupon(id, couponData) {
        const existingCoupon = await this.couponRepository.getById(id);
        if (!existingCoupon) {
            throw new NotFoundError(`Coupon with id ${id} not found`);
        }

        const couponEntity = new Coupon(
            id,
            couponData.tipoDescuento, 
            couponData.valorDescuento,
            couponData.fechaIni, 
            couponData.fechaFin, 
            couponData.estado,
            couponData.codCupon
        );
        return this.couponRepository.update(id, couponEntity);
    }

    async deleteCoupon(id) {
        const coupon = await this.couponRepository.getById(id);
        if (!coupon) {
            throw new NotFoundError(`Coupon with id ${id} not found`);
        }
        return this.couponRepository.delete(id);
    }
}
module.exports = CouponService;