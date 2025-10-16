import AppSidebar from "@/componentes/Sidebar/AppSidebar";
import estilo from "./pagina-pousada.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnderecoForm from "@/componentes/endereco-form/EnderecoForm";
import ContatoForm from "@/componentes/contato-form/ContatoForm";
export default function PaginaPousada() {
  const { id: pousadaID } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [dadosEndereco, setDadosEndereco] = useState<any | null>(null);
  const [dadosContato, setDadosContato] = useState<any | null>(null)
  const [dados, setDados] = useState<any | null>(null)
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
          rua: dadosApi.enderecoPousada.rua
        }
        let apiDadosContato = {

        
          telefone: dadosApi.contatoPousada.telefone,
          telefoneAlternativo: dadosApi.contatoPousada.telefonealternativo,
          email: dadosApi.contatoPousada.email,
        }
        setDadosContato(apiDadosContato),
          setDados(dadosApi),
          setDadosEndereco(apiDadosEndereco);

      } catch (err) {
        setDadosEndereco([]);
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
            <p>Nome Pousada</p>
            <p>Boas Vindas</p>
            <div>
            {loading ? (
              <p>Carregando endereço...</p>
            ) : dadosEndereco ? (
              <EnderecoForm
                uf={dadosEndereco.uf}
                cidade={dadosEndereco.cidade}
                bairro={dadosEndereco.bairro}
                rua={dadosEndereco.rua}
                id={pousadaID}
              />
            ) : (
              <p>Endereço não encontrado</p>
            )}
            {loading ? (
              <p>Carregando endereço...</p>
            ) : dadosEndereco && dadosContato ? (
              <ContatoForm
                telefone={`+55${dadosContato.telefone}`}
                telefoneAlternativo={`+55${dadosContato.telefoneAlternativo}`}
                email={dadosContato.email}
                id={pousadaID}
              />
            ) : (
              <p>Contato não registrado</p>
            )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}