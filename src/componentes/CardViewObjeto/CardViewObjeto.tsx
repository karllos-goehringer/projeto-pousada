import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import type { ObjetoEdit } from "../dialogEditObjeto/DialogEditObjeto";

export interface ObjetoImagem {
  data?: number[];
  type?: string;
}

interface ObjetoComImagem extends ObjetoEdit {
  objImagem?: string | ObjetoImagem;
}

interface PropsObjeto {
  nomeComodo: string | undefined;
  Objeto: ObjetoComImagem;
}

export default function CardViewObjeto({ nomeComodo, Objeto }: PropsObjeto) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!Objeto.objImagem) {
      setPreview(null);
      return;
    }

    if (typeof Objeto.objImagem === "string") {
      setPreview(`http://localhost:3000/uploads/objeto/${Objeto.objImagem}`);
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

  return (
    <CardContent className="space-y-4">

      <div>
        <Label>Cômodo</Label>
        <p className="p-2 border rounded bg-gray-100 font-medium">
          {nomeComodo}
        </p>
      </div>

      <div>
        <Label>Nome</Label>
        <p className="p-2 border rounded bg-gray-100">{Objeto.objNome}</p>
      </div>

      <div>
        <Label>Marca</Label>
        <p className="p-2 border rounded bg-gray-100">
          {Objeto.objMarca || "—"}
        </p>
      </div>

      <div>
        <Label>Link</Label>
        {Objeto.objLink ? (
          <a
            href={Objeto.objLink}
            target="_blank"
            className="p-2 block border rounded bg-gray-100 text-blue-600 underline"
          >
            {Objeto.objLink}
          </a>
        ) : (
          <p className="p-2 border rounded bg-gray-100">—</p>
        )}
      </div>

      <div>
        <Label>Unidades</Label>
        <p className="p-2 border rounded bg-gray-100">
          {Objeto.objUnidades}
        </p>
      </div>

      <div>
        <Label>Imagem</Label>

        {preview ? (
          <img
            src={preview}
            className="mt-3 rounded-lg shadow border max-h-40 mx-auto"
          />
        ) : (
          <p className="p-2 border rounded bg-gray-100">Sem imagem</p>
        )}
      </div>

    </CardContent>
  );
}
