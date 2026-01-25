import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProtectedRoute() {
  const { token } = useContext(UserContext);

  // Si NO hay token, manda a login
  if (!token) return <Navigate to="/login" replace />;

  // Si hay token, deja pasar
  return <Outlet />;
}
