import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CardEditObjeto, { type ObjetoImagem } from "../cardEditObjeto/CardEditObjeto";
export interface ObjetoEdit{
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
    onCreated?: () => void; // callback para atualizar lista
    objeto: ObjetoEdit;
    
}

export default function DialogEditObjeto( 
  {
  nomeComodo,
  disabled = true,
  onCreated,
  objeto   
}:DialogEditObjetoProps ) {
  return (
      <Dialog>
  <DialogTrigger
    className={`w-full pt-[10px] ${disabled ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}`}
    disabled={disabled}
  >
    Editar Objeto
  </DialogTrigger>

 <DialogContent
  className=" bg-white  !bg-opacity-100  dark:!bg-white  border  border-gray-300  rounded-xl  shadow-lg  p-6  max-w-lg  w-full">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold ">
        Editar Objeto
      </DialogTitle>

      <DialogDescription className="text-sm text-gray-600">
        Atualize os dados do objeto selecionado.
      </DialogDescription>
    </DialogHeader>
    <div className="mt-4">
      <CardEditObjeto
        nomeComodo={nomeComodo}
        onCreated={onCreated}
        Objeto={objeto}
      />
    </div>
  </DialogContent>
</Dialog>
  )
}