import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import type { Verificacao } from "../TabelaCompletaVerificacoes/TabelaCompletaVerificacoes";
import TabelaCompletaVerificacoes from "../TabelaCompletaVerificacoes/TabelaCompletaVerificacoes";

interface DialogRelatorioProps {
  verificacao: Verificacao;
  onClose: () => void;
}

export default function DialogRelatorio({ verificacao, onClose }: DialogRelatorioProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) {
          onClose?.();
        }
      }}
    >
      <DialogContent className="bg-white !bg-opacity-100 dark:!bg-white border border-gray-300 rounded-xl shadow-lg p-6 max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Relatório de Verificação
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <TabelaCompletaVerificacoes verificacao={verificacao} />
        </div>
      </DialogContent>
    </Dialog>
  );
}