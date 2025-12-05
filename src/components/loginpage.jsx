import { useState } from "react";

const LoginPage = () => {
  // Estados para los campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Opcional: estados para mensajes
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Limpiar mensajes previos
    setErrorMessage("");
    setSuccessMessage("");

    // 1. Validar campos vacíos
    if (!email || !password) {
      const msg = "Todos los campos son obligatorios.";
      setErrorMessage(msg);
      alert(msg);
      return;
    }

    // 2. Validar largo mínimo del password
    if (password.length < 6) {
      const msg = "El password debe tener al menos 6 caracteres.";
      setErrorMessage(msg);
      alert(msg);
      return;
    }

    // Si todo está correcto
    const msg = "Authentication successful!";
    setSuccessMessage(msg);
    alert(msg);

    // (Opcional) Limpiar campos
    // setEmail("");
    // setPassword("");
  };

  return (
    <div className="container my-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Login</h2>

      {/* Mensajes opcionales en pantalla */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
