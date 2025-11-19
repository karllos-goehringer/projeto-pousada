import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Form, FormField, FormItem, FormLabel,
  FormControl, FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Switch, SwitchThumb } from "@radix-ui/react-switch";
import { RotaBackEnd } from "@/backend/routes/privateroute";

interface PropsEditarNome {
  id: string | undefined;
  onUpdated?: () => void;
  nomePousada?: string;
}

export default function CardEditPousadaNome({ id, nomePousada, onUpdated }: PropsEditarNome) {
  const [isLocked, setIsLocked] = useState(true);
  const [msg, setMsg] = useState("");

  const form = useForm({
    defaultValues: {
      nomePousada: nomePousada || "",
    },
  });
  
  useEffect(() => {
    if (nomePousada) form.reset({ nomePousada });
  }, [nomePousada, form]);

 const handleSubmit = async (data: any) => {  
  if (!id) {
    setMsg("⚠️ ID da pousada não definido!");
    return;
  }
  const token = localStorage.getItem("authToken");
  if (!token) {
    setMsg("⚠️ Usuário não autenticado.");
    return;
  }
  try {
    
    const res = await fetch(`${RotaBackEnd}/pousada/pousada-update-nome/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pousadaNome: data.nomePousada }),
    });   
    if (res.ok) {
      setMsg("✅ Nome atualizado!");
      setIsLocked(true);
      if (onUpdated) onUpdated();
      setTimeout(() => setMsg(""), 2000);
    } else {
      const erro = await res.text();
      setMsg(`❌ Erro: ${erro || "Falha ao atualizar."}`);
    }
  } catch (err) {
    setMsg("⚠️ Erro de conexão com o servidor.");
  }
  
};
useEffect(() => {
}, [isLocked]);
  return (
    <Card className="max-w-md mx-auto mt-6 shadow-lg border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Nome da Pousada</CardTitle>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Editar</span>

          <Switch
            className="bg-gray-600 data-[state=checked]:bg-white"
            checked={!isLocked}
            onCheckedChange={() => setIsLocked(!isLocked)}
          >
            <SwitchThumb className="bg-white data-[state=checked]:bg-black" />
          </Switch>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

            {/* Campo Nome */}
            <FormField
              control={form.control}
              name="nomePousada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da pousada</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLocked} placeholder="Digite o novo nome" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLocked} className="w-full">
              Salvar
            </Button>

            {msg && <p className="text-center text-sm mt-2">{msg}</p>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
