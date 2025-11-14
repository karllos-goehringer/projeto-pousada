import AppSidebar from "@/componentes/Sidebar/AppSidebar";
import { useParams } from "react-router-dom";
import estilo from './Pagina-comodo-css.module.css';
import { useEffect, useState } from "react";
import ViewComodo from "@/componentes/view-comodo/view-comodo";
import ObjetosList from "@/componentes/objetos-list/ObjetosList";
import { Card } from "@/components/ui/card";

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
  <main className="min-h-screen bg-gradient-to-br ">
    <AppSidebar />
    
    <div className="md:ml-64 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            {dadosObjetos?.comodoNome || "Detalhes do Cômodo"}
          </h1>
          <p className="text-black">
            Gerencie os objetos e configurações deste ambiente
          </p>
        </div>

        {/* CARD ÚNICO CENTRALIZADO */}
        <Card className="p-8 shadow-xl border-0 flex flex-col items-center justify-center gap-10">

          {/* Área do ViewComodo */}
          <div className="w-full max-w-3xl">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2"></div>
                  <p className="text-slate-600 font-medium">
                    Carregando detalhes do cômodo...
                  </p>
                </div>
              </div>
            ) : erro ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <p className="text-red-600 font-semibold text-lg mb-2">
                  Erro ao carregar
                </p>
                <p className="text-red-500">{erro}</p>
              </div>
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
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <span className="text-2xl">🏠</span>
                </div>
                <p className="text-slate-600 font-semibold text-lg">
                  Nenhum cômodo encontrado
                </p>
                <p className="text-slate-500 mt-2">
                  Verifique se o cômodo existe ou tente novamente.
                </p>
              </div>
            )}
          </div>

          {/* Área da lista de objetos */}
          <div className="w-full max-w-3xl">
            <ObjetosList 
              PK_comodoID={dadosObjetos?.PK_comodoID} 
              nomeComodo={dadosObjetos?.comodoNome}
            />
          </div>

        </Card>
      </div>
    </div>
  </main>
);
}