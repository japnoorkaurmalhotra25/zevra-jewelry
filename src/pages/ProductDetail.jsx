import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!product) return <p style={{ textAlign: "center" }}>Product not found</p>;

  return (
    <div style={page}>
      <div style={container}>
        {/* Images */}
        <div>
          <img
            src={product.images?.[activeImage]}
            alt={product.name}
            style={mainImage}
          />

          <div style={thumbRow}>
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                style={{
                  ...thumb,
                  border:
                    activeImage === i
                      ? "2px solid #d4af37"
                      : "1px solid #ddd"
                }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={info}>
          <h2 style={{ fontFamily: "serif" }}>{product.name}</h2>
          <p>{product.description}</p>

          <p><strong>Metal:</strong> {product.metal}</p>
          <p><strong>Weight:</strong> {product.weight}g</p>

          <h3 style={{ color: "#d4af37" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </h3>

          <button
            onClick={() => addToCart(product)}
            style={btn}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

const page = {
  backgroundColor: "#f8f5f0",
  minHeight: "100vh",
  padding: "60px"
};

const container = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "60px",
  background: "#fff",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 12px 40px rgba(0,0,0,0.1)"
};

const mainImage = {
  width: "100%",
  height: "380px",
  objectFit: "contain",
  borderRadius: "12px",
  background: "#fafafa"
};

const thumbRow = {
  display: "flex",
  gap: "12px",
  marginTop: "16px"
};

const thumb = {
  width: "70px",
  height: "70px",
  objectFit: "contain",
  cursor: "pointer",
  borderRadius: "8px",
  background: "#fff"
};

const info = {
  display: "flex",
  flexDirection: "column",
  gap: "14px"
};

const btn = {
  marginTop: "20px",
  padding: "14px",
  background: "#d4af37",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer"
};
