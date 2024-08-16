const express = require('express');
const { createOrder, getAllOrders,getAllOrdersExcel } = require('../controllers/orderController');
const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', createOrder);
router.get('/',authenticateJWT,authorizeAdmin, getAllOrders);
router.get('/Excel',authenticateJWT,authorizeAdmin, getAllOrdersExcel);
module.exports = router;
