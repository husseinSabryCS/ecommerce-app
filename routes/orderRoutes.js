const express = require('express');
const { createOrder, getAllOrders,getAllOrdersExcel } = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/Excel', getAllOrdersExcel);
module.exports = router;
