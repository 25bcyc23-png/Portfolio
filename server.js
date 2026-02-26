const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "nunnu151007",
    database: "portfolio"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL Database!");
});

app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Error saving message" });
        } else {
            res.json({ message: "Message saved successfully!" });
        }
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});