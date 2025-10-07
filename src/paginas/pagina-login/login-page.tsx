import Header from "../../componentes/Header/header";
import LoginForm from "../../componentes/login-form/login-page";
import AppSidebar from "../paginateste";
import estilo from './login-page.module.css'
export default function PaginaLogin(){
    return (
        <main>
            <AppSidebar/>
        <div className={estilo.boxHome}>
            <LoginForm/>
        </div>
        </main>
        )
}