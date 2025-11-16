import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { ObjetoEdit } from "../dialogEditObjeto/DialogEditObjeto";

interface FormObjeto {
  PK_objID: number;
  objNome: string;
  objMarca?: string;
  objLink?: string;
  objUnidades: number;
  objImagem?: FileList;
  PFK_comodoID: number; 
}

export interface ObjetoImagem {
  data?: number[];
  type?: string;
}

interface ObjetoComImagem extends ObjetoEdit {
  objImagem?: string | ObjetoImagem;
}

interface PropsObjeto {
  nomeComodo: string | undefined;
  onCreated?: () => void;
  onClose?: () => void;
  Objeto: ObjetoComImagem;
}

export default function CardEditObjeto({ nomeComodo, onCreated, onClose, Objeto }: PropsObjeto) {
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const { register, handleSubmit, watch } = useForm<FormObjeto>({
    defaultValues: {
      objNome: Objeto.objNome,
      objMarca: Objeto.objMarca || "",
      objLink: Objeto.objLink || "",
      objUnidades: Number(Objeto.objUnidades),
    },
  });

  const imagemSelecionada = watch("objImagem");
  console.log(Objeto.PK_objID)
  useEffect(() => {
    if (!Objeto.objImagem) {
      setPreview(null);
      return;
    }

    if (typeof Objeto.objImagem === "string") {
      setPreview(`http://localhost:3000/uploads/objeto/${Objeto.objImagem}`)
      return;
    }

    const imagem = Objeto.objImagem as ObjetoImagem;

    if (imagem?.data && Array.isArray(imagem.data)) {
      try {
        const base64 = btoa(
          new Uint8Array(imagem.data).reduce(
            (acc, byte) => acc + String.fromCharCode(byte),
            ""
          )
        );

        setPreview(`data:image/jpeg;base64,${base64}`);
      } catch (error) {
        console.error("Erro ao converter buffer da imagem:", error);
        setPreview(null);
      }
    }

  }, [Objeto]);
  useEffect(() => {
    if (imagemSelecionada && imagemSelecionada.length > 0) {
      const file = imagemSelecionada[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imagemSelecionada]);
  const onSubmit = async (data: FormObjeto) => {
    setMsg("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setMsg("❌ Usuário não autenticado.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("objNome", data.objNome);
      formData.append("objMarca", data.objMarca || "");
      formData.append("objLink", data.objLink || "");
      formData.append("objUnidades", String(data.objUnidades));
      formData.append("PFK_comodoID", String(Objeto.PFK_comodoID));

      if (imagemSelecionada && imagemSelecionada.length > 0) {
        formData.append("objImagem", imagemSelecionada[0]);
      }

      const res = await fetch(
        `http://localhost:3000/objeto/objeto/update-objeto${Objeto.PK_objID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const erro = await res.text();
        setMsg(`❌ Erro: ${erro || "Falha no servidor."}`);
        return;
      }

      setMsg("✅ Objeto atualizado com sucesso!");

      setTimeout(() => {
        onCreated?.();
        onClose?.();
      }, 1500);

    } catch (err) {
      console.error(err);
      setMsg("❌ Erro ao conectar ao servidor.");
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <Label>Cômodo *</Label>
          <p className="p-2 border rounded bg-gray-100 font-medium">
            {nomeComodo}
          </p>
        </div>

        <div>
          <Label>Nome *</Label>
          <Input {...register("objNome", { required: true })} />
        </div>

        <div>
          <Label>Marca</Label>
          <Input {...register("objMarca")} />
        </div>

        <div>
          <Label>Link</Label>
          <Input {...register("objLink")} type="url" />
        </div>

        <div>
          <Label>Unidades</Label>
          <Input {...register("objUnidades")} type="number" min={1} />
        </div>

        <div>
          <Label>Imagem</Label>

          <Input type="file" accept="image/*" {...register("objImagem")} />

          {preview && (
            <img
              src={preview}
              className="mt-3 rounded-lg shadow border max-h-40 mx-auto"
            />
          )}
        </div>

        <Button className="w-full" type="submit">
          Salvar Alterações
        </Button>

        {msg && (
          <p
            className={`text-center text-sm ${
              msg.includes("❌") ? "text-red-600" : "text-green-600"
            }`}
          >
            {msg}
          </p>
        )}
      </form>
    </CardContent>
  );
}
