import { useEffect, useState } from "react";
import API from "../api";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get("/products");
      setProducts(res.data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ padding: "40px", background: "#f5efe6" }}>
      <h2 style={{ textAlign: "center", fontFamily: "serif" }}>
        Our Jewelry Collection
      </h2>

      <div style={grid}>
        {products.map((p) => (
          <div
            key={p._id}
            style={card}
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <img src={p.images?.[0]} alt={p.name} style={img} />
            <h3>{p.name}</h3>
            <p style={{ color: "#d4af37" }}>₹{p.price}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p);
              }}
              style={btn}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

/* styles */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "24px",
  marginTop: "40px"
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "16px",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
};

const img = {
  width: "100%",
  height: "220px",
  objectFit: "contain"
};

const btn = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  background: "#d4af37",
  border: "none",
  color: "#fff",
  borderRadius: "8px"
};
