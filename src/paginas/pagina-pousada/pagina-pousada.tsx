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
  const [dadosContato, setDadosContato] = useState<any | null>(null)
  const [dadosPousada, setDadosPousada] = useState<any | null>(null)
  const mockCardComodos = {
    id: "123",
    comodos: [
      { nome: "Quarto" },
      { nome: "Quarto 2" },
      { nome: "Cozinha" },
      { nome: "Sala de Estar" },
      { nome: "Banheiro" },
    ],
  };
  useEffect(() => {
    if (!pousadaID) return;
    async function buscarPousada() {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      try {
        const res = await fetch(`http://localhost:3000/pousada/get-pousada-details/${pousadaID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(res.status ? `Erro: ${res.status}` : "Erro desconhecido");

        const dadosApi = await res.json();
        console.log(dadosApi)
        let apiDadosEndereco = {
          uf: dadosApi.enderecoPousada.uf,
          cidade: dadosApi.enderecoPousada.cidade,
          bairro: dadosApi.enderecoPousada.bairro,
          rua: dadosApi.enderecoPousada.rua,
          numResidencia: dadosApi.enderecoPousada.numResidencia,
        }
        let apiDadosContato = {
          telefone: dadosApi.contatoPousada.telefone,
          telefoneAlternativo: dadosApi.contatoPousada.telefoneAlternativo,
          email: dadosApi.contatoPousada.email,
        }
        let apiDadosPousada = {
          pousadaID: dadosApi.dataPousada.PK_pousadaID,
          nomePousada: dadosApi.dataPousada.nomePousada
        }
        setDadosContato(apiDadosContato),
          setDadosEndereco(apiDadosEndereco);
        setDadosPousada(apiDadosPousada)
      } catch (err) {
        setDadosEndereco([]);
        setDadosContato([])
        setDadosPousada([])
      } finally {
        setLoading(false);
      }
    }
    buscarPousada();
  }, [pousadaID]);
  return (

    <main className={estilo.bodyHome}>
      <AppSidebar />
      <div className=" md:ml-64 p-4 flex min-h-screen w-full">
        <div className={estilo.boxHome}>
          <div className={estilo.boxPousada}>
            <div className="relative w-full h-[40vh]">
              <img
                src="/fundo-1.avif"
                alt="Foto da pousada"
                className="w-full h-full object-cover"
              />
              <div className="w-full h-[10px] bg-black"></div>
              {!loading && dadosPousada && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <p className="text-white text-3xl font-semibold text-center">
                    Boas-vindas à pousada{" "}
                    <span className="text-orange-400">
                      {dadosPousada.nomePousada}
                    </span>
                  </p>
                </div>
              )}

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <p className="text-gray-200 text-xl">Carregando...</p>
                </div>
              )}
            </div>

            <div className="flex flex-row ">
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
                <p>Endereço não encontrado</p>
              )}
              {loading ? (
                <p>Carregando endereço...</p>
              ) : dadosEndereco && dadosContato ? (
                <ContatoForm
                  telefone={dadosContato.telefone}
                  telefoneAlternativo={dadosContato.telefoneAlternativo}
                  email={dadosContato.email}
                  id={pousadaID}
                />
              ) : (
                <p>Contato não registrado</p>
              )}
              <CardComodos {...mockCardComodos}></CardComodos>


            </div>
            <Card className="max-w-md mx-auto mt-10 flex flex-col justify-between h-full">
              <CardContent className="flex flex-col gap-4">
                {/* Lista de cômodos aqui */}

                <div className="mt-auto flex justify-start">
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    type="button"
                    variant="destructive"
                  >
                    Apagar Pousada
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main >
  )
}