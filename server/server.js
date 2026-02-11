const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

// Add error handling for DB connection
connectDB().catch(err => {
  console.error("❌ MongoDB connection failed:", err);
  process.exit(1);
});

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// Test route to verify server is working
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 2525;

const server = app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
  console.log(`🔗 Try: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error("❌ Server error:", err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use!`);
  }
});