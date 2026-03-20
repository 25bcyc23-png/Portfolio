require('dotenv').config();

const express = require('express');
const mysql2  = require('mysql2');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 5000;

/*Middleware*/
app.use(express.json());
app.use(cors({
  origin: '*',          
  methods: ['GET','POST'],
}));

/*MySQL Connection Pool*/
const db = mysql2.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'portfolio_db',
  waitForConnections: true,
  connectionLimit:    10,
});

//Test connection on startup
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌  MySQL connection failed:', err.message);
    return;
  }
  console.log('✅  MySQL connected successfully');
  connection.release();
});

/*Helper: basic server-side validation*/
function validateContact({ name, email, subject, message }) {
  if (!name    || name.trim().length    < 1)   return 'Name is required.';
  if (!email   || email.trim().length   < 1)   return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address.';
  if (!subject || subject.trim().length < 1)   return 'Subject is required.';
  if (!message || message.trim().length < 10)  return 'Message must be at least 10 characters.';
  return null;                               
}

/*Routes*/

//Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: "Diya's portfolio API is running 🚀" });
});

//POST /api/contact—save form submission to MySQL
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  //Server-side validation
  const error = validateContact({ name, email, subject, message });
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  //Sanitise (trim whitespace)
  const data = {
    name:    name.trim(),
    email:   email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
  };

  const sql = `
    INSERT INTO contacts (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [data.name, data.email, data.subject, data.message], (err, results) => {
    if (err) {
      console.error('DB insert error:', err.message);
      return res.status(500).json({ success: false, message: 'Database error. Please try again.' });
    }

    console.log(`📩  New contact from ${data.name} <${data.email}> — ID #${results.insertId}`);

    return res.status(200).json({
      success: true,
      message: 'Message saved successfully!',
      id: results.insertId,
    });
  });
});

//GET/api/contacts—view all messages (protect this in production with auth!)
app.get('/api/contacts', (req, res) => {
  db.query('SELECT * FROM contacts ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Could not retrieve contacts.' });
    }
    res.json({ success: true, count: rows.length, data: rows });
  });
});

/*Start Server*/
app.listen(PORT, () => {
  console.log(`\n🌐  Server running at http://localhost:${PORT}`);
  console.log(`📋  POST contact messages → http://localhost:${PORT}/api/contact`);
  console.log(`📂  View all messages    → http://localhost:${PORT}/api/contacts\n`);
});
