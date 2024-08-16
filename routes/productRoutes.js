const express = require('express');
const { getAllProducts, getProductsByType, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const upload = require('../middleware/multer'); // استيراد الـ Middleware

const router = express.Router();

router.get('/', getAllProducts);
router.get('/type/:type', getProductsByType);
router.post('/', upload.array('images', 5), addProduct); // استخدام Multer لرفع الصور عند إضافة منتج
router.put('/:id', upload.array('images', 5), updateProduct); // استخدام Multer لتحديث الصور عند تعديل المنتج
router.delete('/:id', deleteProduct); // حذف منتج

module.exports = router;
