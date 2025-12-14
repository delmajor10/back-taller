const CouponRepository = require('../../../../domain/repositories/coupon.repository.interface');
const CouponModel = require('./models/coupon.model');
const Coupon = require('../../../../domain/entities/coupon.entity');

class CouponMongoRepository extends CouponRepository {
    async getAll() {
        const coupons = await CouponModel.find();
        return coupons.map(p => new Coupon(p._id.toString(), p.tipoDescuento, p.valorDescuento, p.fechaIni, p.fechaFin, p.estado, p.codCupon));
    }


    async getById(id) {
        const coupon = await CouponModel.findById(id);
        if (!coupon) return null;
        return new Coupon(coupon._id.toString(), coupon.tipoDescuento, coupon.valorDescuento, coupon.fechaIni, coupon.fechaFin, coupon.estado, coupon.codCupon);
    }

    async create(couponEntity) {
        const newCoupon = new CouponModel({
            tipoDescuento: couponEntity.tipoDescuento,
            valorDescuento: couponEntity.valorDescuento,
            fechaIni: couponEntity.fechaIni,
            fechaFin: couponEntity.fechaFin,
            estado: couponEntity.estado,
            codCupon: couponEntity.codCupon
        });
        const savedCoupon = await newCoupon.save();
        return new Coupon(savedCoupon._id.toString(), savedCoupon.tipoDescuento, savedCoupon.valorDescuento, savedCoupon.fechaIni, savedCoupon.fechaFin, savedCoupon.estado, savedCoupon.codCupon);
    }

    async update(id, couponEntity) {
        const updatedCoupon = await CouponModel.findByIdAndUpdate(id, {
            tipoDescuento: couponEntity.tipoDescuento,
            valorDescuento: couponEntity.valorDescuento,
            fechaIni: couponEntity.fechaIni,
            fechaFin: couponEntity.fechaFin,
            estado: couponEntity.estado,
            codCupon: couponEntity.codCupon
        }, { new: true });

        if (!updatedCoupon) return null;
        return new Coupon(updatedCoupon._id.toString(), updatedCoupon.tipoDescuento, updatedCoupon.valorDescuento, updatedCoupon.fechaIni, updatedCoupon.fechaFin, updatedCoupon.estado, updatedCoupon.codCupon);
    }

    async delete(id) {
        await CouponModel.findByIdAndDelete(id);
    }

    async getByCode(code) {

        const coupon = await CouponModel.findOne({ codCupon: code }); 
        
        if (!coupon) return null;

        return new Coupon(
            coupon._id.toString(),      
            coupon.tipoDescuento,      
            coupon.valorDescuento,     
            coupon.fechaIni,           
            coupon.fechaFin,          
            coupon.estado,             
            coupon.codCupon            
        );
    }    

}

module.exports = CouponMongoRepository;