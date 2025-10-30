import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Switch, SwitchThumb } from "@radix-ui/react-switch";
import { useEffect, useState } from "react";
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


export default function ViewComodo({ PFK_pousadaID, PK_comodoID, capacidadePessoas, comodoNome, comodoStatus, comodoTipo, descComodo,}: PropsViewComodo) {
    const [msg, setMsg] = useState("");
    const [isLocked, setIsLocked] = useState(true);
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            comodoNome: comodoNome || "",
            comodoTipo: comodoTipo || "",
            descComodo: descComodo || "",
            capacidadePessoas: capacidadePessoas || 1,
            comodoStatus: comodoStatus || "",
        },
    });


    useEffect(() => {
        reset({
            comodoNome: comodoNome || "",
            comodoTipo: comodoTipo || "",
            descComodo: descComodo || "",
            capacidadePessoas: capacidadePessoas || 1,
            comodoStatus: comodoStatus || "",
        });
    }, [comodoNome, comodoTipo, descComodo, capacidadePessoas, comodoStatus, reset]);


    const onSubmit = async (data: any) => {
        if (!PFK_pousadaID) {
            setMsg("⚠️ ID da pousada não definido!");
            return;
        }


        data.PFK_pousadaID = Number(PFK_pousadaID);


        const token = localStorage.getItem("authToken");
        if (!token) {
            setMsg("⚠️ Usuário não autenticado.");
            return;
        }


        try {
            const res = await fetch(
                `http://localhost:3000/comodo/comodos/update-comodo/${PK_comodoID}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );


            if (res.ok) {
                setMsg("✅ Cômodo atualizado com sucesso!");
                isLocked || setIsLocked(true);
            } else {
                const erro = await res.text();
                setMsg(`❌ Erro: ${erro || "Falha ao atualizar cômodo."}`);
            }
        } catch (err: any) {
            setMsg("❌ Erro de conexão com o servidor.");
        }
    };


    return (
            <Card className="max-w-md mx-auto mt-10">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Dados do Cômodo:</CardTitle>
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
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <div>
                            <Label htmlFor="comodoNome">Nome:</Label>
                            <Input
                                id="comodoNome"
                                type="text"
                                disabled={isLocked}
                                required
                                {...register("comodoNome")}
                            />
                        </div>


                        <div>
                            <Label htmlFor="comodoTipo">Tipo de cômodo:</Label>
                            <select
                                id="comodoTipo"
                                className="h-10 text-sm border rounded px-2 text-center w-full"
                                required
                                disabled={isLocked}
                                {...register("comodoTipo")}
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
                            <Input
                                id="descComodo"
                                type="text"
                                disabled={isLocked}
                                {...register("descComodo")}
                            />
                        </div>


                        <div>
                            <Label htmlFor="capacidadePessoas">Capacidade de Pessoas:</Label>
                            <Input
                                id="capacidadePessoas"
                                type="number"
                                min="1"
                                disabled={isLocked}
                                {...register("capacidadePessoas", { valueAsNumber: true })}
                            />
                        </div>


                        <div>
                            <Label htmlFor="comodoStatus">Status atual:</Label>
                            <Input
                                id="comodoStatus"
                                type="text"
                                disabled={isLocked}
                                {...register("comodoStatus")}
                            />
                        </div>


                        <div className="flex justify-between pt-3">
                            <Button className="w-full" type="submit" disabled={isLocked || isSubmitting}>
                                {isSubmitting ? "Atualizando..." : "Atualizar"}
                            </Button>
                        </div>


                        {msg && <p className="text-center text-sm mt-2">{msg}</p>}
                    </form>
                </CardContent>
            </Card>
    );
}