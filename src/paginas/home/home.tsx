import AppSidebar from "@/componentes/Sidebar/AppSidebar"
import estilo from "./home.module.css"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
export default function Homepage(){
    return (
    <SidebarProvider>
    <main className={estilo.bodyHome}>
            <AppSidebar/>
            <div className="fixed top-4 left-4 z-50"><SidebarTrigger/></div>
             

        <div className="ml-0 md:ml-64 p-4 flex items-center justify-center min-h-screen w-full">
            <div className="position ">
            </div>
            <div className={estilo.boxHome}>
                <h1 className={estilo.tituloHome}>Bem vindo ao sistema de gerenciamento da Pousada</h1>
                <p className={estilo.textoHome}>Utilize o menu lateral para navegar entre as páginas</p>
                <div className="flex flex-row">
                    <Link className="p-3" to={'/register'}><Button >Cadastre-se</Button></Link>
                <Link className="p-3" to={'/login'}><Button >Faça Login</Button></Link>
                </div>
            </div>
        </div>
    </main>
    </SidebarProvider>
    )
}