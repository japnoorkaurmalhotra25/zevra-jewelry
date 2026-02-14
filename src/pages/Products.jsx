import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api";
import { useCart } from "../context/CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const category = searchParams.get("category");
  const metal = searchParams.get("metal");

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  const filtered = products.filter((p) => {
    if (category && p.category !== category) return false;
    if (metal && p.metal !== metal) return false;
    return true;
  });

  const setMetal = (m) => {
    navigate(`/products?category=${category}&metal=${m}`);
  };

  return (
    <div style={page}>
      <h2 style={title}>{category?.toUpperCase()} COLLECTION</h2>

      {/* Metal Filter */}
      <div style={filters}>
        {["gold", "silver", "diamond"].map((m) => (
          <button
            key={m}
            onClick={() => setMetal(m)}
            style={filterBtn}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Products */}
      <div style={grid}>
        {filtered.map((p) => (
          <div
            key={p._id}
            style={card}
            onClick={() => navigate(`/product/${p._id}`)}
          >
            <img src={p.images?.[0]} alt={p.name} style={image} />
            <h3>{p.name}</h3>
            <p style={price}>₹{p.price}</p>

            <button
              style={btn}
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

/* ================= STYLES ================= */

const page = {
  background: "#f8f5f0",
  minHeight: "100vh",
  padding: "50px"
};

const title = {
  textAlign: "center",
  fontFamily: "serif",
  fontSize: "34px",
  marginBottom: "30px"
};

const filters = {
  display: "flex",
  justifyContent: "center",
  gap: "14px",
  marginBottom: "40px"
};

const filterBtn = {
  padding: "10px 20px",
  borderRadius: "20px",
  border: "1px solid #d4af37",
  background: "#fff",
  cursor: "pointer",
  fontWeight: "600"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "28px"
};

const card = {
  background: "#fff",
  borderRadius: "18px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  cursor: "pointer",
  transition: "transform 0.3s"
};

const image = {
  width: "100%",
  height: "220px",
  objectFit: "contain"
};

const price = {
  color: "#d4af37",
  fontWeight: "600",
  margin: "10px 0"
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "#d4af37",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default Products;
