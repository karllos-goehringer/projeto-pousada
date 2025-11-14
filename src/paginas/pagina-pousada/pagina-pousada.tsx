import AppSidebar from "@/componentes/Sidebar/AppSidebar";
import estilo from "./pagina-pousada.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnderecoForm from "@/componentes/endereco-form/EnderecoForm";
import ContatoForm from "@/componentes/contato-form/ContatoForm";
import CardComodos from "@/componentes/cardComodos/CardComodos";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaginaPousada() {
  const { id: pousadaID } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [dadosEndereco, setDadosEndereco] = useState<any | null>(null);
  const [dadosContato, setDadosContato] = useState<any | null>(null);
  const [dadosPousada, setDadosPousada] = useState<any | null>(null);

  useEffect(() => {
    if (!pousadaID) return;

    async function buscarPousada() {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:3000/pousada/get-pousada-details/${pousadaID}`,
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

    buscarPousada();
  }, [pousadaID]);

  return (
    <main className={estilo.bodyHome}>
      <AppSidebar />

      <div className="md:ml-64 p-4 flex min-h-screen w-full justify-center">
        <div className="w-full max-w-7xl flex flex-col gap-10">

          {/* BANNER RESPONSIVO */}
          <div className="relative w-full h-[clamp(180px,35vw,420px)] rounded-xl overflow-hidden shadow-md">
            <img
              src="/fundo-1.avif"
              alt="Foto da pousada"
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 w-full h-[10px] bg-black opacity-80"></div>

            {!loading && dadosPousada && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <p className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold text-center px-4">
                  Boas-vindas à pousada{" "}
                  <span className="text-orange-400">{dadosPousada.nomePousada}</span>
                </p>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <p className="text-gray-200 text-xl">Carregando...</p>
              </div>
            )}
          </div>

          {/* GRID RESPONSIVA DOS FORMULÁRIOS E CÔMODOS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Endereço */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                {loading ? (
                  <p>Carregando endereço...</p>
                ) : dadosEndereco ? (
                  <EnderecoForm
                    uf={dadosEndereco.uf}
                    cidade={dadosEndereco.cidade}
                    bairro={dadosEndereco.bairro}
                    rua={dadosEndereco.rua}
                    numResidencia={dadosEndereco.numResidencia}
                    id={pousadaID}
                  />
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
                  <ContatoForm
                    telefone={dadosContato.telefone}
                    telefoneAlternativo={dadosContato.telefoneAlternativo}
                    email={dadosContato.email}
                    id={pousadaID}
                  />
                ) : (
                  <p>Contato não registrado.</p>
                )}
              </CardContent>
            </Card>

          </div>

          {/* CARD DOS CÔMODOS */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <CardComodos id={pousadaID} />
            </CardContent>
          </Card>

          {/* BOTÃO EXCLUIR */}
          <Card className="max-w-md mx-auto mt-6 shadow-lg border-0">
            <CardContent className="p-6 flex justify-start">
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
  );
}
