import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CardCadastroComodo from "../cardCadastroComodo/Card-Cadastro-Comodo";

interface DialogCadastroComodoProps {
  PFK_pousadaID: string | undefined;
  disabled: boolean;
  onCreated?: () => void; // callback para atualizar lista
}

export default function DialogCadastroComodo({
  PFK_pousadaID,
  disabled = true,
  onCreated,
}: DialogCadastroComodoProps) {
  return (
    <Dialog>
      <DialogTrigger
        className={`w-full pt-[10px] ${
          disabled ? "opacity-50 pointer-events-none" : ""
        }`}
        disabled={disabled}
      >
        Cadastrar novo Cômodo
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Cadastrar novo Cômodo</DialogTitle>
          <DialogDescription>
            {/* ✅ repassa o callback ao CardCadastroComodo */}
            <CardCadastroComodo id={PFK_pousadaID} onCreated={onCreated} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
