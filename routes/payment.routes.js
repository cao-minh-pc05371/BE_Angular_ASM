const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/payment.controller');
const { checkJWT, isAdmin } = require('../middleware/authCheck');

// Lấy toàn bộ thanh toán (admin)
router.get('/payment/list', checkJWT, isAdmin, PaymentController.get);

// Lấy thanh toán theo đơn hàng (admin hoặc chủ đơn)
router.get('/payment/order/:order_id', checkJWT, PaymentController.getByOrder);

// Tạo thanh toán mới (người dùng)
router.post('/payment/add', checkJWT, PaymentController.add);

// Cập nhật trạng thái thanh toán (admin)
router.put('/payment/:id', checkJWT, isAdmin, PaymentController.update);

// Xóa thanh toán (admin)
router.delete('/payment/:id', checkJWT, isAdmin, PaymentController.delete);

module.exports = router;
