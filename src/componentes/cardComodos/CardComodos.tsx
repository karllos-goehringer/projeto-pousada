import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form, FormField, FormItem, FormLabel,
  FormControl, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch, SwitchThumb } from "@radix-ui/react-switch";

interface propsComodos {
  comodos: { nome: string }[]; // lista de cômodos
  id: string | undefined;
}

export default function CardComodos(props: propsComodos) {
  const [isLocked, setIsLocked] = useState(true);
  const [msg, setMsg] = useState("");

  const form = useForm({
    defaultValues: {
      comodos: props.comodos || [{ nome: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "comodos",
  });

  const handleSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      const res = await fetch(`http://localhost:3000/pousada/pousada-update-comodos/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMsg("✅ Atualização feita!");
        setTimeout(() => {
          form.reset(data);
          setIsLocked(true);
          setMsg("");
        }, 1000);
      } else {
        setMsg("❌ Erro ao atualizar cômodos.");
      }
    } catch (err) {
      console.error(err);
      setMsg("⚠️ Falha na conexão com o servidor.");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Cômodos</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Editar - </span>
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
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`comodos.${index}.nome`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel className="flex-1">Cômodo {index + 1}</FormLabel>
                    <FormControl className="flex-1">
                      <Input {...field} disabled={isLocked} />
                    </FormControl>
                    {!isLocked && (
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-red-500 text-white px-2 py-1"
                      >
                        ❌
                      </Button>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {!isLocked && (
              <Button
                type="button"
                onClick={() => append({ nome: "" })}
                className="w-full bg-green-500 text-white"
              >
                ➕ Adicionar Cômodo
              </Button>
            )}

            <Button type="submit" disabled={isLocked} className="w-full">
              Salvar Alterações
            </Button>

            {msg && <p className="text-center text-sm mt-2">{msg}</p>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
