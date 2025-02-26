const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const db = require('./database');

const app = express();
app.use(bodyParser.json());

const JWT_SECRET = "whatthed ogdoin";

// Middleware ตรวจสอบ Token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token.split(" ")[1], JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.user = decoded;
        next();
    });
};

// **1. ลงทะเบียนลูกค้า**
app.post("/register", (req, res) => {
    const { fullName, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 8);

    db.query("INSERT INTO Customers (FullName, Email, Password) VALUES (?, ?, ?)", [fullName, email,hashPassword], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Customer registered successfully" });
    });
});

// **2. Login**
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM Customers WHERE Email = ?", [email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        // ตรวจสอบว่าพบผู้ใช้หรือไม่
        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = result[0]; // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const hashedPassword = user.Password;

        // ตรวจสอบว่ารหัสผ่านถูกต้องหรือไม่
        if (!hashedPassword || !bcrypt.compareSync(password, hashedPassword)) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // สร้าง JWT Token
        const token = jwt.sign(
            { id: user.CustomerID, email: user.Email },
            JWT_SECRET,
            { expiresIn: "2h" } // Token หมดอายุใน 2 ชั่วโมง
        );

        res.json({ message: "Login successful", token });
    });
});


// **3. ดูรายการสินค้า (GET /products)**
app.get("/products", verifyToken, (req, res) => {
    db.query("SELECT * FROM Products", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// **4. สร้าง Order (POST /orders)**
app.post("/orders", verifyToken, (req, res) => {
    const { customerID, orderDate, products } = req.body;

    if (!customerID || !orderDate || !products || products.length === 0) {
        return res.status(400).json({ error: "Invalid request data" });
    }
    // คำนวณ total_price จากสินค้า
    let totalPrice = products.reduce((sum, p) => sum + p.quantity * p.price, 0);

    // เพิ่มคำสั่ง INSERT เข้าไปในตาราง `order`
    const insertOrderQuery = "INSERT INTO `orders` (OrderDate, CustomerID, total_price) VALUES (?, ?, ?)";
    db.query(insertOrderQuery, [orderDate, customerID, totalPrice], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const orderID = result.insertId; // ดึง OrderID ที่เพิ่งถูกเพิ่ม
        const orderDetails = products.map(p => [orderID, p.productID, p.quantity, p.price]);

        // เพิ่มข้อมูลลงตาราง `orderdetail`
        const insertOrderDetailQuery = "INSERT INTO order_details (OrderID, ProductID, Quantity, Price) VALUES ?";
        db.query(insertOrderDetailQuery, [orderDetails], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Order placed successfully", orderID, totalPrice });
        });
    });
});

// **5. เพิ่มการชำระเงิน (POST /payments)**
app.post("/payments", verifyToken, (req, res) => {
    const { orderID, paymentMethod, amount, paymentStatus } = req.body;

    if (!orderID || !paymentMethod || !amount || !paymentStatus) {
        return res.status(400).json({ error: "Invalid request data" });
    }

    // ตรวจสอบว่า paymentMethod เป็น string ที่ไม่ว่างเปล่า
    if (typeof paymentMethod !== 'string' || paymentMethod.trim() === '') {
        return res.status(400).json({ error: "Invalid payment method" });
    }

    // ตรวจสอบว่า paymentStatus เป็นค่าที่ถูกต้องหรือไม่ (optional)
    const validPaymentStatuses = ['pending', 'completed', 'failed']; // ตัวอย่างค่าที่เป็นไปได้
    if (!validPaymentStatuses.includes(paymentStatus)) {
        return res.status(400).json({ error: "Invalid payment status" });
    }

    const insertPaymentQuery = "INSERT INTO `payments` (OrderID, PaymentMethod, Amount, PaymentStatus) VALUES (?, ?, ?, ?)";
    db.query(insertPaymentQuery, [orderID, paymentMethod, amount, paymentStatus], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Payment added successfully", paymentID: result.insertId });
    });
});

// **6. ดูข้อมูลการชำระเงิน (GET /payments)**
app.get("/payments", verifyToken, (req, res) => {
    db.query("SELECT * FROM payments", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


app.listen(3000, () => {
    console.log(`Server running on port http://localhost:3000`);
});