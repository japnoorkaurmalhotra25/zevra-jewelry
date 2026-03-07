import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [catOpen, setCatOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (category) => {
    setCatOpen(false);
    navigate(`/products?category=${category}`);
  };

  const handleProfileClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  return (
    <>
      <style>{`
        .nav-link {
          text-decoration: none;
          color: #333;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #d4af37; }
        .drop-item {
          padding: 12px 16px;
          cursor: pointer;
          color: #333;
          font-size: 14px;
          transition: background 0.15s, color 0.15s;
        }
        .drop-item:hover {
          background: #fdf8ee;
          color: #d4af37;
        }
        .avatar-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #f2f2f2;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.2s, background 0.2s;
          font-size: 18px;
        }
        .avatar-btn:hover {
          border-color: #d4af37;
          background: #fdf8ee;
        }
        .cat-trigger {
          cursor: pointer;
          color: #333;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.2s;
          user-select: none;
        }
        .cat-trigger:hover { color: #d4af37; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-right { gap: 12px !important; }
        }
      `}</style>

      <nav style={nav}>
        {/* Logo */}
        <Link to="/" style={logoStyle}>ZEVRA</Link>

        {/* Right Section */}
        <div style={right} className="nav-right">
          <Link to="/" className="nav-link nav-links">Home</Link>
          <Link to="/about" className="nav-link nav-links">About</Link>
          <Link to="/cart" className="nav-link nav-links">Cart</Link>

          {/* Categories Dropdown */}
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <span
              className="cat-trigger nav-links"
              onClick={() => setCatOpen(!catOpen)}
            >
              Categories {catOpen ? "▴" : "▾"}
            </span>

            {catOpen && (
              <div style={dropdown}>
                <div className="drop-item" onClick={() => handleCategoryClick("ring")}>💍 Rings</div>
                <div className="drop-item" onClick={() => handleCategoryClick("necklace")}>📿 Necklaces</div>
                <div className="drop-item" onClick={() => handleCategoryClick("earring")}>✨ Earrings</div>
                <div className="drop-item" onClick={() => handleCategoryClick("pendant")}>🔮 Pendants</div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div
            className="avatar-btn"
            onClick={handleProfileClick}
            title={user ? user.name : "Sign In"}
          >
            {user ? user.name?.charAt(0).toUpperCase() : "👤"}
          </div>
        </div>
      </nav>
    </>
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
  zIndex: 100,
};

const logoStyle = {
  fontSize: "26px",
  fontFamily: "serif",
  fontWeight: "700",
  color: "#d4af37",
  textDecoration: "none",
  letterSpacing: "3px",
};

const right = {
  display: "flex",
  gap: "26px",
  alignItems: "center",
};

const dropdown = {
  position: "absolute",
  top: "36px",
  right: 0,
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  width: "180px",
  overflow: "hidden",
  zIndex: 200,
  border: "1px solid rgba(212,175,55,0.15)",
};