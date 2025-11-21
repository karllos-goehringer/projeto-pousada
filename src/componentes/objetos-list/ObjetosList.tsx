import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SwitchThumb } from "@radix-ui/react-switch";
import DialogCadastroObjeto from "../dialogCadastroObjeto/DialogCadastroObjeto";
import ItemObjetoList from "../item-objetos-list/ItemObjetosList";
import { RotaBackEnd } from "@/backend/routes/privateroute";
interface ObjetosListProps {
  PK_comodoID?: string;
  nomeComodo?: string;
  onRefresh: () => void;
  refresh: number;
} 

export default function ObjetosList({ PK_comodoID,nomeComodo,onRefresh, refresh }: ObjetosListProps) {
  const [isLocked, setIsLocked] = useState(true);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [objetos, setObjetos] = useState<any[]>([]);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const fetchObjetos = async () => {
      if (!PK_comodoID) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
      const res = await fetch(
        `${RotaBackEnd}/objeto/objeto/get-objetos-comodo/${PK_comodoID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );


        if (res.ok) {
          const data = await res.json();
          setObjetos(data);
        } else {
          setMsg("Erro ao buscar objetos.");
        }
      } catch (err) {
        console.error(err);
        setMsg("Erro ao conectar ao servidor.");
      } finally {
        setLoading(false);
      }
    };

     fetchObjetos();
}, [PK_comodoID, reload, refresh]);

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Objetos</CardTitle>
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
        {loading && <p>Carregando...</p>}
        {msg && <p className="text-red-500">{msg}</p>}

        {objetos.length > 0 ? (
          <ul className="space-y-1">
            {objetos.map((obj, i) => (
            <ItemObjetoList nomeComodo={nomeComodo}key={i} objeto={obj} locked={isLocked}   onCreated={() => setReload(prev => prev + 1)}/>))}
          </ul>
        ) : (
          !loading && <p>Nenhum objeto encontrado.</p>
        )}
        <DialogCadastroObjeto disabled={isLocked} PFK_pousadaID={PK_comodoID} nomeComodo={nomeComodo} onCreated={() => setReload(prev => prev + 1)}/>
      </CardContent>
    </Card>
  );
}
