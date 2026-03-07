import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useWindowSize } from "../hooks/useWindowSize";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const navigate = useNavigate();
  const { isMobile, isTablet } = useWindowSize();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) { navigate("/auth"); return; }
    const u = JSON.parse(stored);
    setUser(u);
    setForm({ name: u.name || "", email: u.email || "", phone: u.phone || "", address: u.address || "" });

    API.get("/orders").then(res => setOrders(res.data)).catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  if (!user) return null;

  const initial = user.name?.charAt(0).toUpperCase();

  const navItems = [
    { id: "profile", icon: "👤", label: "Profile" },
    { id: "orders", icon: "📦", label: "Orders" },
    { id: "wishlist", icon: "🤍", label: "Wishlist" },
  ];

  return (
    <div style={{ backgroundColor: "#f5f0eb", minHeight: "100vh", padding: isMobile ? "20px 12px" : "48px 40px", fontFamily: "'Montserrat', system-ui, sans-serif" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .profile-anim { animation: fadeIn 0.5s ease forwards; }
        .nav-item { transition: all 0.2s; cursor: pointer; }
        .nav-item:hover { background: #f0e8d8 !important; }
        .save-btn:hover { background: #8a6e35 !important; transform: translateY(-1px); }
        .logout-btn:hover { color: #c0392b !important; }
        input:focus { outline: none; border-color: #d4af37 !important; box-shadow: 0 0 0 3px rgba(212,175,55,0.12); }
        textarea:focus { outline: none; border-color: #d4af37 !important; box-shadow: 0 0 0 3px rgba(212,175,55,0.12); }
      `}</style>

      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "220px 1fr" : "280px 1fr",
        gap: isMobile ? "20px" : "28px",
        alignItems: "start",
      }}>

        {/* ── SIDEBAR ── */}
        <div className="profile-anim" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Avatar Card */}
          <div style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "32px 20px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(212,175,55,0.12)",
          }}>
            <div style={{
              width: "90px", height: "90px", borderRadius: "50%",
              background: "linear-gradient(135deg, #d4af37, #f0d060)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "36px", fontWeight: "700", color: "#fff",
              fontFamily: "Georgia, serif", margin: "0 auto 16px",
              boxShadow: "0 8px 24px rgba(212,175,55,0.3)",
            }}>
              {initial}
            </div>
            <h3 style={{ margin: "0 0 4px", fontFamily: "Georgia, serif", fontWeight: "400", fontSize: "18px", color: "#2c2c2c" }}>{user.name}</h3>
            <p style={{ margin: 0, fontSize: "13px", color: "#aaa" }}>{user.email}</p>
          </div>

          {/* Nav Card */}
          <div style={{
            background: "#fff",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(212,175,55,0.12)",
          }}>
            {navItems.map((item, i) => (
              <div
                key={item.id}
                className="nav-item"
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "16px 20px",
                  background: activeTab === item.id ? "#fdf8ee" : "#fff",
                  borderLeft: activeTab === item.id ? "3px solid #d4af37" : "3px solid transparent",
                  borderBottom: i < navItems.length - 1 ? "1px solid #f5f0eb" : "none",
                  color: activeTab === item.id ? "#a68547" : "#555",
                  fontWeight: activeTab === item.id ? "600" : "500",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
            <div
              className="nav-item logout-btn"
              onClick={handleLogout}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "16px 20px",
                color: "#e74c3c", fontSize: "14px", fontWeight: "500",
                borderLeft: "3px solid transparent",
              }}
            >
              <span style={{ fontSize: "16px" }}>↪</span>
              Logout
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="profile-anim" style={{
          background: "#fff",
          borderRadius: "20px",
          padding: isMobile ? "24px 16px" : "40px 48px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          border: "1px solid rgba(212,175,55,0.12)",
          minHeight: "500px",
        }}>

          {/* ── PROFILE TAB ── */}
          {activeTab === "profile" && (
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: "400", fontSize: isMobile ? "22px" : "28px", color: "#2c2c2c", margin: "0 0 32px" }}>
                My Profile
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 00000 00000"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Shipping Address</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Enter your shipping address"
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", marginTop: "32px", flexWrap: "wrap" }}>
                <button className="save-btn" style={{
                  padding: "13px 36px", background: "#a68547", color: "#fff",
                  border: "none", borderRadius: "6px", fontSize: "14px",
                  fontWeight: "600", cursor: "pointer", transition: "all 0.2s",
                  fontFamily: "inherit", letterSpacing: "0.5px",
                }}>
                  Save Changes
                </button>
                <button style={{
                  padding: "13px 36px", background: "transparent", color: "#555",
                  border: "1.5px solid #ddd", borderRadius: "6px", fontSize: "14px",
                  fontWeight: "600", cursor: "pointer", fontFamily: "inherit",
                }}>
                  Change Password
                </button>
              </div>

              <div style={{ marginTop: "28px", paddingTop: "20px", borderTop: "1px solid #f0e8d8", display: "flex", gap: "20px" }}>
                <span style={{ fontSize: "13px", color: "#aaa", cursor: "pointer", textDecoration: "underline" }}>Privacy Policy</span>
                <span style={{ fontSize: "13px", color: "#e74c3c", cursor: "pointer", textDecoration: "underline" }}>Delete Account</span>
              </div>
            </div>
          )}

          {/* ── ORDERS TAB ── */}
          {activeTab === "orders" && (
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: "400", fontSize: isMobile ? "22px" : "28px", color: "#2c2c2c", margin: "0 0 32px" }}>
                Order History
              </h2>
              {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <p style={{ fontSize: "48px", margin: "0 0 16px" }}>🛍️</p>
                  <p style={{ color: "#aaa", fontSize: "16px", marginBottom: "20px" }}>No orders yet</p>
                  <button onClick={() => navigate("/products")} style={{ padding: "12px 28px", background: "#a68547", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontFamily: "inherit" }}>
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {orders.map((order) => (
                    <div key={order._id} style={{
                      padding: "18px 20px", borderRadius: "12px",
                      background: "#fafaf8", border: "1px solid #f0e8d8",
                      display: "flex", justifyContent: "space-between",
                      alignItems: isMobile ? "flex-start" : "center",
                      flexDirection: isMobile ? "column" : "row", gap: "10px",
                    }}>
                      <div>
                        <p style={{ margin: "0 0 4px", fontWeight: "600", fontSize: "14px", color: "#333" }}>Order #{order._id?.slice(-6).toUpperCase()}</p>
                        <p style={{ margin: 0, fontSize: "13px", color: "#aaa" }}>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <p style={{ margin: 0, fontWeight: "700", color: "#a68547", fontSize: "16px" }}>₹{order.totalPrice?.toLocaleString("en-IN")}</p>
                        <span style={{
                          padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
                          background: order.status === "delivered" ? "#e8f5e9" : order.status === "cancelled" ? "#fdecea" : "#fff8e1",
                          color: order.status === "delivered" ? "#2e7d32" : order.status === "cancelled" ? "#c62828" : "#f57f17",
                        }}>
                          {order.status || "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── WISHLIST TAB ── */}
          {activeTab === "wishlist" && (
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", fontWeight: "400", fontSize: isMobile ? "22px" : "28px", color: "#2c2c2c", margin: "0 0 32px" }}>
                Wishlist
              </h2>
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ fontSize: "48px", margin: "0 0 16px" }}>🤍</p>
                <p style={{ color: "#aaa", fontSize: "16px", marginBottom: "20px" }}>Your wishlist is empty</p>
                <button onClick={() => navigate("/products")} style={{ padding: "12px 28px", background: "#a68547", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontFamily: "inherit" }}>
                  Browse Jewelry
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ── Shared Styles ── */
const labelStyle = {
  display: "block", fontSize: "13px", fontWeight: "600",
  color: "#888", marginBottom: "8px", letterSpacing: "0.3px",
};

const inputStyle = {
  width: "100%", padding: "13px 16px",
  border: "1.5px solid #e8e0d5", borderRadius: "8px",
  fontSize: "15px", color: "#333", fontFamily: "inherit",
  background: "#fafaf8", boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
};