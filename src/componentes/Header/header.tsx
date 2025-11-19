import { Link } from "react-router-dom";
import estilo from "./header.module.css";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { PersonAddIcon } from "@/components/ui/icons/akar-icons-person-add";
import { ChevronRightSmallIcon } from "@/components/ui/icons/akar-icons-chevron-right-small";
import { ChevronLeftSmallIcon } from "@/components/ui/icons/akar-icons-chevron-left-small";
import { useAuth } from "@/backend/auth/AuthProvider";
export default function Header() {
    let boxUser = null;
      const { user, } = useAuth();
    if ( user != null) {
        boxUser = (
            <div className={estilo.boxUser}>
                <>
                    <p>Bem vindo, {user.nome}</p>

                    <Button asChild variant="default">
                        <Link to="/pousadas-user">
                            <Home className="mr-2 h-4 w-4" />
                            Minhas Pousadas
                        </Link>
                    </Button>

                    <Button asChild variant="outline">
                        <Link to="/home">
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Link>
                    </Button>

                    <Button asChild variant="outline" >
                        <Link to="/logout">
                            <ChevronLeftSmallIcon className="mr-2 h-4 w-4" />
                            Logout
                        </Link>
                    </Button>
                </>
            </div>)
    } else {
        boxUser = (
            <div className={estilo.boxUser}>
                <Button variant="default">
                    <ChevronRightSmallIcon className="mr-2 h-4 w-4" />
                    <Link to="/login">Login</Link>
                </Button>
                <Button variant="default">
                    <PersonAddIcon className="mr-2 h-4 w-4" />
                    <Link to="/register">Registrar</Link>
                </Button>
                <Button variant="default">
                    <Home className="mr-2 h-4 w-4" />
                    <Link to="/home">Home</Link>
                </Button>
            </div>
        )
    }
    return (
        <div>{boxUser}</div>
    )
}