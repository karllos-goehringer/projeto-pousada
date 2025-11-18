import AppSidebar from "@/componentes/Sidebar/AppSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnderecoForm from "@/componentes/endereco-form/EnderecoForm";
import ContatoForm from "@/componentes/contato-form/ContatoForm";
import CardComodos from "@/componentes/cardComodos/CardComodos";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CardEditPousadaNome from "@/componentes/cardEditPousadaNome/CardEditPousadaNome";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RotaBackEnd } from "@/backend/routes/privateroute";

export default function PaginaPousada() {
  const { id: pousadaID } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [dadosEndereco, setDadosEndereco] = useState<any | null>(null);
  const [dadosContato, setDadosContato] = useState<any | null>(null);
  const [dadosPousada, setDadosPousada] = useState<any | null>(null);

  async function buscarPousada() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch( 
        `${RotaBackEnd}/pousada/get-pousada-details/${pousadaID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) throw new Error(res.status ? `Erro: ${res.status}` : "Erro desconhecido");

      const dadosApi = await res.json();

      setDadosEndereco({
        uf: dadosApi.enderecoPousada.uf,
        cidade: dadosApi.enderecoPousada.cidade,
        bairro: dadosApi.enderecoPousada.bairro,
        rua: dadosApi.enderecoPousada.rua,
        numResidencia: dadosApi.enderecoPousada.numResidencia,
      });

      setDadosContato({
        telefone: dadosApi.contatoPousada.telefone,
        telefoneAlternativo: dadosApi.contatoPousada.telefoneAlternativo,
        email: dadosApi.contatoPousada.email,
      });

      setDadosPousada({
        pousadaID: dadosApi.dataPousada.PK_pousadaID,
        nomePousada: dadosApi.dataPousada.nomePousada,
      });
    } catch (err) {
      setDadosEndereco(null);
      setDadosContato(null);
      setDadosPousada(null);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!pousadaID) return;
    buscarPousada();
  }, [pousadaID]);

  return (
    <SidebarProvider>
    <main className="flex flex-row justify-center w-11/12">
      <AppSidebar/>
        <div className="fixed top-4 left-4 z-50"><SidebarTrigger/></div>
      <div className="flex-1 min-h-screen p-4 md:ml-64 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">

          {/* Banner da pousada */}
          <div className="relative w-full h-[clamp(200px,35vw,420px)] rounded-xl overflow-hidden shadow-lg">
            <img
              src="/fundo-1.avif"
              alt="Foto da pousada"
              className="w-full h-full object-cover"
            />

            {/* Gradiente inferior */}
            <div className="absolute bottom-0 left-0 w-full h-[10px] bg-black opacity-80"></div>

            {/* Nome da pousada */}
            {!loading && dadosPousada && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <p className="text-white text-3xl md:text-4xl font-semibold text-center px-4">
                  Boas-vindas à pousada{" "}
                  <span className="text-orange-400">{dadosPousada.nomePousada}</span>
                </p>
              </div>
            )}

            {/* Estado de carregamento */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <p className="text-gray-200 text-xl">Carregando...</p>
              </div>
            )}
          </div>

          {/* Grid dos formulários */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Endereço */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                {loading ? (
                  <p>Carregando endereço...</p>
                ) : dadosEndereco ? (
                  <EnderecoForm {...dadosEndereco} id={pousadaID} />
                ) : (
                  <p>Endereço não encontrado.</p>
                )}
              </CardContent>
            </Card>

            {/* Contato */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                {loading ? (
                  <p>Carregando contato...</p>
                ) : dadosContato ? (
                  <ContatoForm {...dadosContato} id={pousadaID} />
                ) : (
                  <p>Contato não registrado.</p>
                )}
              </CardContent>
            </Card>

            {/* Nome da pousada */}
            <Card className="shadow-lg border-0 lg:col-span-2">
              <CardContent className="p-6">
                {!loading && dadosPousada ? (
                  <CardEditPousadaNome
                    id={dadosPousada.pousadaID}
                    nomePousada={dadosPousada.nomePousada}
                    onUpdated={buscarPousada}
                  />
                ) : (
                  <p>Carregando nome da pousada...</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Card cômodos */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <CardComodos id={pousadaID} />
            </CardContent>
          </Card>

          {/* Botão deletar */}
          <Card className="max-w-md mx-auto mt-6 shadow-lg border-0">
            <CardContent className="p-6 flex justify-center">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                type="button"
                variant="destructive"
              >
                Apagar Pousada
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
    </SidebarProvider>
  );
}
