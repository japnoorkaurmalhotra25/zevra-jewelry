const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} = require("../controllers/orderController");


// User
router.post("/", authMiddleware, createOrder);
router.get("/my-orders", authMiddleware, getMyOrders);
router.put("/:orderId/cancel", authMiddleware, cancelOrder);


// Admin
router.get("/", authMiddleware, adminMiddleware, getAllOrders);
router.put("/:orderId/status", authMiddleware, adminMiddleware, updateOrderStatus);


module.exports = router;
