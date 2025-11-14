import { Link } from "react-router-dom";
import LocalStorage from "@/backend/LocalStorage";
import { useEffect, useState } from "react";
import estilo from "./pousadas-geral.module.css";
import AppSidebar from "@/componentes/Sidebar/AppSidebar";
import CardPousada from "@/componentes/cardPousada/cardPousada";

export default function PousadasGeral() {
  interface Pousada {
    PK_pousadaID: number;
    nomePousada: string;
  }

  const [dados, setDados] = useState<Pousada[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarPousadas = async () => {
      const token = localStorage.getItem("authToken");
      const userId = LocalStorage.UserLogged?.id;

      if (!token || !userId) return;

      try {
        const res = await fetch(
          `http://localhost:3000/pousada/get-pousada/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok)
          throw new Error(res.status ? `Erro: ${res.status}` : "Erro desconhecido");

        const dadosApi = await res.json();
        setDados(dadosApi);
      } catch (err) {
        console.error(err);
        setDados([]);
      } finally {
        setLoading(false);
      }
    };

    buscarPousadas();
  }, []);

  if (loading)
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium">Carregando...</p>
      </main>
    );

  const conteudo =
    !dados || dados.length === 0 ? (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Minhas Pousadas</h1>
        <p className="text-gray-600">Nenhuma pousada cadastrada ainda.</p>

        <Link
          to="/form-pousada"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Cadastrar nova pousada
        </Link>
      </div>
    ) : (
      <div className="w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Minhas Pousadas</h1>

        {/* Grid responsivo */}
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            gap-6
          "
        >
          {dados.map((pousada: Pousada) => (
            <CardPousada
              key={pousada.PK_pousadaID}
              nomePousada={pousada.nomePousada}
              idPousada={pousada.PK_pousadaID}
            />
          ))}
        </div>
      </div>
    );

  return (
    <main className="min-h-screen flex ">
      <AppSidebar />

      <div className="ml-0 md:ml-64 w-full p-6 flex justify-center">
        <div
          className={`${estilo.boxHome} w-full max-w-6xl `}
        >
          {conteudo}
        </div>
      </div>
    </main>
  );
}
