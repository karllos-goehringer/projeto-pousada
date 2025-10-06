import React, { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import LocalStorage from "../../backend/LocalStorage";
import User from "../../backend/user/user";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import estilo from "./login-form.module.css"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
export default function LoginForm(): JSX.Element {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const data = { email, senha };
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      let info = await res.json();
      localStorage.setItem("authToken", info.token);

      LocalStorage.UserLogged = new User(info.usuario.email, info.usuario.nome, info.usuario.adm, info.usuario.id);
      setMsg("Tudo certo. Bem vindo!");
      setEmail("");
      setSenha("");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } else {
      setMsg("Credenciais inválidas.");
    }
  } catch (err) {
    console.error(err);
    setMsg("Falha na conexão com o servidor.");
  }
};
    return (
        <div className="flex items-center justify-center min-h-screen color-bg p-4 ">
            <Card className="w-[600px] h-[400px] text-colors white">
                <CardHeader className="text-center mb-4">
                    <CardTitle className="text-2xl font-bold">Logar-se</CardTitle>
                    <CardDescription>Entre com suas credenciais</CardDescription>
                    {msg && <p className={estilo.aviso}>{msg}</p>}
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} method="POST" className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="email@exemplo.com" required onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Senha</Label>
                                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                    Esqueceu a senha?
                                </a>
                            </div>
                            <Input id="password" type="password" required onChange={(e) => setSenha(e.target.value)}/>
                        </div>
                        <Button type="submit"  className="w-full" >
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
