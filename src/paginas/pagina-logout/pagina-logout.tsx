import { useAuth } from "@/backend/auth/AuthProvider";
import { useEffect } from "react";

export default function PaginaLogout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    window.location.href = "/login";
  }, []);

  return (
    <main className="flex flex-row justify-center w-11/12">
      <h1>Saindo...</h1>
    </main>
  );
}