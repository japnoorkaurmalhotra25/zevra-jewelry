import axios from "axios";

const API = axios.create({
  baseURL: "/api"  // Back to using proxy
});

const addToCart = async (productId) => {
  await API.post("/cart", {
    productId,
    quantity: 1
  });
  alert("Added to cart");
};

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;