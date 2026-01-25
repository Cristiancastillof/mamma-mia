import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function PublicRoute() {
  const { token } = useContext(UserContext);

  // Si hay token, NO debería entrar a login/register → home
  if (token) return <Navigate to="/" replace />;

  // Si NO hay token, deja pasar
  return <Outlet />;
}
