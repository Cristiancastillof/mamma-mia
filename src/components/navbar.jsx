import React from "react";
import { formatNumber } from "../utils/format";

const Navbar = () => {
  const total = 25000;
  const token = false; // cambiar a true para ver botones de usuario

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">🍕 Mamma Mía</a>

        <div className="d-flex gap-2">
          {/* Home - siempre visible */}
          <button className="btn btn-outline-primary">🍕 Home</button>

          {/* botones dependientes del token */}
          {token ? (
            <>
              <button className="btn btn-outline-secondary">🔓 Profile</button>
              <button className="btn btn-outline-danger">🔒 Logout</button>
            </>
          ) : (
            <>
              <button className="btn btn-outline-success">🔐 Login</button>
              <button className="btn btn-outline-warning">🔐 Register</button>
            </>
          )}

          {/* Total - siempre visible */}
          <button className="btn btn-outline-dark">🛒 Total: ${formatNumber(total)}</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
