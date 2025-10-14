import { Link } from "react-router-dom";
import LocalStorage from "@/backend/LocalStorage";
import { useEffect, useState } from "react";
import estilo from './pousadas-geral.module.css';
import AppSidebar from "@/componentes/Sidebar/AppSidebar";
import CardPousada from "@/componentes/cardPousada/cardPousada";

export default function PousadasGeral() {
  interface Pousada {
    pousadaID: number;
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
        const res = await fetch(`http://localhost:3000/pousada/get-pousada/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(res.status?`Erro: ${res.status}`:"Erro desconhecido");

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

  if (loading) return <p>Carregando...</p>;
    const conteudo = !dados || dados.length === 0 ? (
    <div>
      <h1>Minhas Pousadas:</h1>
      <p>Nenhuma pousada cadastrada ainda. Cadastre!</p>
      <Link to="/form-pousada/">Cadastrar nova Pousada</Link>
    </div>
  ) : (
    <div>
      <h1>Minhas Pousadas:</h1>
    <div className={estilo.listaPousadas}>
      {dados.map((pousada: Pousada) => (
        <div key={pousada.pousadaID}>
          <CardPousada nomePousada={pousada.nomePousada} idPousada={pousada.pousadaID}></CardPousada>
        </div>
      ))}
    </div>
    </div>
  );

  return (
    <main>
      <AppSidebar></AppSidebar>
      <div className="ml-0 md:ml-64 p-4 flex items-center justify-center min-h-screen w-full">

        <div className={estilo.boxHome}>
          {conteudo}
        </div>
      </div>
    </main>
  );
}