import AppSidebar from "@/componentes/Sidebar/AppSidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ViewComodo from "@/componentes/view-comodo/view-comodo";
import ObjetosList from "@/componentes/objetos-list/ObjetosList";
import { Card, CardContent } from "@/components/ui/card";
import ListVerificacaoObjetos from "@/componentes/listVerificacaoObjetos/ListVerificacaoObjetos";
import ListVerificacoesFeitas from "@/componentes/listVerificacoesFeitas/ListVerificacoesFeitas";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RotaBackEnd } from "@/backend/routes/privateroute";

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
        const res = await fetch(
           `${RotaBackEnd()}/comodo/comodos/getComodoById/${comodoID}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok)
          throw new Error(`Erro ao buscar cômodo (${res.status})`);

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
    <SidebarProvider>
    <main className="flex flex-row justify-center w-11/12">
      <AppSidebar/>
        <div className="fixed top-4 left-4 z-50"><SidebarTrigger/></div>
      <div className="md:ml-64 p-4 flex min-h-screen w-full justify-center">
        <div className="w-full max-w-7xl">
          <div className="relative w-full h-[clamp(180px,35vw,420px)] rounded-xl overflow-hidden ">
                            

            <img
              src="/fundo2.jpg"
              alt="Foto do cômodo"
              className="w-full h-full object-cover object-center"
            />
            
            <div className="absolute bottom-0 left-0 w-full h-[10px] bg-black opacity-70"></div>
            {!loading && dadosObjetos && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <p className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold text-center px-4">
                  {dadosObjetos.comodoNome}
                </p>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <p className="text-gray-200 text-lg sm:text-xl">Carregando...</p>
              </div>
            )}
          </div>
          <Card className="mt-10 shadow-xl border-0 w-full">
            <CardContent className="p-4 sm:p-6 md:p-10 flex flex-col gap-10">
              <div className="w-full">
                {loading ? (
                  <p className="text-center">Carregando detalhes...</p>
                ) : erro ? (
                  <p className="text-center text-red-600">{erro}</p>
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
                  <p className="text-center">Cômodo não encontrado</p>
                )}
              </div>
              <div className="w-full">
                <ObjetosList
                  PK_comodoID={dadosObjetos?.PK_comodoID}
                  nomeComodo={dadosObjetos?.comodoNome}
                />
              </div>
            </CardContent>
            <Card>
              <CardContent>
                {dadosObjetos?.PK_comodoID ? (
                  <ListVerificacaoObjetos PK_comodoID={dadosObjetos?.PK_comodoID} />
                ) : null}
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <ListVerificacoesFeitas PK_comodoID={dadosObjetos?.PK_comodoID} />
              </CardContent>
            </Card>
          </Card>
        </div>
      </div>
    </main>
    </SidebarProvider>
  );

}
