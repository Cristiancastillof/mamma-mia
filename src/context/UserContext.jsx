import { createContext, useEffect, useMemo, useState } from "react";

export const UserContext = createContext();

const API_URL = "http://localhost:5000";

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [profile, setProfile] = useState(null);

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const saveSession = (newToken, newEmail) => {
    setToken(newToken);
    setEmail(newEmail);
    localStorage.setItem("token", newToken);
    localStorage.setItem("email", newEmail);
  };

  const clearSession = () => {
    setToken("");
    setEmail("");
    setProfile(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  // REGISTER
  const register = async ({ email, password }) => {
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Error al registrarse");
      }

      if (!data?.token) {
        throw new Error("Respuesta inválida del servidor (falta token)");
      }

      // Si backend no devuelve email, usamos el del formulario
      const finalEmail = data?.email || email;

      saveSession(data.token, finalEmail);
      return { ok: true };
    } catch (err) {
      setAuthError(err?.message || "Error desconocido");
      return { ok: false, error: err?.message };
    } finally {
      setAuthLoading(false);
    }
  };

  // LOGIN  ✅ ARREGLO: guardar email aunque backend no lo mande
  const login = async ({ email, password }) => {
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Error al iniciar sesión");
      }

      if (!data?.token) {
        throw new Error("Respuesta inválida del servidor (falta token)");
      }

      // 🔥 clave: si el backend no manda email en login, usamos el del form
      const finalEmail = data?.email || email;

      saveSession(data.token, finalEmail);
      return { ok: true };
    } catch (err) {
      setAuthError(err?.message || "Error desconocido");
      return { ok: false, error: err?.message };
    } finally {
      setAuthLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    clearSession();
  };

  // GET PROFILE (/me)
  const getProfile = async () => {
    if (!token) return { ok: false, error: "Sin token" };

    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "No se pudo obtener el perfil");
      }

      setProfile(data);

      // Si /me devuelve email, lo sincronizamos
      if (data?.email && data.email !== email) {
        setEmail(data.email);
        localStorage.setItem("email", data.email);
      }

      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err?.message || "Error desconocido" };
    }
  };

  // Auto-cargar perfil cuando haya token
  useEffect(() => {
    if (token) getProfile();
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      email,
      profile,
      authLoading,
      authError,
      login,
      register,
      logout,
      getProfile,
    }),
    [token, email, profile, authLoading, authError]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
