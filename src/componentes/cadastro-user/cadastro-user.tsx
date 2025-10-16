import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default  function CardCadastroUser() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaForm, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { nome, email, senhaForm };

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if(senhaForm !== senhaConfirm){
        setMsg("⚠️ As senhas não coincidem.");
        return;
      }
      if (res.ok) {
        setMsg("✅ Usuário cadastrado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
        setSenhaConfirm("");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setMsg("❌ Erro ao cadastrar usuário.");
      }
    } catch (err) {
      console.error(err);
      setMsg("⚠️ Falha na conexão com o servidor.");
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen color-bg p-4 ">

            <Card className="w-[600px] h-[400px] text-colors white">
                <CardHeader className="text-center mb-4">
                    <CardTitle className="text-2xl font-bold">Cadastre-se</CardTitle>
                    <CardDescription>Vamos criar sua conta</CardDescription>
                    {msg && <p className="color: var(--primary)">{msg}</p>}
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} method="POST" className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@exemplo.com"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Nome de Usuário</Label>
                            <Input
                                id="nome"
                                type="text"
                                placeholder="Seu nome aqui..."
                                required
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Senha</Label>
                           
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <Label htmlFor="confirm-password">Confirme sua senha:</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                required
                                onChange={(e) => setSenhaConfirm(e.target.value)}
                            />
                            <Button type="submit" className="w-full text-white">
                            Cadastrar
                        </Button>
                        </div>
                        
                    </form>
                </CardContent>
            </Card>
        </div>
  );
}
