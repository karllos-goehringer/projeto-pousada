import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import DialogViewObjeto from "../dialogViewObjeto/DialogViewObjeto";
import { SwitchThumb } from "@radix-ui/react-switch";

type Props = {
    PK_comodoID: string | undefined;
};

type EstadoObjeto = {
    id: number;
    presente: boolean | null;
    quantidade: number;
};

export default function ListVerificacaoObjetos({ PK_comodoID }: Props) {
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLocked, setIsLocked] = useState(true);
    const [objetos, setObjetos] = useState<any[]>([]);
    const [objetoSelecionado, setObjetoSelecionado] = useState<any | null>(null);
    const [estadoObjetos, setEstadoObjetos] = useState<EstadoObjeto[]>([]);
    useEffect(() => {
        const fetchObjetos = async () => {
            if (!PK_comodoID) return;
            setLoading(true);

            try {
                const token = localStorage.getItem("authToken");

                const res = await fetch(
                    `http://localhost:3000/objeto/objeto/get-objetos-comodo/${PK_comodoID}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (!res.ok) {
                    setMsg("Erro ao buscar objetos.");
                    return;
                }

                const data = await res.json();
                setObjetos(data);
                setEstadoObjetos(
                    data.map((obj: any) => ({
                        id: obj.PK_objID,
                        presente: null,
                        quantidade: 0,
                    }))
                );
            } catch (err) {
                console.error(err);
                setMsg("Erro ao conectar ao servidor.");
            } finally {
                setLoading(false);
            }
        };

        fetchObjetos();
    }, [PK_comodoID]);

    function atualizar(id: number, campo: string, valor: any) {
        setEstadoObjetos((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        [campo]: valor,
                        ...(campo === "presente" && valor === false
                            ? { quantidade: 0 }
                            : {}),
                    }
                    : item
            )
        );
    }

async function finalizarVerificacao() {
    const presentes = estadoObjetos
        .filter((o) => o.presente === true).map((o) => ({
            ...objetos.find((x) => x.PK_objID === o.id),  
            quantidade: o.quantidade,
        }));
       for (const item of presentes) {
            if (item.quantidade <= 0) {
                alert("A quantidade de um item marcado como presente deve ser maior que 0.");
                return;
    }
}
    const faltantes = estadoObjetos
        .filter((o) => o.presente === false)
        .map((o) => ({
            ...objetos.find((x) => x.PK_objID === o.id),
            quantidade: 0,
        }));

    if (presentes.length === 0 && faltantes.length === 0) {
        alert("Você precisa marcar pelo menos um objeto como presente ou faltante.");
        return;
    }

    const body = {
        comodID: PK_comodoID,
        objetosComodo: objetos,
        objetosPresentes: presentes,
        objetosFaltantes: faltantes,
    };

    try {
        const token = localStorage.getItem("authToken");

        const res = await fetch(
            `http://localhost:3000/comodo/verificacao/${PK_comodoID}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            }
        );

        const data = await res.json();
        alert('Sucesso!');
    } catch (erro) {
        console.log(erro);
        alert("Erro ao salvar verificação.");
    }
}
return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle className="text-xl font-semibold">
                Nova Verificação de Objetos
            </CardTitle>
            
                <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Iniciar Verificação - </span>

                <Switch
                    className="bg-gray-600 data-[state=checked]:bg-white"
                    checked={!isLocked}
                    onCheckedChange={() => setIsLocked(!isLocked)}
                >
                    <SwitchThumb className="bg-white data-[state=checked]:bg-black" />
                </Switch>
                </div>
        </CardHeader>
        {objetoSelecionado && (
            <DialogViewObjeto
                disabled={false}
                objeto={objetoSelecionado}
                nomeComodo="Visualizar objeto"
                onClose={() => setObjetoSelecionado(null)

                }
            />
        )}

        <CardContent className="space-y-4">
            {objetos.map((obj) => {
                const estado = estadoObjetos.find((x) => x.id === obj.PK_objID);
                if (!estado) return null;

                return (
                    <div key={obj.PK_objID} className="border rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <div>
                                {/* 👇 NOME DO OBJETO ABRE O DIALOG */}
                                <p
                                    className="font-semibold cursor-pointer hover:underline"
                                    onClick={() => setObjetoSelecionado(obj)}
                                >
                                    {obj.objNome}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {obj.objMarca ?? "Sem marca"}
                                </p>
                            </div>

                            <Badge
                                variant={
                                    estado.presente === true
                                        ? "default"
                                        : estado.presente === false
                                        ? "outline"
                                        : "outline"
                                }
                            >
                                {estado.presente === true
                                    ? "Presente"
                                    : estado.presente === false
                                    ? "Faltante"
                                    : "Não definido"}
                            </Badge>
                        </div>

                        <Separator />

                        <div className="flex items-center gap-3">
                            <Switch
                                className="bg-white data-[state=checked]:bg-gray-600"
                                checked={estado.presente === true}
                                onCheckedChange={(checked) =>
                                    atualizar(obj.PK_objID, "presente", checked)
                                }
                                disabled={isLocked}
                            />
                            <span className="text-sm text-muted-foreground">
                                Marcar como presente
                            </span>
                        </div>

                        {estado.presente === true && (
                            <Input
                                type="number"
                                min={0}
                                disabled={isLocked}
                                max={obj.objUnidades}
                                value={estado.quantidade}
                                onChange={(e) =>
                                    atualizar(
                                        obj.PK_objID,
                                        "quantidade",
                                        Number(e.target.value)
                                    )
                                }
                                placeholder="Quantidade"
                            />
                        )}
                        {estado.presente === false && (
                            <p className="text-red-600 dark:text-red-400 font-medium">
                                Objeto marcado como faltante
                            </p>
                        )}
                    </div>
                );
            })}

            <Button className="w-full mt-4" onClick={finalizarVerificacao}  disabled={isLocked}>
                Finalizar Verificação
            </Button>
        </CardContent>
    </Card>
);
}
