const db = require('../config/db');
const ExcelJS = require('exceljs');
const moment = require('moment');
const createOrder = (req, res) => {
    const { customer_name, address, phone1, phone2, product_id, quantity } = req.body;
  
    // الحصول على تاريخ اليوم بالفورمات المطلوب
    const order_date = moment().format('YYYY-MM-DD');
  
    // استعلام للحصول على سعر المنتج بناءً على product_id
    const priceQuery = 'SELECT price FROM products WHERE id = ?';
  
    db.query(priceQuery, [product_id], (err, priceResult) => {
      if (err) throw err;
  
      // التأكد من العثور على المنتج
      if (priceResult.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const price = priceResult[0].price *quantity;
       
      // استعلام لإدخال الطلب مع السعر المسترجع
      const orderQuery = 'INSERT INTO orders (customer_name, address, phone1, phone2, product_id, quantity, order_date, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
      db.query(orderQuery, [customer_name, address, phone1, phone2, product_id, quantity, order_date, price], (err, result) => {
        if (err) throw err;
        const orderIdMessage = ` شكرا تم تسجيل طلبك رقم الطلب هو ${result.insertId}`;
        res.status(201).json({ orderId: result.insertId, message: orderIdMessage });
      });
    });
  };
const getAllOrders = (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};



const getAllOrdersExcel = (req, res) => {
    // احصل على التاريخ من الطلب أو استخدم تاريخ اليوم كقيمة افتراضية
    const orderDate = req.body.date || moment().format('YYYY-MM-DD');
  console.log(orderDate);
    // الاستعلام مع استخدام التاريخ كشرط
    db.query(
      'SELECT * FROM orders WHERE DATE(order_date) = ?',
      [orderDate],
      async (err, results) => {
        if (err) throw err;
  
        // إنشاء ملف Excel جديد
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Orders');
  
        // إضافة رؤوس الأعمدة
        worksheet.columns = [
          { header: 'Order ID', key: 'id', width: 10 },
          { header: 'Customer Name', key: 'customer_name', width: 30 },
          { header: 'Address', key: 'address', width: 50 },
          { header: 'Phone 1', key: 'phone1', width: 15 },
          { header: 'Phone 2', key: 'phone2', width: 15 },
          { header: 'Product ID', key: 'product_id', width: 10 },
          { header: 'Price', key: 'Price', width: 10 },
          { header: 'Quantity', key: 'quantity', width: 10 },
          { header: 'Order Date', key: 'order_date', width: 20 }
        ];
  
        // إضافة البيانات إلى الورقة
        results.forEach(order => {
          worksheet.addRow(order);
        });
  
        // إعداد الاستجابة مع ملف Excel
        res.setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');
  
        // إرسال ملف Excel كاستجابة
        await workbook.xlsx.write(res);
        res.end();
      }
    );
  };
  


module.exports = {
  createOrder,
  getAllOrders,
  getAllOrdersExcel
};
