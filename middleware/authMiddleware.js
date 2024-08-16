const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  // الحصول على التوكن من الهيدر Authorization
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Not authorized.' });
  }
  next();
};




module.exports = {
  authenticateJWT,
  authorizeAdmin,
  
};
