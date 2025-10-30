import AppSidebar from "@/componentes/Sidebar/AppSidebar";
import { useParams } from "react-router-dom";
import estilo from './Pagina-comodo-css.module.css';
import { useEffect, useState } from "react";
import ViewComodo from "@/componentes/view-comodo/view-comodo";

interface Comodo {
  PFK_pousadaID: string | undefined;
  PK_comodoID: string | undefined;
  capacidadePessoas: number | undefined;
  comodoNome: string | undefined;
  comodoStatus: string | undefined;
  comodoTipo: string | undefined;
  descComodo: string | undefined;
}

export default function PaginaComodo() {
  const [dadosObjetos, setDadosObjetos] = useState<Comodo | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const { id: comodoID } = useParams<{ id: string }>();

  useEffect(() => {
    if (!comodoID) return;

    async function buscarObjetosComodo() {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setErro("Usuário não autenticado.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/comodo/comodos/getComodoById/${comodoID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Erro ao buscar cômodo (${res.status})`);

        const comodoData = await res.json();
        const dataFinal = Array.isArray(comodoData) ? comodoData[0] : comodoData;

        setDadosObjetos(dataFinal);
      } catch (err) {
        console.error(err);
        setErro("Falha ao buscar dados do cômodo.");
      } finally {
        setLoading(false);
      }
    }

    buscarObjetosComodo();
  }, [comodoID]);

  return (
    <main className={estilo.bodyHome}>
      <AppSidebar />
      <div className="md:ml-64 p-4 flex min-h-screen w-full">
        <div className={estilo.boxHome}>
          <div className={estilo.boxPousada}>
            {loading ? (
              <p>Carregando...</p>
            ) : erro ? (
              <p className="text-red-600">{erro}</p>
            ) : dadosObjetos ? (
              <ViewComodo
                PFK_pousadaID={dadosObjetos.PFK_pousadaID}
                PK_comodoID={dadosObjetos.PK_comodoID}
                capacidadePessoas={dadosObjetos.capacidadePessoas}
                comodoNome={dadosObjetos.comodoNome}
                comodoStatus={dadosObjetos.comodoStatus}
                comodoTipo={dadosObjetos.comodoTipo}
                descComodo={dadosObjetos.descComodo}
              />
            ) : (
              <p>Nenhum cômodo encontrado.</p>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
