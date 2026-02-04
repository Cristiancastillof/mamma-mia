import { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const API_URL = "http://localhost:5000";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserContext);

  // 🛡️ Si NO hay provider, mostramos error visible (en vez de pantalla en blanco)
  if (!cartCtx) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          ❌ CartContext no está disponible. Revisa que el archivo sea
          <strong> src/context/CartContext.jsx</strong> y que <strong>CartProvider</strong> envuelva App en <strong>main.jsx</strong>.
        </div>
      </div>
    );
  }

  if (!userCtx) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          ❌ UserContext no está disponible. Revisa que <strong>UserProvider</strong> envuelva App en <strong>main.jsx</strong>.
        </div>
      </div>
    );
  }

  const { cart, increase, decrease, total } = cartCtx;
  const { token } = userCtx;

  const [purchaseStatus, setPurchaseStatus] = useState("idle"); // idle | loading | success | error
  const [purchaseError, setPurchaseError] = useState("");

  const cartPayload = useMemo(
    () =>
      cart.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        count: p.count,
      })),
    [cart]
  );

  const handleCheckout = async () => {
    console.log("CLICK PAGAR ✅");

    if (!token) return;

    setPurchaseStatus("loading");
    setPurchaseError("");

    try {
      const res = await fetch(`${API_URL}/api/checkouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart: cartPayload }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "No se pudo procesar la compra");
      }

      setPurchaseStatus("success");
    } catch (err) {
      setPurchaseStatus("error");
      setPurchaseError(err?.message || "Error desconocido");
    }
  };

  const disabledReason = !token
    ? "Sin token (no logueado)"
    : cart.length === 0
    ? "Carrito vacío"
    : purchaseStatus === "loading"
    ? "Procesando..."
    : "OK";

  return (
    <div className="container mt-4">
      <h2>Carrito de compras</h2>

      <p className="text-muted">
        DEBUG: {disabledReason} | items: {cart.length}
      </p>

      {purchaseStatus === "success" && (
        <div className="alert alert-success mt-3">
          ✅ ¡Compra realizada con éxito!
        </div>
      )}

      {purchaseStatus === "error" && (
        <div className="alert alert-danger mt-3">❌ {purchaseError}</div>
      )}

      {cart.length === 0 ? (
        <p className="mt-3">Tu carrito está vacío.</p>
      ) : (
        cart.map((p) => (
          <div key={p.id} className="d-flex align-items-center mb-3">
            <img src={p.img} alt={p.name} width={80} className="me-3" />

            <div className="flex-grow-1">
              <h5 className="mb-1">{p.name}</h5>
              <p className="mb-0">${p.price}</p>
            </div>

            <button
              className="btn btn-outline-danger"
              onClick={() => decrease(p.id)}
              disabled={purchaseStatus === "loading"}
            >
              -
            </button>

            <span className="mx-2">{p.count}</span>

            <button
              className="btn btn-outline-success"
              onClick={() => increase(p.id)}
              disabled={purchaseStatus === "loading"}
            >
              +
            </button>
          </div>
        ))
      )}

      <hr />

      <h3>Total: ${total}</h3>

      {!token && (
        <p className="text-danger mt-2">Debes iniciar sesión para pagar</p>
      )}

      <button
        type="button"
        className="btn btn-primary mt-3"
        disabled={!token || cart.length === 0 || purchaseStatus === "loading"}
        onClick={handleCheckout}
      >
        {purchaseStatus === "loading" ? "Procesando..." : "Pagar"}
      </button>
    </div>
  );
}
