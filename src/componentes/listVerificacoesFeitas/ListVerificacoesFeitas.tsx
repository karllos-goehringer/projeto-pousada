import { useEffect, useState } from "react"
import TabelaVerificacoes from "../tabelaVerificacao/TabelaVerificacao";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SwitchThumb } from "@radix-ui/react-switch";

type Props = {
    PK_comodoID: string | undefined;
};

export default function ListVerificacoesFeitas({ PK_comodoID }: Props) {
    const [verificacoes, setVerificacoes] = useState([]);


    useEffect(() => {
        if (!PK_comodoID) return;

        const fetchData = async () => {
            const token = localStorage.getItem("authToken");
            const res = await fetch(`http://localhost:3000/comodo/get-verificacoes/${PK_comodoID}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();
            console.log(data)
            setVerificacoes(data || []);
        };
        fetchData();
    }, [PK_comodoID]);

    function verDetalhes(id: number) {
        console.log("Abrir detalhes da verificação:", id);
        // navegar para página:
        // navigate(`/comodo/${PK_comodoID}/verificacao/${id}`)
    }


    return (
            <Card>
            <CardHeader>
                <CardTitle>Tabela de Verificações</CardTitle>

            </CardHeader>

            <CardContent>
                <TabelaVerificacoes
                verificacoes={verificacoes}
                onVerDetalhes={verDetalhes}
                />
            </CardContent>
            </Card>
    )
}