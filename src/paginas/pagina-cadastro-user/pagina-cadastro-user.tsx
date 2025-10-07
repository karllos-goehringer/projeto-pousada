import FormCadastroUser from "../../componentes/cadastro-user/cadastro-user";
import estilo from './pagina-cadastro-user.module.css'
import AppSidebar from "@/componentes/Sidebar/AppSidebar";
export default function PaginaCadastroUser(){  
    return (
        <main className="min-h-screen">
            <AppSidebar />
            <div className="ml-0 md:ml-64 p-4 flex items-center justify-center min-h-screen w-full ">
                <div className={estilo.boxHome}>
                    <FormCadastroUser />
                </div>
            </div>
        </main>
    )
}