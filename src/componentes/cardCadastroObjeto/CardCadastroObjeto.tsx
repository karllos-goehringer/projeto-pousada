import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface PropsObjeto {
    comodoID: string | undefined;
    nomeComodo: string | undefined;
  onCreated?: () => void;
  onClose?: () => void;
}

export default function CardCadastroObjeto({ nomeComodo, comodoID, onCreated, onClose }: PropsObjeto) {
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm();

  const handlePreview = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(fileList[0]);
    setPreview(url);
  };

  const onSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setMsg("❌ Usuário não autenticado.");
        return;
      }
        const payload = {
        PFK_comodoID: Number(comodoID),
        objNome: data.objNome,
        objMarca: data.objMarca,
        objUnidades: Number(data.objUnidades),
        objLink: data.objLink,
        objImagem: preview || "",
        };

      const res = await fetch("http://localhost:3000/objeto/objeto/create-objeto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMsg("✅ Objeto cadastrado com sucesso!");
        reset();
        setPreview(null);

        if (onCreated) onCreated();
        if (onClose) onClose();
      } else {
        const erro = await res.text();
        setMsg(`❌ Erro: ${erro || "Falha ao cadastrar objeto."}`);
      }
    } catch (err) {
      setMsg("❌ Erro ao conectar ao servidor.");
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
          <Label htmlFor="comodoId">Cômodo Selecionado: *</Label>
            <p className="p-2 border rounded bg-gray-100">{nomeComodo}</p>
        </div>
        <div>
          <Label htmlFor="objNome">Nome do objeto *</Label>
          <Input id="objNome" {...register("objNome")} type="text" required />
        </div>
        <div>
          <Label htmlFor="objMarca">Marca</Label>
          <Input id="objMarca" {...register("objMarca")} type="text" />
        </div>
        <div>
          <Label htmlFor="objLink">Link de compra</Label>
          <Input id="objLink" {...register("objLink")} type="url" placeholder="https://" />
        </div>
        <div>
          <Label htmlFor="objUnidades">Número de unidades</Label>
          <Input
            id="objUnidades"
            {...register("objUnidades")}
            type="number"
            min={1}
            defaultValue={1}
          />
        </div>
        <div>
          <Label htmlFor="objImagem">Imagem</Label>
          <Input
            id="objImagem"
            type="file"
            accept="image/*"
            {...register("objImagem")}
            onChange={(e) => handlePreview(e.target.files)}
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-2 "
            />
          )}
        </div>
        <div className="pt-3">
          <Button className="w-full" type="submit">
            Salvar
          </Button>
        </div>
        {msg && <p className="text-center text-sm mt-2">{msg}</p>}
      </form>
    </CardContent>
  );
}
