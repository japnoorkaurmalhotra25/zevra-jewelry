const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createOrder,
  getMyOrders
} = require("../controllers/orderController");

// Place COD Order
router.post("/", authMiddleware, createOrder);

// User Order History
router.get("/my-orders", authMiddleware, getMyOrders);

module.exports = router;
