import AppSidebar from "@/componentes/Sidebar/AppSidebar";
import estilo from "./pagina-pousada.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function PaginaPousada(){
  interface Pousada {
    pousadaID: number;
    nomePousada: string;
  }

  const { id: pousadaID } = useParams<{ id: string }>();
  const [dados, setDados] = useState<Pousada[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!pousadaID) return;
    const buscarPousada = async () => {
      const token = localStorage.getItem("authToken");
      if (!token || !pousadaID) return;
      try {
        const res = await fetch(`http://localhost:3000/pousada/get-pousada-details/${pousadaID}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(res.status?`Erro: ${res.status}`:"Erro desconhecido");

        const dadosApi = await res.json();
        console.log(dadosApi);
        setDados(dadosApi);
      } catch (err) {
        console.error(err);
        setDados([]);
      } finally {
        setLoading(false);
      }
    };

    buscarPousada();
  }, []);
    return (
           <main className={estilo.bodyHome}>
            <AppSidebar/>
        <div className="ml-0 md:ml-64 p-4 flex items-center justify-center min-h-screen w-full">
            <div className={estilo.boxHome}>
               
            </div>
        </div>
    </main>
    )
}