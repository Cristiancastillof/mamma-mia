import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-4 mb-3">404</h1>
      <p className="lead mb-4">La ruta no existe.</p>
      <Link to="/" className="btn btn-primary">
        Volver al Home
      </Link>
    </div>
  );
}
