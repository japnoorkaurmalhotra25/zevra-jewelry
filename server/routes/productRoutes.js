const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware"); // 👈 ADD THIS

// PUBLIC
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// ADMIN
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 5), // 👈 ADD THIS
  createProduct
);

router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
