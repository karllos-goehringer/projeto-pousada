import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function PrivateRoute() {
  const { token, user, auth, loading, setUser, setAuth, setToken } = useAuth(); // pegar do contexto
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setChecking(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        const headerToken = res.headers.get("X-New-Token");
        const newToken = data.token || headerToken;

        if (data.valid) {
          if (newToken) {
            setToken(newToken); // atualiza token no contexto
          }
          setUser(data.user); // atualiza usuário
          setAuth(true);
        } else {
          setUser(null);
          setAuth(false);
        }
      } catch (err) {
        console.error("Erro ao verificar token:", err);
        setUser(null);
        setAuth(false);
      } finally {
        setChecking(false);
      }
    };

    verifyToken();
  }, [token, setUser, setAuth, setToken]);

  if (loading || checking) return <p>Carregando...</p>; // pode trocar por um loader

  if (!auth) return <Navigate to="/home" replace />;

  return <Outlet />;
}
