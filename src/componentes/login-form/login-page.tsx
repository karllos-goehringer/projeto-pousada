import React, { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/backend/auth/AuthProvider";

export default function LoginForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();


    const ok = await login(email, senha);
    if (ok) {
      setMsg("Tudo certo. Bem-vindo!");
      setEmail("");
      setSenha("");
      setTimeout(() => {
        navigate("/home");
      }, 800);
    } else {
      setMsg("Credenciais inválidas.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen color-bg p-4">
      <Card className="w-[600px] h-[400px] text-colors white">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl font-bold">Logar-se</CardTitle>
          <CardDescription>Entre com suas credenciais</CardDescription>
          {msg && <p className="text-primary">{msg}</p>}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full text-white">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
