import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/backend/auth/AuthProvider";

interface PropsObjeto {
  comodoID: string | undefined;
  nomeComodo: string | undefined;
  onCreated?: () => void;
  onClose?: () => void;
}

interface FormObjeto {
  objNome: string;
  objMarca?: string;
  objUnidades: number;
  objLink?: string;
  objImagem?: FileList;
}

export default function CardCadastroObjeto({
  nomeComodo,
  comodoID,
  onCreated,
  onClose,
}: PropsObjeto) {
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit, watch, reset } = useForm<FormObjeto>();

  // ✔ PEGAR AUTH AQUI NO TOPO (correto)
  const { token } = useAuth();

  const imagemSelecionada = watch("objImagem");

  // Preview
  const handlePreview = (files: FileList | null) => {
    if (!files || files.length === 0) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(files[0]);
    setPreview(url);
  };

  const onSubmit = async (data: FormObjeto) => {
    setMsg("");

    // ❌ TENTAR useAuth() AQUI ERA INVÁLIDO
    if (!token) {
      setMsg("❌ Usuário não autenticado.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("PFK_comodoID", String(comodoID));
      formData.append("objNome", data.objNome);
      formData.append("objMarca", data.objMarca || "");
      formData.append("objUnidades", String(data.objUnidades));
      formData.append("objLink", data.objLink || "");

      if (data.objImagem && data.objImagem.length > 0) {
        formData.append("objImagem", data.objImagem[0]);
      }

      const res = await fetch("http://localhost:3000/objeto/objeto/create-objeto", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const erro = await res.text();
        setMsg(`❌ Erro: ${erro || "Falha ao cadastrar objeto."}`);
        return;
      }

      setMsg("✅ Objeto cadastrado com sucesso!");

      reset();
      setPreview(null);

      onCreated?.();
      onClose?.();

    } catch (error) {
      console.error(error);
      setMsg("❌ Erro ao conectar ao servidor.");
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        <div>
          <Label>Cômodo Selecionado *</Label>
          <p className="p-2 border rounded bg-gray-100">{nomeComodo}</p>
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
          <Input {...register("objLink")} type="url" placeholder="https://" />
        </div>

        <div>
          <Label>Unidades</Label>
          <Input {...register("objUnidades")} type="number" defaultValue={1} min={1} />
        </div>

        <div>
          <Label>Imagem</Label>
          <Input
            type="file"
            accept="image/*"
            {...register("objImagem")}
            onChange={(e) => handlePreview(e.target.files)}
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-2 rounded shadow max-h-40 mx-auto"
            />
          )}
        </div>

        <Button className="w-full" type="submit">
          Salvar
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
