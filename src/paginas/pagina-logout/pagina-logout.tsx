import LocalStorageInstance from "../../backend/LocalStorage";

export default function PaginaLogout(){
    LocalStorageInstance.UserLogged = null;
    window.location.href = "/login";
    return(
        <div>
            <h1>Saindo...</h1>
        </div>
    )
}