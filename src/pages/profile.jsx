import React from "react";

export default function Profile() {
  const email = "usuario@correo.com";

  return (
    <div className="container py-4">
      <h1 className="mb-3">Perfil</h1>
      <div className="card p-3">
        <p className="mb-2">
          <strong>Email:</strong> {email}
        </p>
        <button className="btn btn-danger">Cerrar sesión</button>
      </div>
    </div>
  );
}
