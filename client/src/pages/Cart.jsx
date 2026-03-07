import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowSize";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useWindowSize();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#f8f5f0", padding: "20px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "serif", fontSize: "28px" }}>Your cart is empty</h2>
        <p style={{ color: "#999" }}>Looks like you haven't added anything yet.</p>
        <button style={{ marginTop: "20px", padding: "14px 26px", backgroundColor: "#d4af37", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "600" }} onClick={() => navigate("/products")}>Shop Now</button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f5efe6", minHeight: "100vh", padding: isMobile ? "24px 12px" : isTablet ? "40px 20px" : "60px 30px" }}>
      <h2 style={{ textAlign: "center", fontFamily: "serif", fontSize: isMobile ? "24px" : "36px", marginBottom: "40px" }}>Your Cart</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile || isTablet ? "1fr" : "2fr 1fr",
        gap: "32px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {cart.map((item) => (
            <div key={item._id} style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "20px",
              padding: "22px",
              backgroundColor: "#fff",
              borderRadius: "18px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}>
              <img src={item.images?.[0]} alt={item.name} style={{ width: isMobile ? "100%" : "120px", height: isMobile ? "200px" : "120px", objectFit: "contain", borderRadius: "12px", backgroundColor: "#fafafa", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 6px", fontFamily: "serif" }}>{item.name}</h3>
                <p style={{ color: "#d4af37", fontWeight: "600", marginBottom: "12px" }}>₹{item.price.toLocaleString("en-IN")}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <button style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1px solid #ccc", backgroundColor: "#fff", cursor: "pointer", fontSize: "18px" }} onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                  <span style={{ minWidth: "24px", textAlign: "center", fontWeight: "600" }}>{item.quantity}</span>
                  <button style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1px solid #ccc", backgroundColor: "#fff", cursor: "pointer", fontSize: "18px" }} onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", alignItems: isMobile ? "center" : "flex-end", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "600", fontSize: "16px" }}>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                <button style={{ border: "none", background: "none", color: "#e74c3c", cursor: "pointer", fontSize: "13px" }} onClick={() => removeFromCart(item._id)}>🗑 Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ backgroundColor: "#fff", padding: "32px", borderRadius: "20px", height: "fit-content", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontFamily: "serif", marginTop: 0 }}>Order Summary</h3>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "16px 0" }}><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "16px 0" }}><span>Shipping</span><span style={{ color: "#4caf50" }}>Free</span></div>
          <hr style={{ borderColor: "#eee" }} />
          <div style={{ display: "flex", justifyContent: "space-between", margin: "16px 0", fontWeight: "700", fontSize: "18px" }}><span>Total</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
          <button style={{ width: "100%", padding: "15px", backgroundColor: "#d4af37", color: "#fff", border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: "600", cursor: "pointer", marginTop: "12px" }}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}