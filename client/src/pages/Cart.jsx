import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, updateQty, removeFromCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div style={emptyStyle}>
        <h2>Your cart is empty</h2>
        <p>Add something beautiful ✨</p>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <h2 style={title}>Shopping Cart</h2>

      <div style={layout}>
        {/* LEFT */}
        <div style={itemsCol}>
          {cartItems.map((item) => (
            <div key={item._id} style={card}>
              <img src={item.images?.[0]} alt={item.name} style={image} />

              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p style={price}>₹{item.price}</p>

                <div style={qtyRow}>
                  <button
                    style={qtyBtn}
                    onClick={() =>
                      updateQty(item._id, Math.max(1, item.quantity - 1))
                    }
                  >
                    −
                  </button>

                  <span style={qty}>{item.quantity}</span>

                  <button
                    style={qtyBtn}
                    onClick={() =>
                      updateQty(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={rightCol}>
                <div style={totalItem}>
                  ₹{item.price * item.quantity}
                </div>

                <button
                  style={removeBtn}
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div style={summary}>
          <h3>Order Summary</h3>

          <div style={row}>
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div style={row}>
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr />

          <div style={{ ...row, fontWeight: "700" }}>
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button style={checkoutBtn}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;


const pageStyle = {
   backgroundColor: "#f5efe6",
  minHeight: "100vh",
  padding: "60px 30px"
};

const title = {
  textAlign: "center",
  fontFamily: "serif",
  fontSize: "36px",
  marginBottom: "40px"
};

const layout = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "40px",
  maxWidth: "1200px",
  margin: "0 auto"
};

const itemsCol = {
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const card = {
  display: "flex",
  gap: "20px",
  padding: "22px",
  backgroundColor: "#fff",
  borderRadius: "18px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease"
};

const image = {
  width: "120px",
  height: "120px",
  objectFit: "contain",
  borderRadius: "12px",
  backgroundColor: "#fafafa"
};

const price = {
  color: "#d4af37",
  fontWeight: "600",
  marginBottom: "12px"
};

const qtyRow = {
  display: "flex",
  alignItems: "center",
  gap: "14px"
};

const qtyBtn = {
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  cursor: "pointer",
  fontSize: "18px"
};

const qty = {
  minWidth: "24px",
  textAlign: "center",
  fontWeight: "600"
};

const rightCol = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "space-between"
};

const totalItem = {
  fontWeight: "600",
  fontSize: "16px"
};

const removeBtn = {
  border: "none",
  background: "none",
  color: "#e74c3c",
  cursor: "pointer"
};

const summary = {
  backgroundColor: "#fff",
  padding: "32px",
  borderRadius: "20px",
  height: "fit-content",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  margin: "16px 0"
};

const checkoutBtn = {
  width: "100%",
  padding: "15px",
  backgroundColor: "#d4af37",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer"
};

const emptyStyle = {
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f8f5f0"
};

const shopBtn = {
  marginTop: "20px",
  padding: "14px 26px",
  backgroundColor: "#d4af37",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
};
