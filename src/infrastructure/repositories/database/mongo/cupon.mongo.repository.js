const CuponRepository = require('../../../../domain/repositories/cupon.repository.interface');
const CuponModel = require('./models/cupon.model');
const Cupon = require('../../../../domain/entities/cupon.entity');

class CuponMongoRepository extends CuponRepository {
    async getAll() {
        const cupons = await CuponModel.find();
        return cupons.map(p => new Cupon(p._id.toString(), p.tipoDescuento, p.valorDescuento, p.idProducto, p.fechaIni, p.fechaFin, p.estado));
    }


    async getById(id) {
        const cupon = await CuponModel.findById(id);
        if (!cupon) return null;
        return new Cupon(cupon._id.toString(), cupon.tipoDescuento, cupon.valorDescuento, cupon.idProducto, cupon.fechaIni, cupon.fechaFin, cupon.estado);
    }

    async create(cuponEntity) {
        const newCupon = new CuponModel({
            tipoDescuento: cuponEntity.tipoDescuento,
            valorDescuento: cuponEntity.valorDescuento,
            idProducto: cuponEntity.idProducto,
            fechaIni: cuponEntity.fechaIni,
            fechaFin: cuponEntity.fechaFin,
            estado: cuponEntity.estado
        });
        const savedCupon = await newCupon.save();
        return new Cupon(savedCupon._id.toString(), savedCupon.tipoDescuento, savedCupon.valorDescuento, savedCupon.idProducto, savedCupon.fechaIni, savedCupon.fechaFin, savedCupon.estado);
    }

    async update(id, cuponEntity) {
        const updatedCupon = await CuponModel.findByIdAndUpdate(id, {
            tipoDescuento: cuponEntity.tipoDescuento,
            valorDescuento: cuponEntity.valorDescuento,
            idProducto: cuponEntity.idProducto,
            fechaIni: cuponEntity.fechaIni,
            fechaFin: cuponEntity.fechaFin,
            estado: cuponEntity.estado
        }, { new: true });

        if (!updatedCupon) return null;
        return new Cupon(updatedCupon._id.toString(), updatedCupon.tipoDescuento, updatedCupon.valorDescuento, updatedCupon.idProducto, updatedCupon.fechaIni, updatedCupon.fechaFin, updatedCupon.estado);
    }

    async delete(id) {
        await CuponModel.findByIdAndDelete(id);
    }
}

module.exports = CuponMongoRepository;