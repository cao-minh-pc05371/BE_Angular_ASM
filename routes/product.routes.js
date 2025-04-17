const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const { checkJWT, isAdmin } = require('../middleware/authCheck');

//Public route - hiển thị danh sách và chi tiết sản phẩm
router.get('/product/list', ProductController.get);
router.get('/product/:id', ProductController.getById);

//Chỉ admin mới được thêm/sửa/xoá sản phẩm
router.post('/product/add', checkJWT, isAdmin, ProductController.add);
router.put('/product/:id', checkJWT, isAdmin, ProductController.update);
router.delete('/product/:id', checkJWT, isAdmin, ProductController.delete);

module.exports = router;
