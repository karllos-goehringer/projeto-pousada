import { Link } from "react-router-dom";
import estilo from "./header.module.css";
import LocalStorage from "../../backend/LocalStorage";
import { Button } from "@/components/ui/button";
export default function Header() {
    let boxUser = null;
    if (LocalStorage.UserLogged != null) {
        boxUser = (
            <div className={estilo.boxUser}>
                <p>Bem vindo, {LocalStorage.UserLogged.name}</p>
                <Button variant="default">                
                    <Link to="/pousadas-user">Minhas Pousadas</Link>
                </Button>
                <Button variant="outline">                
                    <Link to="/home">Home</Link>
                </Button>
                <Button variant="outline">                
                    <Link to="/logout">Logout</Link>
                </Button>
            </div>)
    } else {
        boxUser = (
            <div className={estilo.boxUser}>
                <Button variant="default">
                    <Link to="/login">Login</Link>
                </Button>
                <Button variant="default">
                    <Link to="/register">Registrar</Link>
                </Button>
                <Button variant="default">
                    <Link to="/home">Home</Link>
                </Button>
            </div>
        )
    }
    return (
        <div>{boxUser}</div>
    )
}