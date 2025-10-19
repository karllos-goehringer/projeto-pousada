import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form, FormField, FormItem, FormLabel,
  FormControl, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch, SwitchThumb } from "@radix-ui/react-switch";
import LocalStorage from "@/backend/LocalStorage";

interface propsEndereco {
  uf: string;
  cidade: string;
  bairro: string;
  rua: string;
  numResidencia: string;
  id: string | undefined;

}

export default function EnderecoForm(props: propsEndereco) {
  const [isLocked, setIsLocked] = useState(true);
  const [msg, setMsg] = useState("");

  const form = useForm({
    defaultValues: {
      uf: props.uf || "",
      cidade: props.cidade || "",
      bairro: props.bairro || "",
      rua: props.rua || "",
      numResidencia: props.numResidencia || "", 
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem("authToken");
      const userId = LocalStorage.UserLogged?.id;

      if (!token || !userId) {
        console.error("Token ou userId não encontrados");
        return;
      }
      console.log(props.id)
      const res = await fetch(`http://localhost:3000/pousada/pousada-update-endereco/${props.id}`, {
          method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMsg("✅ Atualização feita!");
        setTimeout(() => form.reset(data))
        setIsLocked(true)
        setMsg("")

      } else {
        setMsg("❌ Erro ao atualizar endereço.");
      }
    } catch (err) {
      console.error(err);
      setMsg("⚠️ Falha na conexão com o servidor.");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Endereço</CardTitle>
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
            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLocked} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bairro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLocked} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rua"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLocked} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numResidencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número da Residência</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLocked} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel htmlFor="uf">UF</FormLabel>
              <select
                id="uf"
                {...form.register("uf")}
                disabled={isLocked}
                className="h-10 text-sm border rounded px-2 text-center"
              >
                <option value="" disabled>Selecione a UF</option>
                {[
                  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
                  "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO",
                  "RR", "SC", "SP", "SE", "TO"
                ].map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </FormItem>

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