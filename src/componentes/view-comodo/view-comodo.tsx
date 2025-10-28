import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useForm } from "react-hook-form";
interface PropsViewComodo {
    PFK_pousadaID: string | undefined;
    PK_comodoID: string | undefined;
    capacidadePessoas: number | undefined;
    comodoNome: string | undefined;
    comodoStatus: string | undefined;
    comodoTipo: string | undefined;
    descComodo: string | undefined;
}
export default function ViewComodo({ PFK_pousadaID, PK_comodoID, capacidadePessoas, comodoNome, comodoStatus, comodoTipo, descComodo }: PropsViewComodo) {
    const [id, setId] = useState<string | undefined>(undefined);
    const [msg, setMsg] = useState("");
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data: any) => {
        setId("1")
        if (!id) {
            setMsg("⚠️ ID da pousada não definido!");
            return;
        }
        data.PFK_pousadaID = Number(id);
        const token = localStorage.getItem("authToken");
        if (!token) {
            setMsg("⚠️ Usuário não autenticado.");
            return;
        }
        try {
            const res = await fetch(`http://localhost:3000/comodo/comodos/atualizar-comodo${PK_comodoID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setMsg("✅ Cômodo cadastrado com sucesso!");
            } else {
                const erro = await res.text();
                setMsg(`❌ Erro: ${erro || "Falha ao cadastrar cômodo."}`);
            }
        } catch (err: any) {
            setMsg("❌ Erro de conexão com o servidor.");
        }
    };
    return (
        <div>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                        <Label htmlFor="comodoNome">Nome:</Label>
                        <Input value={comodoNome} id="comodoNome" {...register("comodoNome")} type="text" required />

                    </div>

                    <div>
                        <Label htmlFor="tipoComodo" >Tipo de cômodo:</Label>
                        <select
                            id="comodoTipo"
                            {...register("comodoTipo")}
                            className="h-10 text-sm border rounded px-2 text-center w-full"
                            required
                            defaultValue={comodoTipo}
                        >
                            <option value="" disabled>
                                Selecione o tipo de Cômodo
                            </option>
                            <option value="Quarto de Solteiro">Quarto de Solteiro</option>
                            <option value="Quarto de Casal">Quarto de Casal</option>
                            <option value="Suíte">Suíte</option>
                            <option value="Quarto c/+2 Pessoas">Quarto c/+2 Pessoas</option>
                            <option value="Sala">Sala</option>
                            <option value="Cozinha">Cozinha</option>
                            <option value="Dispensa">Dispensa</option>
                            <option value="Varanda">Varanda</option>
                            <option value="Área Molhada">Área Molhada</option>
                            <option value="Quintal">Quintal</option>
                            <option value="Área de Jogos">Área de Jogos</option>
                            <option value="Outros">Outros (Adicione o nome depois!)</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="descComodo">Descrição:</Label>
                        <Input id="descComodo" value={descComodo} {...register("descComodo")} type="text" />
                    </div>

                    <div>
                        <Label htmlFor="capacidadePessoas">Capacidade de Pessoas:</Label>
                        <Input id="capacidadePessoas" value={capacidadePessoas} {...register("capacidadePessoas")} type="number" min="1" />
                    </div>

                    <div>
                        <Label htmlFor="comodoStatus">Status atual:</Label>
                        <Input id="comodoStatus" value={comodoStatus}  {...register("comodoStatus")} type="text" />
                    </div>

                    <div className="flex justify-between pt-3">
                        <Button className="w-full" type="submit">
                            Atualizar
                        </Button>
                    </div>

                    {msg && <p className="text-center text-sm mt-2">{msg}</p>}
                </form>
            </CardContent>
        </div>
    )
}