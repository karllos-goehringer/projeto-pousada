import AppSidebar from "@/componentes/Sidebar/AppSidebar";
import { useParams } from "react-router-dom";
import estilo from './Pagina-comodo-css.module.css'
import { useEffect, useState } from "react";
export default function PaginaComodo() {
    const [dadosObjetos, setDadosObjetos] = useState<any | null>(null)
    const [loading, setLoading] = useState(true);

    const { id: comodoID } = useParams<{ id: string }>();
    useEffect(() => {
        if (!comodoID) return;
        async function buscarObjetosComodo() {
            const token = localStorage.getItem("authToken");
            if (!token) return;
            try {
                const res = await fetch(`http://localhost:3000/comodo/comodos/getComodoById/${comodoID}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error(res.status ? `Erro: ${res.status}` : "Erro desconhecido");

                const comodoData = await res.json();
                console.log(comodoData)
                setDadosObjetos(comodoData);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        }
        buscarObjetosComodo();
    }, [comodoID]
    );

    return (
        <main className={estilo.bodyHome}>
            <AppSidebar />
            <div className="md:ml-64 p-4 flex min-h-screen w-full">
                <div className={estilo.boxHome}>
                    <div className={estilo.boxPousada}>
                        <div>
                            {loading ? (
                                <p>Carregando...</p>
                            ) : (
                                <div>
                                    {<p>{dadosObjetos[0]?.comodoNome || "Nome do cômodo não disponível"}</p>}
                                    <p>{dadosObjetos[0]?.comodoStatus || "Nome do cômodo não disponível"}</p>
                                    <p>{dadosObjetos[0]?.descComodo || "Nome do cômodo não disponível"}</p>
                                    <p>{dadosObjetos[0]?.capacidadePessoas || "Nome do cômodo não disponível"}</p>
                                </div>
                                
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}