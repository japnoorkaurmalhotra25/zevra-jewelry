import API from "../services/api";

function ProductCard({ product }) {
  const addToCart = async () => {
    try {
      await API.post("/cart", {
        productId: product._id,
        quantity: 1,
      });
      alert("Added to cart");
    } catch (err) {
      alert("Login required to add to cart");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "15px",
        margin: "10px",
        width: "220px",
      }}
    >
      <img
        src={product.images?.[0]}
        alt={product.name}
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
      />

      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
