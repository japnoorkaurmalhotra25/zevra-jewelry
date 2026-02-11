import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [catOpen, setCatOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav style={nav}>
      {/* Logo */}
      <Link to="/" style={logo}>
        ZEVRA
      </Link>

      {/* Right Section */}
      <div style={right}>
        <Link to="/" style={link}>Home</Link>
        <Link to="/about" style={link}>About</Link>
        <Link to="/cart" style={link}>Cart</Link>

        {/* Categories Dropdown */}
        <div style={{ position: "relative" }}>
          <span
            onClick={() => setCatOpen(!catOpen)}
            style={{ ...link, cursor: "pointer" }}
          >
            Categories ▾
          </span>

          {catOpen && (
            <div style={dropdown}>
              <div style={dropItem} onClick={() => navigate("/products?category=ring")}>Rings</div>
              <div style={dropItem} onClick={() => navigate("/products?category=necklace")}>Necklaces</div>
              <div style={dropItem} onClick={() => navigate("/products?category=earring")}>Earrings</div>
              <div style={dropItem} onClick={() => navigate("/products?category=pendant")}>Pendants</div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={avatar}>👤</div>
      </div>
    </nav>
  );
}

export default Navbar;

/* ---------- styles ---------- */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 40px",
  background: "#fff",
  boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
  position: "sticky",
  top: 0,
  zIndex: 100
};

const logo = {
  fontSize: "26px",
  fontFamily: "serif",
  fontWeight: "700",
  color: "#d4af37",
  textDecoration: "none"
};

const right = {
  display: "flex",
  gap: "26px",
  alignItems: "center"
};

const link = {
  textDecoration: "none",
  color: "#333",
  fontSize: "15px",
  fontWeight: "500"
};

const avatar = {
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  background: "#f2f2f2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
};

const dropdown = {
  position: "absolute",
  top: "36px",
  right: 0,
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  width: "180px",
  overflow: "hidden",
  zIndex: 200
};

const dropItem = {
  padding: "12px 16px",
  cursor: "pointer",
  color: "#333"
};

