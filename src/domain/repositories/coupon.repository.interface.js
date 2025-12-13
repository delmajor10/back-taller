class CouponRepository {
    constructor() {
        if (this.constructor === CouponRepository) {
            throw new Error("Cannot instantiate abstract class");
        }
    }

    async getAll() {
        throw new Error("Method 'getAll()' must be implemented.");
    }

    async getById(id) {
        throw new Error("Method 'getById()' must be implemented.");
    }

    async create(coupon) {
        throw new Error("Method 'create()' must be implemented.");
    }

    async update(id, coupon) {
        throw new Error("Method 'update()' must be implemented.");
    }

    async delete(id) {
        throw new Error("Method 'delete()' must be implemented.");
    }
}

module.exports = CouponRepository;