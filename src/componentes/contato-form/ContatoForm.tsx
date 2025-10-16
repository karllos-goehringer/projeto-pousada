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
import { PhoneInput } from "@/components/ui/phone-input";

interface propsContato {
  email: string;
  telefone: string;
  telefoneAlternativo: string;
  id: string | undefined;
}

export default function ContatoForm(props: propsContato) {
  const [isLocked, setIsLocked] = useState(true);
  const [msg, setMsg] = useState("");

  const form = useForm({
    defaultValues: {
      email: props.email || "",
      telefone: props.telefone || "",
      telefoneAlternativo: props.telefoneAlternativo || "",
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
      const res = await fetch(`rota`, {
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
    window.location.reload(); 
  }, 500);
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
        <CardTitle>Contato</CardTitle>
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
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone Principal</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} defaultCountry="BR" disabled={isLocked}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefoneAlternativo"
              render={({...field}) => (
                <FormItem>
                  <FormLabel>Telefone Alternativo</FormLabel>
                  <FormControl>
                        <PhoneInput {...field} defaultCountry="BR" disabled={isLocked}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled={isLocked} placeholder="email@email.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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