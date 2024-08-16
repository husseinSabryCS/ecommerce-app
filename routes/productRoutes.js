const express = require('express');
const { getAllProducts, getProductsByType, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const upload = require('../middleware/multer'); // استيراد الـ Middleware
const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/type/:type', getProductsByType);
router.post('/', upload.array('images', 5),authenticateJWT,authorizeAdmin, addProduct); // استخدام Multer لرفع الصور عند إضافة منتج
router.put('/:id', upload.array('images', 5),authenticateJWT,authorizeAdmin, updateProduct); // استخدام Multer لتحديث الصور عند تعديل المنتج
router.delete('/:id',authenticateJWT,authorizeAdmin, deleteProduct); // حذف منتج

module.exports = router;
