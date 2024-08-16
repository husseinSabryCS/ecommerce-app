const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// إعداد Multer لتخزين الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const getProductsByType = (req, res) => {
  const { type } = req.params;
  db.query('SELECT * FROM products WHERE type = ?', [type], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const addProduct = (req, res) => {
  const { name, price, type, description } = req.body;
  const images = req.files.map(file => file.filename);

  db.query('INSERT INTO products (name, price, type, description, images) VALUES (?, ?, ?, ?, ?)', 
    [name, price, type, description, JSON.stringify(images)], 
    (err, result) => {
      if (err) throw err;
      res.status(201).json({ productId: result.insertId });
  });
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, type, description } = req.body;
  const images = req.files ? req.files.map(file => file.filename) : null;

  let query = 'UPDATE products SET name = ?, price = ?, type = ?, description = ?';
  const params = [name, price, type, description];

  if (images) {
    query += ', images = ?';
    params.push(JSON.stringify(images));
  }

  query += ' WHERE id = ?';
  params.push(id);

  db.query(query, params, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Product updated successfully' });
  });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Product deleted successfully' });
  });
};

module.exports = {
  
  getAllProducts,
  getProductsByType,
  addProduct,
  updateProduct,
  deleteProduct
};
