import { InboxIcon } from "@/components/ui/icons/akar-icons-inbox";
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
}

export default function ComodoIconButton({ comodo }: ComodoIconButtonProps) {
  return (
    <Link to={`/pousada/comodo/${comodo.PK_comodoID}`} className="text-black">
      <div className="flex flex-row items-center gap-2 p-2 border rounded shadow-sm">
        <InboxIcon />
        <div>
          <p className="font-semibold">{comodo.comodoNome}</p>
          {comodo.comodoTipo && <p className="text-sm text-gray-500">{comodo.comodoTipo}</p>}
        </div>
      </div>
    </Link>
  );
}