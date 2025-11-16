import { Button } from "@/components/ui/button";
import { InboxIcon } from "@/components/ui/icons/akar-icons-inbox";
import { Trash2Icon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import DialogEditObjeto, { type ObjetoEdit } from "../dialogEditObjeto/DialogEditObjeto";



interface ObjetoIconButtonProps {
  nomeComodo: string | undefined;
  objeto: ObjetoEdit;
  locked: boolean;
  onCreated?: () => void;
}

export default function ItemObjetoList({nomeComodo, objeto, locked, onCreated }: ObjetoIconButtonProps) { 
  const [openDialog, setOpenDialog] = useState(false);
  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Deseja realmente excluir o cômodo "${objeto.objNome}"?`
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch(
        `http://localhost:3000/objeto/objeto/delete-objeto/${objeto.PK_objID}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        if (onCreated) onCreated();
      }
    } catch (error) {}
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-2 p-2 border rounded shadow-sm">
        <button 
          onClick={() => setOpenDialog(true)}
          className="flex flex-row items-center gap-2 text-left flex-1"
        >
          <InboxIcon />
          <div>
            <p className="font-semibold">{objeto.objNome}</p>
            {objeto.objUnidades && (
              <p className="text-sm text-gray-500">
                Unidades: {objeto.objUnidades}
              </p>
            )}
          </div>
        </button>

        <Button
          variant="destructive"
          size="icon"
          onClick={handleDelete}
          title="Deletar objeto"
          disabled={locked}
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </div>

<Dialog open={openDialog} onOpenChange={setOpenDialog}>
  <DialogContent className="bg-white">
    <DialogHeader>
      <DialogTitle>Editar objeto</DialogTitle>
    </DialogHeader>

    <DialogEditObjeto 
      nomeComodo={nomeComodo}
      disabled={locked}
      objeto={objeto}
      onCreated={() => {
        setOpenDialog(false);
        onCreated?.();
      }}
    />
  </DialogContent>
</Dialog>
    </>
  );
}
