import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Auth() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        const res = await API.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      } else {
        await API.post("/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setMode("login");
        setError("Account created! Please log in.");
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isLogin = mode === "login";

  return (
    <div style={page}>
      {/* Decorative background rings */}
      <div style={ring1} />
      <div style={ring2} />

      <div style={card}>
        {/* Logo */}
        <div style={logoWrap}>
          <span style={logo}>ZEVRA</span>
          <span style={tagline}>Crafted for the Extraordinary</span>
        </div>

        {/* Tab Toggle */}
        <div style={tabs}>
          <button
            style={{ ...tab, ...(isLogin ? tabActive : {}) }}
            onClick={() => { setMode("login"); setError(""); }}
          >
            Sign In
          </button>
          <button
            style={{ ...tab, ...(!isLogin ? tabActive : {}) }}
            onClick={() => { setMode("signup"); setError(""); }}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <div style={formBox}>
          {!isLogin && (
            <div style={fieldWrap}>
              <label style={label}>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                style={input}
                onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
                onBlur={(e) => (e.target.style.borderColor = "#e8e0d5")}
              />
            </div>
          )}

          <div style={fieldWrap}>
            <label style={label}>Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={input}
              onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
              onBlur={(e) => (e.target.style.borderColor = "#e8e0d5")}
            />
          </div>

          <div style={fieldWrap}>
            <label style={label}>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={input}
              onFocus={(e) => (e.target.style.borderColor = "#d4af37")}
              onBlur={(e) => (e.target.style.borderColor = "#e8e0d5")}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          {error && (
            <p style={{
              ...errorMsg,
              color: error.includes("created") ? "#4caf50" : "#c0392b",
            }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={submitBtn}
            onMouseEnter={(e) => !loading && (e.target.style.background = "#c9a227")}
            onMouseLeave={(e) => !loading && (e.target.style.background = "#d4af37")}
          >
            {loading ? "Please wait…" : isLogin ? "Sign In" : "Create Account"}
          </button>
        </div>

        {/* Footer toggle */}
        <p style={footerText}>
          {isLogin ? "New to ZEVRA? " : "Already have an account? "}
          <span
            style={toggleLink}
            onClick={() => { setMode(isLogin ? "signup" : "login"); setError(""); }}
          >
            {isLogin ? "Create an account" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ─── Styles ─── */

const page = {
  minHeight: "100vh",
  background: "#f5efe6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 20px",
  position: "relative",
  overflow: "hidden",
};

const ring1 = {
  position: "absolute",
  width: "500px",
  height: "500px",
  borderRadius: "50%",
  border: "80px solid rgba(212,175,55,0.08)",
  top: "-120px",
  right: "-120px",
  pointerEvents: "none",
};

const ring2 = {
  position: "absolute",
  width: "340px",
  height: "340px",
  borderRadius: "50%",
  border: "60px solid rgba(212,175,55,0.06)",
  bottom: "-80px",
  left: "-80px",
  pointerEvents: "none",
};

const card = {
  background: "#fff",
  borderRadius: "24px",
  padding: "48px 44px",
  width: "100%",
  maxWidth: "440px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
  position: "relative",
  zIndex: 1,
};

const logoWrap = {
  textAlign: "center",
  marginBottom: "32px",
};

const logo = {
  display: "block",
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "34px",
  fontWeight: "700",
  color: "#d4af37",
  letterSpacing: "6px",
};

const tagline = {
  display: "block",
  fontSize: "12px",
  color: "#aaa",
  letterSpacing: "2px",
  marginTop: "4px",
  fontStyle: "italic",
};

const tabs = {
  display: "flex",
  background: "#f8f4ee",
  borderRadius: "12px",
  padding: "4px",
  marginBottom: "32px",
  gap: "4px",
};

const tab = {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "10px",
  background: "transparent",
  color: "#999",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const tabActive = {
  background: "#fff",
  color: "#333",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const formBox = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const fieldWrap = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const label = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#555",
  letterSpacing: "0.3px",
};

const input = {
  padding: "13px 16px",
  borderRadius: "10px",
  border: "1.5px solid #e8e0d5",
  fontSize: "15px",
  color: "#333",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
  background: "#fdfaf7",
};

const errorMsg = {
  fontSize: "13px",
  margin: "0",
  textAlign: "center",
};

const submitBtn = {
  marginTop: "6px",
  padding: "15px",
  background: "#d4af37",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontSize: "15px",
  fontWeight: "700",
  cursor: "pointer",
  letterSpacing: "0.5px",
  transition: "background 0.25s ease",
};

const footerText = {
  textAlign: "center",
  fontSize: "13px",
  color: "#999",
  marginTop: "24px",
  marginBottom: "0",
};

const toggleLink = {
  color: "#d4af37",
  fontWeight: "600",
  cursor: "pointer",
  textDecoration: "underline",
};