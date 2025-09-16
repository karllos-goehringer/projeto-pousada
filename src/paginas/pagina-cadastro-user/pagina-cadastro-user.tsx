import Header from "@/componentes/Header/header";
import FormCadastroUser from "../../componentes/cadastro-user/cadastro-user";
import estilo from './pagina-cadastro-user.module.css'
export default function PaginaCadastroUser(){  
    return (
        <main>
            <Header/>
        <div className={estilo.boxHome}>
            <FormCadastroUser/>
        </div>
        </main>
    )
}