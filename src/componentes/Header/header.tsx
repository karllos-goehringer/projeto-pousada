import { Link } from "react-router-dom";
import LocalStorageInstance from "../../backend/LocalStorage";
import estilo from "./header.module.css";
export default function Header() {
    let boxUser = null;
    if (LocalStorageInstance.UserLogged != null) {
        boxUser = (
            <div className={estilo.boxUser}>
                <p>Bem vindo, {LocalStorageInstance.UserLogged.name}</p>
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