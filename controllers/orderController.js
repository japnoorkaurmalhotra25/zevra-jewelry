const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address } = req.body;

    if (!address || !address.city || !address.pincode || !address.phone) {
      return res.status(400).json({ message: "Address details required" });
    }

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    const orderItems = cart.items.map((item) => {
      totalAmount += item.product.price * item.quantity;

      return {
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      };
    });

    const order = await Order.create({
      user: userId,
      items: orderItems,
      address,
      totalAmount,
      paymentMethod: "COD",
      status: "placed"
    });

    // Clear cart
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({
      message: "Order placed successfully (Cash on Delivery)",
      order
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//order history
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
