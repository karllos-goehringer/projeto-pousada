import Header from "../../componentes/Header/header"
import estilo from "./home.module.css"
export default function Homepage(){
    return (
        <body className={estilo.bodyHome}>
            <Header/>
            <div className={estilo.boxHome}>
                <h1 className={estilo.tituloHome}>Bem vindo ao sistema de gerenciamento da Pousada</h1>
                <p className={estilo.textoHome}>Utilize o menu acima para navegar entre as páginas</p>
            </div>
        </body>
    )
}