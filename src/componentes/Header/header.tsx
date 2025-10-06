import { Link } from "react-router-dom";
import estilo from "./header.module.css";
import LocalStorage from "../../backend/LocalStorage";
export default function Header() {
    let boxUser = null;
    if (LocalStorage.UserLogged != null) {
        boxUser = (
            <div className={estilo.boxUser}>
                <p>Bem vindo, {LocalStorage.UserLogged.name}</p>
                <Link to ="/pousadas">Minhas Pousadas</Link>
                <Link to="/home">Home</Link>
                <Link to="/logout">Logout</Link>
            </div>)}else{
            boxUser = (
                <div className={estilo.boxUser}>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Registrar</Link>
                    <Link to="/home">Home</Link>
                </div>
            )
            }
        return (
            <div>{boxUser}</div>
        )
    }