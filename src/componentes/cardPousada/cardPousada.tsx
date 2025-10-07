
import { AiOutlineHome } from "react-icons/ai";
import estilo from './cardPousada.module.css';
type CardPousadaProps = {
    nomePousada: string;
    idPousada: number|string;
}
export default function CardPousada({ nomePousada, idPousada }: CardPousadaProps) {
    return (
        <div className={estilo.cardPousada}>
            <AiOutlineHome fontSize={50} />
            <a className="font-bold text-lg">{nomePousada}</a>
            <a className="text-sm text-gray-500">ID: {idPousada}</a>
        </div>
    )
}
