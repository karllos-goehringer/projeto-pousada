import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { type ObjetoImagem } from "../cardEditObjeto/CardEditObjeto";
import CardViewObjeto from "../CardViewObjeto/CardViewObjeto";

export interface ObjetoView {
  PFK_comodoID: number;   
  PK_objID: number;
  objNome: string;
  objMarca: string;
  objUnidades: string;
  objLink: string | null;
  objImagem?: string | ObjetoImagem | undefined;
}

interface DialogEditObjetoProps {
  nomeComodo?: string;
  disabled: boolean;
  onCreated?: () => void;
  objeto: ObjetoView;
  onClose: () => void;
}

export default function DialogViewObjeto({
  nomeComodo,
  disabled = true,
  onCreated,
  objeto,
  onClose,
}: DialogEditObjetoProps) {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Abre automaticamente quando o componente renderiza
    setOpen(true);
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);

        // Se o Dialog for fechado, chama o callback
        if (!val) {
          onClose?.();
        }
      }}
    >
      <DialogContent className="bg-white !bg-opacity-100 dark:!bg-white border border-gray-300 rounded-xl shadow-lg p-6 max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Visualizando Objeto {objeto.objNome}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600"></DialogDescription>
        </DialogHeader>

        <div className="mt-4">

          <CardViewObjeto  nomeComodo={nomeComodo}     Objeto={objeto}/>
        </div>
      </DialogContent>
    </Dialog>
  );
}
