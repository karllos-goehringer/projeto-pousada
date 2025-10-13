import AppSidebar from "@/componentes/Sidebar/AppSidebar"
import estilo from "./home.module.css"
export default function Homepage(){
    return (
    <main className={estilo.bodyHome}>
            <AppSidebar/>
        <div className="ml-0 md:ml-64 p-4 flex items-center justify-center min-h-screen w-full">
            <div className={estilo.boxHome}>
                <h1 className={estilo.tituloHome}>Bem vindo ao sistema de gerenciamento da Pousada</h1>
                <p className={estilo.textoHome}>Utilize o menu lateral para navegar entre as páginas</p>
            </div>
        </div>
    </main>
    )
}