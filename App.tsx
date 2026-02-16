import React, { useState, useEffect, useRef } from "react";

export default function HackerMoneyApp() {
  const [cart, setCart] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [customerEmail, setCustomerEmail] = useState("");
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const canvasRef = useRef(null);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium forntite cheat ($10)",
      price: 10,
      description: "Digital gaming guide you can sell online",
    },
  ]);

  // Hacker line background animation (NO errors, pure canvas)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const lines = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 120 + 50,
      speed: Math.random() * 0.7 + 0.2,
    }));

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#00ff9c";
      ctx.lineWidth = 1.2;

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x, line.y + line.length);
        ctx.stroke();

        line.y += line.speed * 2;
        if (line.y > canvas.height) {
          line.y = -line.length;
          line.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  const addToCart = (product) => {
    if (!product) return;
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!customerEmail) {
      alert("Enter customer email first");
      return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    // Simulated earnings (connect Stripe/PayPal for real money)
    setEarnings((prev) => prev + total);

    alert(
      `Payment successful! You earned $${total}. Connect Stripe/PayPal for real payouts.`
    );

    setCart([]);
    setCustomerEmail("");
  };

  const addNewProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    const priceNumber = parseFloat(newProduct.price);
    if (isNaN(priceNumber)) return;

    const product = {
      id: Date.now(),
      name: newProduct.name,
      price: priceNumber,
      description: "Custom product you are selling",
    };

    setProducts((prev) => [...prev, product]);
    setNewProduct({ name: "", price: "" });
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        color: "#00ff9c",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Hacker Background Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          background: "black",
        }}
      />

      {/* App Content */}
      <div style={{ position: "relative", zIndex: 1, padding: "20px" }}>
        <h1
          style={{
            fontSize: "34px",
            marginBottom: "10px",
            textShadow: "0 0 15px #00ff9c",
          }}
        >
          💻 fortntie hack store
        </h1>
        <p style={{ color: "#8affd8", marginBottom: "25px" }}>
          Sell digital products with a hacked animated background (fixed $10
          item)
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
          }}
        >
          {/* Products Panel */}
          <div
            style={{
              background: "rgba(0,0,0,0.7)",
              padding: "20px",
              borderRadius: "14px",
              border: "1px solid #00ff9c",
              boxShadow: "0 0 25px #00ff9c",
            }}
          >
            <h2>📦 Products</h2>

            <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
              <input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #00ff9c",
                  background: "black",
                  color: "#00ff9c",
                }}
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                style={{
                  width: "120px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #00ff9c",
                  background: "black",
                  color: "#00ff9c",
                }}
              />
              <button
                onClick={addNewProduct}
                style={{
                  padding: "10px 15px",
                  borderRadius: "8px",
                  background: "#00ff9c",
                  color: "black",
                  fontWeight: "bold",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Add
              </button>
            </div>

            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  background: "rgba(0,0,0,0.8)",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  border: "1px solid #00ff9c",
                }}
              >
                <h3 style={{ margin: 0 }}>{product.name}</h3>
                <p style={{ color: "#6effc2", fontSize: "14px" }}>
                  {product.description}
                </p>
                <p style={{ fontWeight: "bold" }}>${product.price}</p>

                <button
                  onClick={() => addToCart(product)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    background: "linear-gradient(90deg, #00ff9c, #00c3ff)",
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Cart & Earnings */}
          <div
            style={{
              background: "rgba(0,0,0,0.7)",
              padding: "20px",
              borderRadius: "14px",
              border: "1px solid #00ff9c",
              boxShadow: "0 0 25px #00ff9c",
            }}
          >
            <h2>💰 Earnings</h2>
            <p style={{ fontSize: "28px", fontWeight: "bold" }}>
              ${earnings.toFixed(2)}
            </p>

            <h3 style={{ marginTop: "20px" }}>🛒 Cart</h3>

            <input
              placeholder="Customer Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #00ff9c",
                background: "black",
                color: "#00ff9c",
              }}
            />

            {cart.length === 0 ? (
              <p style={{ color: "#5effb5" }}>Cart is empty</p>
            ) : (
              cart.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span>
                    {item.name} - ${item.price}
                  </span>
                  <button
                    onClick={() => removeFromCart(index)}
                    style={{
                      background: "transparent",
                      color: "#ff4d4d",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}

            <button
              onClick={checkout}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                background: "linear-gradient(90deg, #00ff9c, #00c3ff)",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              💳 Checkout & Get Paid
            </button>

            <p
              style={{ fontSize: "12px", color: "#4dffb8", marginTop: "10px" }}
            >
              Connect Stripe or PayPal to receive real money payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
