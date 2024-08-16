const express = require('express');
const { createUser,login } = require('../controllers/authController');
const { authenticateJWT, authorizeAdmin } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/users',authenticateJWT,authorizeAdmin, createUser);

router.post('/login', login );
module.exports = router;




