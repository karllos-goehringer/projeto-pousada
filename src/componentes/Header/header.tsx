import { Link } from "react-router-dom";
import estilo from "./header.module.css";
import { Button } from "@/components/ui/button";
import LocalStorage from "../../backend/LocalStorage";
export default function Header() {
    let boxUser = null;
    
    if (LocalStorage.UserLogged != null) {
        console.log(LocalStorage.UserLogged)
        boxUser = (
            <div className={estilo.boxUser}>
                <p className="text-white">Bem vindo, {LocalStorage.UserLogged.name}</p>
          
                <Button variant="outline">
                    <Link to="/logout">Logout</Link>
                </Button>
            </div>)
    }
    else {
        boxUser = (
            <div className={estilo.boxUser}>
                <Button variant="outline" className="text-white ">
                    <Link to="/login">Login</Link>
                </Button>
                <Button variant="outline">
                    <Link to="/register">Registrar</Link>
                </Button>
                <Button variant="outline">
                    <Link to="/home">Home</Link>
                </Button>
            </div>
        )
    }
    return (
        <div>{boxUser}</div>
    )
}