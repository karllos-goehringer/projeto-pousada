import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const token = localStorage.getItem("authToken");
  const isLogged = !!token;
  return isLogged ? <Outlet /> : <Navigate to="/login" replace />;
}
