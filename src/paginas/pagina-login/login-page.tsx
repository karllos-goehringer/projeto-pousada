import AppSidebar from "@/componentes/Sidebar/AppSidebar"
import LoginForm from "../../componentes/login-form/login-page"

import estilo from './login-page.module.css'

export default function PaginaLogin() {
    return (
            <main className="min-h-screen">
                <AppSidebar />
                <div className="ml-0 md:ml-64 p-4 flex items-center justify-center min-h-screen w-full">
                    <div className={estilo.boxHome}>
                        <LoginForm />
                    </div>
                </div>
            </main>
    )
}