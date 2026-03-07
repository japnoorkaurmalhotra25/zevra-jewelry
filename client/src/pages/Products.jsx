import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../api";
import { useCart } from "../context/CartContext";
import { useWindowSize } from "../hooks/useWindowSize";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("all");
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useWindowSize();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveFilter(cat);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = activeFilter === "all"
    ? products
    : products.filter((p) => p.category === activeFilter);

  const filters = ["all", "ring", "necklace", "earring", "pendant"];

  const page = {
    background: "#f8f5f0",
    minHeight: "100vh",
    padding: isMobile ? "24px 12px" : isTablet ? "36px 20px" : "50px",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
      ? "repeat(2, 1fr)"
      : "repeat(auto-fill, minmax(280px, 1fr))",
    gap: isMobile ? "16px" : "28px",
  };

  if (loading) return <p style={{ textAlign: "center", padding: "60px" }}>Loading...</p>;

  return (
    <div style={page}>
      <h2 style={{
        textAlign: "center",
        fontFamily: "serif",
        fontSize: isMobile ? "24px" : "34px",
        marginBottom: "24px",
      }}>
        Our Collection
      </h2>

      {/* Filters */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: isMobile ? "8px" : "14px",
        marginBottom: "36px",
        flexWrap: "wrap",
        padding: isMobile ? "0 4px" : "0",
      }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: isMobile ? "8px 14px" : "10px 20px",
              borderRadius: "20px",
              border: "1px solid #d4af37",
              background: activeFilter === f ? "#d4af37" : "#fff",
              color: activeFilter === f ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: isMobile ? "13px" : "14px",
              transition: "all 0.2s",
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={grid}>
        {filtered.map((p) => (
          <div
            key={p._id}
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: isMobile ? "16px" : "20px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              cursor: "pointer",
              transition: "transform 0.3s",
            }}
            onClick={() => navigate(`/product/${p._id}`)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <img
              src={p.images?.[0]}
              alt={p.name}
              style={{
                width: "100%",
                height: isMobile ? "160px" : "220px",
                objectFit: "contain",
              }}
            />
            <h3 style={{ fontFamily: "serif", fontSize: isMobile ? "16px" : "18px" }}>{p.name}</h3>
            <p style={{ color: "#d4af37", fontWeight: "600", margin: "8px 0" }}>₹{p.price}</p>
            <button
              style={{
                width: "100%",
                padding: isMobile ? "10px" : "12px",
                background: "#d4af37",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p);
                navigate("/cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}