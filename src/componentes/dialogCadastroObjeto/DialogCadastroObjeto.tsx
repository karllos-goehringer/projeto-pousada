import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CardCadastroObjeto from "../cardCadastroObjeto/CardCadastroObjeto";

export interface DialogCadastroObjetosProps {
  PFK_pousadaID: string | undefined;
  nomeComodo?: string;
  disabled: boolean;
  onCreated?: () => void; // callback para atualizar lista
}

export default function DialogCadastroObjeto({
  PFK_pousadaID,
  nomeComodo,
  disabled = true,
  onCreated,
}: DialogCadastroObjetosProps) {
  return (
    <Dialog>
      <DialogTrigger
        className={`w-full pt-[10px] ${
          disabled ? "opacity-50 pointer-events-none" : ""
        }`}
        disabled={disabled}
      >
        Cadastrar novo Objeto
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Cadastrar novo objeto</DialogTitle>
          <DialogDescription>
            <CardCadastroObjeto comodoID={PFK_pousadaID} nomeComodo={nomeComodo} onCreated={onCreated} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
