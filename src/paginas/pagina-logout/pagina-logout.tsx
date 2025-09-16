import LocalStorage from "../../backend/LocalStorage";

export default function PaginaLogout(){
    LocalStorage.UserLogged = null;
    window.location.href = "/login";
    return(
        <div>
            <h1>Saindo...</h1>
        </div>
    )
}