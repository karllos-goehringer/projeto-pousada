import LocalStorageInstance from "../../backend/LocalStorage";

export default function PaginaLogout(){
    LocalStorageInstance.UserLogged = null;
    localStorage.removeItem('token');
    window.location.href = "/login";
    
    return(
        <main>
            <h1>Saindo...</h1>
        </main>
    )
}