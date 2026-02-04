import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { register, authLoading, authError } = useContext(UserContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await register(form);
    if (resp.ok) navigate("/profile");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 520 }}>
      <h2 className="mb-3">Registro</h2>

      {authError && <div className="alert alert-danger">{authError}</div>}

      <form onSubmit={handleSubmit} className="d-grid gap-2">
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="btn btn-success" disabled={authLoading}>
          {authLoading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
