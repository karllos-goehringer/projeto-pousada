import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, FormProvider } from "react-hook-form";
import Header from "@/componentes/Header/header";
import LocalStorage from "@/backend/LocalStorage";

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
};
export default function PaginaCadastroPousadas() {
    // Cria o "methods" completo do React Hook Form
    const methods = useForm<PousadaFormValues>();
    const onSubmit = async (data: PousadaFormValues) => {
        try {
            const token = localStorage.getItem("authToken");
            const userId = LocalStorage.UserLogged?.id;
            if (!token || !userId) {
                console.error("Token ou userId não encontrados");
                return;
            }
            const res = await fetch(`http://localhost:3000/pousada/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            // primeiro lê como texto para depuração
            const text = await res.text();
            console.log("Resposta do servidor:", text);
            // depois tenta converter em JSON
            let info;
            try {
                info = JSON.parse(text);
            } catch {
                console.error("Resposta não é JSON:", text);
                return;
            }
            if (res.ok) {
                console.log("Pousada cadastrada com sucesso:", info);
            } else {
                console.error("Erro ao cadastrar pousada:", info);
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <main className="min-h-screen " >
            <Header />
            <h1 className="max-w-md text-2xl font-bold text-center my-2">Casdastrando Pousada:</h1>
            <div className="max-w-md p-4 rounded-lg shadow flex justify-center m-auto ">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="align-middle m-auto space-y-4 ">
                        {/* Nome */}
                        <FormItem>
                            <FormControl>
                                <div className="w-200 flex flex-col">
                                    <Label htmlFor="nomePousada">Nome da Pousada</Label>
                                    <Input
                                        id="nomePousada"
                                        {...methods.register("nomePousada", { required: "Nome é obrigatório" })}
                                    />
                                    {methods.formState.errors.nomePousada && (
                                        <FormMessage>{methods.formState.errors.nomePousada.message}</FormMessage>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                        {/* Email */}
                        <FormItem>
                            <FormControl>
                                <div className="w-200 flex flex-col">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        {...methods.register("email", { required: "Email é obrigatório" })}
                                    />
                                    {methods.formState.errors.email && (
                                        <FormMessage>{methods.formState.errors.email.message}</FormMessage>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                        {/* Telefone */}
                        <FormItem>
                            <FormControl>
                                <div className="w-200 flex flex-col">
                                    <Label htmlFor="telefone">Telefone</Label>
                                    <Input
                                        id="telefone"
                                        {...methods.register("telefone", { required: "Telefone é obrigatório" })}
                                    />
                                    {methods.formState.errors.telefone && (
                                        <FormMessage>{methods.formState.errors.telefone.message}</FormMessage>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                        {/* Telefone Alternativo */}
                        <FormItem>
                            <FormControl>
                                <div className="w-200 flex flex-col">
                                    <Label htmlFor="telefoneAlternativo">Telefone Alternativo</Label>
                                    <Input
                                        id="telefoneAlternativo"
                                        {...methods.register("telefoneAlternativo")}
                                        placeholder="Opcional"
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                        {/* Rua */}
                        <FormItem>
                            <FormControl>
                                <div className="w-200 flex flex-col">
                                    <Label htmlFor="rua">Rua</Label>
                                    <Input
                                        id="rua"
                                        {...methods.register("rua", { required: "Rua é obrigatória" })}
                                    />
                                    {methods.formState.errors.rua && (
                                        <FormMessage>{methods.formState.errors.rua.message}</FormMessage>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                        {/* Bairro */}
                        <FormItem>
                            <FormControl>
                                <div className="w-200 flex flex-col">
                                    <Label htmlFor="bairro">Bairro</Label>
                                    <Input
                                        id="bairro"
                                        {...methods.register("bairro", { required: "Bairro é obrigatório" })}
                                    />
                                    {methods.formState.errors.bairro && (
                                        <FormMessage>{methods.formState.errors.bairro.message}</FormMessage>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                        {/* Cidade */}
                        <FormItem>
                            <FormControl>
                                <div className="w-200 flex flex-col">
                                    <Label htmlFor="cidade">Cidade</Label>
                                    <Input
                                        id="cidade"
                                        {...methods.register("cidade", { required: "Cidade é obrigatória" })}
                                    />
                                    {methods.formState.errors.cidade && (
                                        <FormMessage>{methods.formState.errors.cidade.message}</FormMessage>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                        {/* UF */}
                        <FormItem>
                            <FormControl>
                                <div className="w-35 flex flex-col">
                                    <Label htmlFor="uf">UF</Label>
                                    <select
                                        id="uf"
                                        {...methods.register("uf", { required: "UF é obrigatório" })}
                                        className="h-10 text-sm border rounded px-2 text-center"
                                        defaultValue=""
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
                                    {methods.formState.errors.uf && (
                                        <FormMessage>{methods.formState.errors.uf.message}</FormMessage>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                        <FormItem>
                            <FormControl>
                                <input
                                    type="hidden"
                                    {...methods.register("id")}
                                    value={LocalStorage.UserLogged?.id} // aqui você passa o ID do usuário vindo do state, props ou contexto
                                /></FormControl>
                        </FormItem>
                        {/* Botão */}
                        <Button type="submit" className="w-auto mt-4">
                            Cadastrar Pousada
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </main>
    );


}