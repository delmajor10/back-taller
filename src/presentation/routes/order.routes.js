const { Router } = require('express');

const OrderController = require('../controller/order.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');
const asyncHandler = require('../utils/async.handler');

const OrderService = require('../../application/use-cases/order.service');
const OrderMongoRepository = require('../../infrastructure/repositories/database/mongo/order.mongo.repository');
const ProductMongoRepository = require('../../infrastructure/repositories/database/mongo/product.mongo.repository');
const CouponMongoRepository = require('../../infrastructure/repositories/database/mongo/coupon.mongo.repository');

const orderRepository = new OrderMongoRepository();
const productRepository = new ProductMongoRepository();
const couponRepository = new CouponMongoRepository();

const orderService = new OrderService(orderRepository, productRepository, couponRepository);
const orderController = new OrderController(orderService);

const router = Router();

router.get('/', asyncHandler(orderController.getAll));
router.get('/:id', asyncHandler(orderController.getById));
router.post('/', [authenticateToken, isAdmin], asyncHandler(orderController.create));
router.put('/:id', [authenticateToken, isAdmin], asyncHandler(orderController.update));
router.delete('/:id', [authenticateToken, isAdmin], asyncHandler(orderController.delete));

module.exports = router;