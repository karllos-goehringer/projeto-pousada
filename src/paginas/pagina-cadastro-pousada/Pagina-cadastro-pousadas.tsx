import { Button } from "@/components/ui/button";
import { FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LocalStorage from "@/backend/LocalStorage";
import AppSidebar from "@/componentes/Sidebar/AppSidebar";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useAuth } from "@/backend/auth/AuthProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RotaBackEnd } from "@/backend/routes/privateroute";
type PousadaFormValues = {
  nomePousada: string;
  email: string;
  telefone: string;
  telefoneAlternativo?: string;
  rua: string;
  bairro: string;
  cidade: string;
  uf: string;
  id: number;
  numResidencia: string;
};

function parseTelefone(telefone: string) {
  if (!telefone) return { bandeira: "", prefixoRegional: "", numero: "" };
  const limpo = telefone.replace(/[()\s-]/g, "");
  const match = limpo.match(/^(\+\d{2})(\d{2})(\d{8,9})$/);
  if (!match) return { bandeira: "", prefixoRegional: "", numero: telefone };

  return {
    bandeira: match[1],
    prefixoRegional: match[2],
    numero: match[3],
  };
}

export default function PaginaCadastroPousadas() {
  const methods = useForm<PousadaFormValues>();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const data_token = token;
  const userId = user?.id
  const onSubmit = async (data: PousadaFormValues) => {
    try {


      if (!token || !userId) return;

      let telefoneAlternativo = { bandeira: " ", prefixoRegional: " ", numero: " " };

      const telefonePrincipal = parseTelefone(data.telefone);
      if (data.telefoneAlternativo) {
        telefoneAlternativo = parseTelefone(data.telefoneAlternativo);
      }

      const payload = {
        nomePousada: data.nomePousada,
        email: data.email,
        telefone: telefonePrincipal,
        telefoneAlternativo: telefoneAlternativo,
        cidade: data.cidade,
        bairro: data.bairro,
        rua: data.rua,
        numResidencia: data.numResidencia,
        uf: data.uf,
        id: userId,   // ← Agora correto!
      };
 
      const res = await fetch(`${RotaBackEnd}/pousada/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data_token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setTimeout(() => navigate("/pousadas-user"), 1000);
      } else {
        console.error("Erro ao cadastrar pousada");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SidebarProvider>
    <main className="flex flex-row justify-center w-11/12">
             <AppSidebar/>
            <div className="fixed top-4 left-4 z-50"><SidebarTrigger/></div>
      <div className="ml-0 md:ml-64 w-full p-4 flex justify-center">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Cadastrar Nova Pousada
          </h1>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">

              {/* Nome da pousada */}
              <FormItem>
                <Label>Nome da Pousada</Label>
                <Input
                  {...methods.register("nomePousada", { required: "Nome é obrigatório" })}
                />
                <FormMessage>
                  {methods.formState.errors.nomePousada?.message}
                </FormMessage>
              </FormItem>

              {/* Email */}
              <FormItem>
                <Label>Email</Label>
                <Input
                  type="email"
                  {...methods.register("email", { required: "Email é obrigatório" })}
                />
                <FormMessage>
                  {methods.formState.errors.email?.message}
                </FormMessage>
              </FormItem>

              {/* Telefone */}
              <FormItem>
                <Label>Telefone</Label>
                <Controller
                  name="telefone"
                  control={methods.control}
                  rules={{ required: "Telefone é obrigatório" }}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col">
                      <PhoneInput
                        {...field}
                        defaultCountry="BR"
                        className="p-2 border rounded-md"
                      />
                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </div>
                  )}
                />
              </FormItem>

              {/* Telefone alternativo */}
              <FormItem>
                <Label>Telefone Alternativo</Label>
                <Controller
                  name="telefoneAlternativo"
                  control={methods.control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      defaultCountry="BR"
                      className="p-2 border rounded-md"
                    />
                  )}
                />
              </FormItem>

              {/* Grid responsivo de endereço */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <FormItem>
                  <Label>Rua</Label>
                  <Input
                    {...methods.register("rua", { required: "Rua obrigatória" })}
                  />
                  <FormMessage>{methods.formState.errors.rua?.message}</FormMessage>
                </FormItem>

                <FormItem>
                  <Label>Nº</Label>
                  <Input
                    type="number"
                    {...methods.register("numResidencia", { required: "Número obrigatório" })}
                  />
                </FormItem>

                <FormItem>
                  <Label>Bairro</Label>
                  <Input
                    {...methods.register("bairro", { required: "Bairro obrigatório" })}
                  />
                  <FormMessage>{methods.formState.errors.bairro?.message}</FormMessage>
                </FormItem>

                <FormItem>
                  <Label>Cidade</Label>
                  <Input
                    {...methods.register("cidade", { required: "Cidade obrigatória" })}
                  />
                  <FormMessage>{methods.formState.errors.cidade?.message}</FormMessage>
                </FormItem>

                <FormItem>
                  <Label>UF</Label>
                  <select
                    {...methods.register("uf", { required: "UF obrigatória" })}
                    className="border rounded-md h-10 px-2"
                  >
                    <option value="">Selecione</option>
                    {[
                      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
                      "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS",
                      "RO", "RR", "SC", "SP", "SE", "TO"
                    ].map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </FormItem>

              </div>

              {/* ID Hidden */}
              <input type="hidden" {...methods.register("id")} value={LocalStorage.UserLogged?.id} />

              <Button className="w-full mt-4" type="submit">
                Cadastrar Pousada
              </Button>

            </form>
          </FormProvider>
        </div>
      </div>
    </main>
    </SidebarProvider>
  );
}
