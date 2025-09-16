import CadastroObjeto from "../../componentes/cadastro-objetos/Cadastro-objetos";

export default function PaginaCadastroObjetos(){
    return (
        <div>
            <CadastroObjeto comodos={['sala','quarto','cozinha']}/>
        </div>
    )
}