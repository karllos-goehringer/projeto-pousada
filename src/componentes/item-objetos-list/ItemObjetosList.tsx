import { Button } from "@/components/ui/button";
import { InboxIcon } from "@/components/ui/icons/akar-icons-inbox";
import { Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

interface ObjetoComodo {
  PFK_comodoID: number;
  PK_objID?:number;
  objNome: string;
  objMarca?: string;
  objUnidades?: number;
  objLink?: number;
  objImagem?: Blob;
}

interface ObjetoIconButtonProps {
  objeto: ObjetoComodo;
  locked: boolean;
  onCreated?: () => void;
}

export default function itemObjetoList({ objeto,locked,onCreated }: ObjetoIconButtonProps) {
  async function handleDelete() {
  if (!objeto.PFK_comodoID) {
    return;
  }
  const confirmDelete = window.confirm(`Deseja realmente excluir o cômodo "${objeto.objNome}"?`);
  if (!confirmDelete) return;
  const token = localStorage.getItem("authToken");
  try {
    const res = await fetch(
  `http://localhost:3000/objeto/objeto/delete-objeto/${objeto.PK_objID}`,
  {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
    if (res.ok) {
      if (onCreated) onCreated();
    }
  } catch (error) {
  }
}

 return (
    <div className="flex flex-row items-center justify-between gap-2 p-2 border rounded shadow-sm">
      <Link to={'#'} className="flex flex-row items-center gap-2 text-black">
        
        <InboxIcon />
        <div>
          <p className="font-semibold">{objeto.objNome}</p>
          
          {objeto.objMarca && <p className="text-sm text-gray-500">Unidades: {objeto.objUnidades}</p>}
        </div>
      </Link>
      <Button
        variant="destructive"
        size="icon"
        onClick={handleDelete}
        title="Deletar cômodo"
        disabled={locked}
      >
        <Trash2Icon className="h-4 w-4"  />
      </Button>
    </div>
  );
}