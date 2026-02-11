const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

 //CREATE ORDER (COD + STOCK DEDUCTION)
 
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address } = req.body;

    // 1. Validate address
    if (
      !address ||
      !address.fullName ||
      !address.phone ||
      !address.city ||
      !address.pincode ||
      !address.addressLine
    ) {
      return res.status(400).json({ message: "Complete address is required" });
    }

    // 2. Get cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    // 3. Stock check + deduction
    for (const item of cart.items) {
      if (!item.product) continue;

      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.product.name}`
        });
      }

      // Deduct stock
      item.product.stock -= item.quantity;
      await item.product.save();

      totalAmount += item.product.price * item.quantity;

      orderItems.push({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      });
    }

    if (orderItems.length === 0) {
      return res.status(400).json({ message: "No valid products in cart" });
    }

    // 4. Create order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      address,
      totalAmount,
      paymentMethod: "COD",
      status: "placed"
    });

    // 5. Clear cart
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({
      message: "Order placed successfully (Cash on Delivery)",
      order
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// USER: GET MY ORDERS

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).sort({
      createdAt: -1
    });

    res.status(200).json({
      count: orders.length,
      orders
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


  //ADMIN: GET ALL ORDERS

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



 // ADMIN: UPDATE ORDER STATUS

 
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "placed",
      "shipped",
      "delivered",
      "cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// USER: CANCEL ORDER (RESTORE STOCK)
 
exports.cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    // 1. Find order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 2. Check ownership
    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 3. Check status
    if (order.status !== "placed") {
      return res.status(400).json({
        message: "Order cannot be cancelled at this stage"
      });
    }

    // 4. Restore stock
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    // 5. Update order status
    order.status = "cancelled";
    await order.save();

    res.status(200).json({
      message: "Order cancelled successfully",
      order
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
