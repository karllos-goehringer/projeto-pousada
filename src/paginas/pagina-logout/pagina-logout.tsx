import LocalStorage from "../../backend/LocalStorage";

export default function PaginaLogout(){
    LocalStorage.UserLogged = null;
    localStorage.removeItem('token');
    window.location.href = "/login";
    
    return(
        <main>
            <h1>Saindo...</h1>
        </main>
    )
}