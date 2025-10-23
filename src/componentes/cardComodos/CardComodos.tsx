import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch, SwitchThumb } from "@radix-ui/react-switch";
import DialogCadastroComodo from "../dialog-cadastro-comodo/Dialog-Cadastro-Comodo";
import ComodoIconButton from "../comodo-list-componente/ComodoListComponente";

interface Comodo {
  id: number;
  comodoNome: string;
  comodoTipo: string;
  descComodo?: string;
  capacidadePessoas?: number;
  comodoStatus?: string;
}

interface CardComodosProps {
  id: string | undefined;
}

export default function CardComodos({ id }: CardComodosProps) {
  const [comodos, setComodos] = useState<Comodo[]>([]);
  const [isLocked, setIsLocked] = useState(true);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchComodos = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`http://localhost:3000/comodo/comodos/get-comodos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Erro ao buscar cômodos");
      }

      const data: Comodo[] = await res.json();
      setComodos(data);
    } catch (err: any) {
      console.error(err);
      setMsg(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };
  fetchComodos();
}, [id]);

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Cômodos</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Editar - </span>
          <Switch
            className="bg-gray-600 data-[state=checked]:bg-white"
            checked={!isLocked}
            onCheckedChange={() => setIsLocked(!isLocked)}
          >
            <SwitchThumb className="bg-white data-[state=checked]:bg-black" />
          </Switch>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {loading && <p>Carregando cômodos...</p>}
        {!loading && comodos.length === 0 && <p>Nenhum cômodo cadastrado.</p>}
        {!loading &&
          comodos.map((comodo) => (
  <ComodoIconButton key={comodo.id} comodo={comodo} />
))}
        <DialogCadastroComodo disabled={isLocked} PFK_pousadaID={id} />
        {msg && <p className="text-center text-sm mt-2">{msg}</p>}
      </CardContent>
    </Card>
  );
}
