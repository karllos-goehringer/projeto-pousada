import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import FormCadastroUser from "../../componentes/cadastro-user/cadastro-user";
import estilo from './pagina-cadastro-user.module.css'
import AppSidebar from "@/componentes/Sidebar/AppSidebar";
export default function PaginaCadastroUser(){  
    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="fixed top-4 left-4 z-50"><SidebarTrigger/></div>
                <main className="flex flex-row justify-center w-9/12">
            <div className="ml-0 md:ml-64  flex items-center justify-center min-h-screen w-full">
                <div className={estilo.boxHome}>
                    <FormCadastroUser />
                </div>
            </div>
        </main>
        </SidebarProvider>
    )
}