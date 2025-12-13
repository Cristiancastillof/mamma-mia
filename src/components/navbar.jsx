import React from "react";
import { formatNumber } from "../utils/format";

const Navbar = ({ setView, token }) => {
  const total = 25000;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <span
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => setView("home")}
        >
          🍕 Mamma Mía
        </span>

        <div className="d-flex gap-2">
          {/* Home - siempre visible */}
          <button
            className="btn btn-outline-primary"
            onClick={() => setView("home")}
          >
            🍕 Home
          </button>

          {/* Botón carrito */}
          <button
            className="btn btn-outline-dark"
            onClick={() => setView("cart")}
          >
            🛒 Total: ${formatNumber(total)}
          </button>

          {/* botones dependientes del token */}
          {token ? (
            <>
              <button className="btn btn-outline-secondary">
                🔓 Profile
              </button>
              <button className="btn btn-outline-danger">
                🔒 Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline-success"
                onClick={() => setView("login")}
              >
                🔐 Login
              </button>

              <button
                className="btn btn-outline-warning"
                onClick={() => setView("register")}
              >
                📝 Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
