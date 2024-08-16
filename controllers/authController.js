const jwt = require('jsonwebtoken');
const db = require('../config/db');

const login = (req, res) => {
  const { username, password } = req.body;

  // تحقق من اسم المستخدم وكلمة المرور في قاعدة البيانات
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    // توليد الـ JWT مع payload يحتوي على معلومات المستخدم
    const token = jwt.sign({ id: user.id, role: user.role },  process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  });
};
const createUser = (req, res) => {
    const { username, password, role } = req.body;
  
    // تأكد من أن جميع الحقول المطلوبة تم توفيرها
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
  
    // تحقق من أن دور المستخدم هو إما 'user' أو 'admin'
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }
  
    // استعلام لإدخال المستخدم الجديد في قاعدة البيانات
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  
    db.query(query, [username, password, role], (err, result) => {
      if (err) throw err;
      res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    });
  };
module.exports = {
  login,
  createUser
};
