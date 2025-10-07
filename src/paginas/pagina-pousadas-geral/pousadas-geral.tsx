import { Link } from "react-router-dom";
import LocalStorage from "@/backend/LocalStorage";
import { useEffect, useState } from "react";
import Header from "@/componentes/Header/header";
import estilo from './pousadas-geral.module.css';

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
        const res = await fetch(`http://localhost:3000/pousada/get-pousadas/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Erro ao buscar pousadas");

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
console.log(dados);
  // definir conteúdo antes do return
  const conteudo = !dados || dados.length === 0 ? (
    <div>
      <h1>Minhas Pousadas:</h1>
      <p>Nenhuma pousada cadastrada ainda. Cadastre!</p>
      <Link to="/form-pousada/">Cadastrar nova Pousada</Link>
    </div>
  ) : (
    <div>
      <h1>Minhas Pousadas:</h1>
      {dados.map((pousada: Pousada) => (
        <div key={pousada.pousadaID}>
          <h2>{pousada.nomePousada}</h2>
        </div>
      ))}
      <Link to="/form-pousada/">Cadastrar nova Pousada</Link>
    </div>
  );

  return (
    <main>
      <Header />
      <div className={estilo.boxHome}>
        {conteudo}
      </div>
    </main>
  );
}