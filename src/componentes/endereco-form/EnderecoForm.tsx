import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {Form,FormField,FormItem,FormLabel,FormControl,FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch, SwitchThumb } from "@radix-ui/react-switch";
import { useNavigate } from "react-router-dom";
import LocalStorage from "@/backend/LocalStorage";
interface propsEndereco {
  uf: string,
  cidade: string,
  bairro: string,
  rua: string,
  id: string | undefined,
}
export default function EnderecoForm(props: propsEndereco) {
   const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [uf, setUF] = useState("");
  const [msg, setMsg] = useState("");
  const [id, setID] = useState("")
  const navigate = useNavigate();
useEffect(() => {
  if (props.id) {
    setID(props.id);
  }
}, [props.id]);
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      try {
            const token = localStorage.getItem("authToken");
            const userId = LocalStorage.UserLogged?.id;

            if (!token || !userId) {
                console.error("Token ou userId não encontrados");
                return;
            }
    const data = { cidade, bairro, rua, uf };
    try {
        const res = await fetch(`http://localhost:3000/pousada/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
      
      if (res.ok) {
        setMsg("✅ Atualização feita!");
        setCidade("");
        setBairro("");
        setRua("");
        setUF("");
        setTimeout(() => {
          navigate(`http://localhost:3000/pousada/single-page/${id}`);
        }, 1000);
      } else {
        setMsg("❌ Erro ao atualizar endereço.");
      }
    } catch (err) {
      console.error(err);
      setMsg("⚠️ Falha na conexão com o servidor.");
    }
  }catch (err) {
      console.error(err);}}
  const [isLocked, setIsLocked] = useState(true);
  const form = useForm({
    defaultValues: {
      uf: props.uf,
      cidade: props.cidade,
      bairro: props.bairro,
      rua: props.rua
    },
  });
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLocked} onChange={(e) => setCidade(e.target.value)} />
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
                    <Input type="text" {...field} disabled={isLocked} onChange={(e) => setBairro(e.target.value)} />
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
                    <Input {...field} disabled={isLocked} onChange={(e) => setRua(e.target.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormControl>
                <div className="w-35 flex flex-col">
                  <FormLabel htmlFor="uf">UF</FormLabel>
                  <select
                    id="uf"
                    value={props.uf}
                    className="h-10 text-sm border rounded px-2 text-center"
                    defaultValue=""
                    disabled={isLocked}
                    onChange={(e) => setUF(e.target.value)}
                  >
                    <option value="" disabled>Selecione a UF</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                </div>
              </FormControl>
            </FormItem>
            <Button type="submit" disabled={isLocked} className="w-full">
              Salvar Alterações
            </Button>
            
            <FormMessage >{msg}</FormMessage>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
