import { useEffect, useState } from "react";
import API from "../api";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={page}>
      <h2 style={title}>Our Jewelry Collection</h2>

      <div style={grid}>
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            style={card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 18px 40px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.08)";
            }}
          >
            <img src={p.images?.[0]} alt={p.name} style={image} />

            <h3 style={{ marginTop: "16px" }}>{p.name}</h3>

            <p style={price}>₹{p.price}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p);
                navigate("/cart");
              }}
              style={btn}
              onMouseEnter={(e) =>
                (e.target.style.background = "#c9a227")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "#d4af37")
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

/* ---------- STYLES ---------- */

const page = {
  padding: "60px 40px",
  backgroundColor: "#f5efe6",
  minHeight: "100vh"
};

const title = {
  textAlign: "center",
  fontFamily: "serif",
  fontSize: "36px",
  marginBottom: "50px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "30px",
  maxWidth: "1300px",
  margin: "0 auto"
};

const card = {
  backgroundColor: "#fff",
  borderRadius: "20px",
  padding: "26px",
  height: "460px", // 🔥 TALLER CARD
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  cursor: "pointer",
  transition: "all 0.35s ease",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
};

const image = {
  width: "100%",
  height: "260px",
  objectFit: "contain",
  borderRadius: "14px",
  backgroundColor: "#fafafa"
};

const price = {
  color: "#d4af37",
  fontWeight: "600",
  fontSize: "18px"
};

const btn = {
  marginTop: "12px",
  padding: "14px",
  backgroundColor: "#d4af37",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background 0.3s ease"
};
