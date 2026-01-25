import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { token, logout } = useContext(UserContext);

  const cart = useContext(CartContext);
  const total = cart?.total ?? 25000;

  const setActiveClass = ({ isActive }) =>
    isActive ? "btn btn-primary" : "btn btn-outline-primary";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          🍕 Mamma Mía
        </Link>

        <div className="d-flex gap-2 align-items-center">
          <NavLink to="/" className={setActiveClass}>
            🍕 Home
          </NavLink>

          <NavLink to="/cart" className={setActiveClass}>
            🛒 Total: ${total}
          </NavLink>

          {token ? (
            <>
              <NavLink to="/profile" className={setActiveClass}>
                👤 Profile
              </NavLink>

              <button type="button" className="btn btn-outline-danger" onClick={logout}>
                🔓 Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={setActiveClass}>
                🔐 Login
              </NavLink>

              <NavLink to="/register" className={setActiveClass}>
                📝 Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

