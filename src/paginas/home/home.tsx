import AppSidebar from "@/componentes/Sidebar/AppSidebar";
import estilo from "./home.module.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/backend/auth/AuthProvider";

export default function Homepage() {
    const { loading: authLoading, token: authToken, user } = useAuth();

  const seLogado = (
    <div className="max-w-3xl mx-auto text-justify">

        <h1 className="text-4xl font-bold">
            Bem-vindo, {user?.nome || "usuário"} 👋
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
            Este sistema foi desenvolvido para facilitar o gerenciamento completo
            da pousada, permitindo que você controle cômodos, objetos e verificações
            de forma rápida, organizada e totalmente integrada.
        </p>
        <p className="text-muted-foreground text-base">
            Através do menu lateral, você pode cadastrar pousadas, adicionar cômodos,
            registrar objetos e realizar verificações após as estadias — garantindo 
            mais segurança, precisão e eficiência no trabalho diário.
        </p>
        <p className="font-medium mt-4">
            Utilize o menu à esquerda para começar.
        </p>
    </div>
);

    const naoLogado = (
        <div className={estilo.boxHome}>
            <h1 className={estilo.tituloHome}>
                Bem vindo ao sistema de gerenciamento da Pousada
            </h1>

            <p className={estilo.textoHome}>
                Utilize o menu lateral para navegar entre as páginas
            </p>

            <div className="flex flex-row">
                <Link className="p-3" to={"/register"}>
                    <Button>Cadastre-se</Button>
                </Link>

                <Link className="p-3" to={"/login"}>
                    <Button>Faça Login</Button>
                </Link>
            </div>
        </div>
    );

    // 🔥 Escolhe o conteúdo dependendo se o usuário está logado
    const render = user?.id ? seLogado : naoLogado;

return (
    <SidebarProvider>
        <main className="flex flex-row w-full">
            <AppSidebar />
            <div className="fixed top-4 left-4 z-50">
                <SidebarTrigger />
            </div>
            <div className="ml-0 md:ml-64 flex items-center justify-center min-h-screen w-full p-6">
                {render}
            </div>

        </main>

    </SidebarProvider>
);
}
