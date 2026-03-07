import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { useCart } from "../context/CartContext";
import { useWindowSize } from "../hooks/useWindowSize";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { isMobile, isTablet } = useWindowSize();

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

  if (loading) return <p style={{ textAlign: "center", padding: "60px" }}>Loading...</p>;
  if (!product) return <p style={{ textAlign: "center", padding: "60px" }}>Product not found</p>;

  return (
    <div style={{ backgroundColor: "#f8f5f0", minHeight: "100vh", padding: isMobile ? "20px 12px" : isTablet ? "40px 20px" : "60px" }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
        gap: isMobile ? "24px" : "60px",
        background: "#fff",
        padding: isMobile ? "20px" : "40px",
        borderRadius: "20px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
      }}>
        {/* Images */}
        <div>
          <img
            src={product.images?.[activeImage]}
            alt={product.name}
            style={{ width: "100%", height: isMobile ? "260px" : "380px", objectFit: "contain", borderRadius: "12px", background: "#fafafa" }}
          />
          <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                style={{ width: "70px", height: "70px", objectFit: "contain", cursor: "pointer", borderRadius: "8px", background: "#fff", border: activeImage === i ? "2px solid #d4af37" : "1px solid #ddd" }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h2 style={{ fontFamily: "serif", margin: 0, fontSize: isMobile ? "22px" : "28px" }}>{product.name}</h2>
          <p style={{ color: "#666", lineHeight: 1.7 }}>{product.description}</p>
          <p><strong>Metal:</strong> {product.metal}</p>
          <p><strong>Weight:</strong> {product.weight}g</p>
          <h3 style={{ color: "#d4af37", fontSize: isMobile ? "22px" : "26px", margin: 0 }}>₹{product.price.toLocaleString("en-IN")}</h3>
          <button
            onClick={() => addToCart(product)}
            style={{ marginTop: "10px", padding: "14px", background: "#d4af37", color: "#fff", border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: "600", cursor: "pointer", width: "100%" }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;