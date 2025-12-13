const { Router } = require('express');
const CouponController = require('../controller/coupon.controller');
const authenticateToken = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');
const asyncHandler = require('../utils/async.handler');

const CouponService = require('../../application/use-cases/coupon.service');
const CouponMongoRepository = require('../../infrastructure/repositories/database/mongo/coupon.mongo.repository');

const couponRepository = new CouponMongoRepository();
const couponService = new CouponService(couponRepository);
const couponController = new CouponController(couponService);

const router = Router();

/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Retrieve a list of coupons
 *     responses:
 *       200:
 *         description: A list of coupons.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 */
router.get('/', asyncHandler(couponController.getAll));

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     summary: Retrieve a single coupon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single coupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon not found
 */
router.get('/:id', asyncHandler(couponController.getById));

/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: Create a new coupon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       201:
 *         description: The created Coupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Bad request
 *       409:
 *         description: Coupon with this email already exists
 */
router.post('/', [authenticateToken, isAdmin], asyncHandler(couponController.create));

/**
 * @swagger
 * /coupons/{id}:
 *   put:
 *     summary: Update a coupons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: User not found
 */
router.put('/:id', [authenticateToken, isAdmin], asyncHandler(couponController.update));

/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Delete a coupon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Coupon not found
 */
router.delete('/:id', [authenticateToken, isAdmin], asyncHandler(couponController.delete));

module.exports = router;
