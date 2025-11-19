import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form, FormField, FormItem, FormLabel,
  FormControl, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch, SwitchThumb } from "@radix-ui/react-switch";
import { PhoneInput } from "@/components/ui/phone-input";
import { RotaBackEnd } from "@/backend/routes/privateroute";
import { useAuth } from "@/backend/auth/AuthProvider";

function parseTelefone(telefone: string) {
  if (!telefone) return { numBandeira: "", numDistrital: "", numero: "" };

  const limpo = telefone.replace(/[()\s-]/g, "");
  const match = limpo.match(/^(\+\d{2})(\d{2})(\d{8,9})$/);

  if (!match) return { numBandeira: "", numDistrital: "", numero: telefone };

  return {
    numBandeira: match[1],
    numDistrital: match[2],
    numero: match[3],
  };
}

interface propsContato {
  email: string;
  telefone: string; // ids dos telefones
  telefoneAlternativo: string;
  id: string | undefined;
}

export default function ContatoForm(props: propsContato) {
  const [isLocked, setIsLocked] = useState(true);
  const [msg, setMsg] = useState("");
  const [dados, setDados] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      telefone: "",
      telefoneAlternativo: "",
      
    },
  });
    const { user } = useAuth();

 useEffect(() => {
  async function buscarTelefones() {
    if (!props.telefone || !props.telefoneAlternativo) return;
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch(
        
        `${RotaBackEnd}/pousada/get-telefones-pousada/${props.telefone}/${props.telefoneAlternativo}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        throw new Error(res.status ? `Erro: ${res.status}` : "Erro desconhecido");
      }

      const dadosNumTelefone = await res.json();

      // Verifica se os objetos existem antes de acessar propriedades
      const tel = dadosNumTelefone?.telefone ?? null;
      const telAlt = dadosNumTelefone?.telefoneAlternativo ?? null;

      const telefoneStr = tel
  ? `${tel.numBandeira ?? ""}${tel.numDistrital ?? ""}${tel.numero ?? ""}`
  : "";

const telefoneAltStr = telAlt
  ? `${telAlt.numBandeira ?? ""}${telAlt.numDistrital ?? ""}${telAlt.numero ?? ""}`
  : "";
      form.reset({
        email: props.email || "",
        telefone: telefoneStr,
        telefoneAlternativo: telefoneAltStr,
      });

      setDados(dadosNumTelefone);
    } catch (err) {
      console.error("Erro ao buscar telefones:", err);
      form.reset({
        email: props.email || "",
        telefone: "",
        telefoneAlternativo: "",
      });
    }
  }

  buscarTelefones();
}, [props.telefone, props.telefoneAlternativo, props.email, form]);

  const handleSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem("authToken");
      const userId = user?.id
      if (!token || !userId) return;

      const telefonePrincipal = parseTelefone(data.telefone);
      const telefoneAlternativo = parseTelefone(data.telefoneAlternativo);

      const payload = { email: data.email, telefone: telefonePrincipal, telefoneAlternativo:telefoneAlternativo, PK_telefoneID:props.telefone, telefoneAltID:props.telefoneAlternativo };
      
      const res = await fetch(`${RotaBackEnd}/pousada/pousada-update-contato/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMsg("✅ Atualização feita!");
        setTimeout(() => form.reset(data))
        setIsLocked(true)
        setMsg("")
      } else {
        setMsg("❌ Erro ao atualizar contato.");
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
          <Switch checked={!isLocked} onCheckedChange={() => setIsLocked(!isLocked)} className="bg-gray-600 data-[state=checked]:bg-white">
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
                    <PhoneInput {...field} defaultCountry="BR" disabled={isLocked} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefoneAlternativo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone Alternativo</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} defaultCountry="BR" disabled={isLocked} />
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
            <Button type="submit" disabled={isLocked} className="w-full">Salvar Alterações</Button>
            {msg && <p className="text-center text-sm mt-2">{msg}</p>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
