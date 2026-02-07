const Product = require("../models/Product");

// @desc   Create new product (ADMIN)
// @route  POST /api/products
// @access Admin
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      metal,
      weight,
      stock,
      isFeatured
    } = req.body;

    if (!name || !description || !price || !category || !metal || !weight) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Extract Cloudinary image URLs
    console.log("FILES RECEIVED:", req.files);
    const images = req.files ? req.files.map(file => file.path) : [];

    const product = await Product.create({
      name,
      description,
      price,
      category,
      metal,
      weight,
      stock,
      isFeatured,
      images,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Product created with images",
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// @desc   Get all products (PUBLIC)
// @route  GET /api/products
// @access Public
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get single product
// @route  GET /api/products/:id
// @access Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update product (ADMIN)
// @route  PUT /api/products/:id
// @access Admin
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated",
      product
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Delete product (ADMIN)
// @route  DELETE /api/products/:id
// @access Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
