const multer = require('multer');
const path = require('path');

// إعداد التخزين لـ Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // تحديد مجلد التخزين
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // تسمية الملفات
  }
});

// إعداد الـ Middleware لـ Multer
const upload = multer({ storage: storage });

module.exports = upload;
