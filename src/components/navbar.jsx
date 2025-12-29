import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const total = 25000;
  const token = false; // estático por ahora

  const setActiveClass = ({ isActive }) =>
    isActive ? "btn btn-primary" : "btn btn-outline-primary";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          🍕 Mamma Mía
        </Link>

        <div className="d-flex gap-2">
          <NavLink to="/" className={setActiveClass}>
            🍕 Home
          </NavLink>

          {!token ? (
            <>
              <NavLink to="/login" className={setActiveClass}>
                🔐 Login
              </NavLink>
              <NavLink to="/register" className={setActiveClass}>
                📝 Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className={setActiveClass}>
                👤 Profile
              </NavLink>
              <button className="btn btn-outline-danger">🔒 Logout</button>
            </>
          )}

          <Link to="/cart" className="btn btn-success">
            🛒 Total: ${total}
          </Link>
        </div>
      </div>
    </nav>
  );
}
