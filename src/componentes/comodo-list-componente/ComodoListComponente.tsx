import { Button } from "@/components/ui/button";
import { InboxIcon } from "@/components/ui/icons/akar-icons-inbox";
import { Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

interface Comodo {
  PK_comodoID: number;
  comodoNome: string;
  comodoTipo?: string;
  descComodo?: string;
  capacidadePessoas?: number;
  comodoStatus?: string;
}

interface ComodoIconButtonProps {
  comodo: Comodo;
  locked: boolean;
  onCreated?: () => void;
}

export default function ComodoIconButton({ comodo,locked,onCreated }: ComodoIconButtonProps) {

  async function handleDelete() {
    if (!comodo.PK_comodoID) return;
    const confirmDelete = window.confirm(`Deseja realmente excluir o cômodo "${comodo.comodoNome}"?`);
    if (!confirmDelete) return;

    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(`http://localhost:3000/comodo/comodos/delete-comodo/${comodo.PK_comodoID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        if (onCreated) onCreated();
      }
    } catch (error) {
      console.error(error);
    }
  }
 return (
    <div className="flex flex-row items-center justify-between gap-2 p-2 border rounded shadow-sm">
      <Link to={`/pousada/comodo/${comodo.PK_comodoID}`} className="flex flex-row items-center gap-2 text-black">
        <InboxIcon />
        <div>
          <p className="font-semibold">{comodo.comodoNome}</p>
          {comodo.comodoTipo && <p className="text-sm text-gray-500">{comodo.comodoTipo}</p>}
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