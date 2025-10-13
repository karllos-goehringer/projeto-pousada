
import { AiOutlineHome } from "react-icons/ai";
import estilo from './cardPousada.module.css';
import { Button } from "@/components/ui/button";
type CardPousadaProps = {
    nomePousada: string;
    idPousada: number|string;
}
export default function CardPousada({ nomePousada, idPousada }: CardPousadaProps) {
    return (
        <div className={estilo.cardPousada}>
            <div>
                <AiOutlineHome  size={50} color="black"/>
            </div>
            <a className="font-bold text-black font">{nomePousada}</a>
            <Button variant="outline" size="sm" className="w-full mb-2">Acessar</Button>
            <a className="text-sm text-gray-500">ID: {idPousada}</a>
        </div>
    )
}
