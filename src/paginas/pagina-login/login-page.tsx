import AppSidebar from "@/componentes/Sidebar/AppSidebar"
import LoginForm from "../../componentes/login-form/login-page"

import estilo from './login-page.module.css'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function PaginaLogin() {
    return (
        <SidebarProvider>  
             <AppSidebar/>
                     <div className="fixed top-4 left-4 z-50"><SidebarTrigger/></div>    
            <main className="flex flex-row justify-center w-9/12">
            <div className="ml-0 md:ml-64  flex items-center justify-center min-h-screen w-full">
                <div className={estilo.boxHome}>
                    <LoginForm />
                </div>
            </div>
        </main>
        </SidebarProvider>

    )
}