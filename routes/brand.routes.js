const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/brand.controller');
const { checkJWT, isAdmin } = require('../middleware/authCheck');

router.get('/brand/list', BrandController.get); // công khai
router.get('/brand/:id', BrandController.getById); // công khai

// Các route bên dưới cần admin
router.post('/brand/add', checkJWT, isAdmin, BrandController.create);
router.put('/brand/:id', checkJWT, isAdmin, BrandController.update);
router.delete('/brand/:id', checkJWT, isAdmin, BrandController.delete);

module.exports = router;
