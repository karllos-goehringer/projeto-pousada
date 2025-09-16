import Header from "../../componentes/Header/header";
import LoginForm from "../../componentes/login-form/login-page";
import estilo from './login-page.module.css'
export default function PaginaLogin(){
    return (
        <main>
            <Header/>
        <div className={estilo.boxHome}>
            <LoginForm/>
        </div>
        </main>
        )
}