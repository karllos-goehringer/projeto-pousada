import LocalStorage from "@/backend/LocalStorage"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export function AppSidebar() {
  const isLogged = !!LocalStorage.UserLogged?.id

  return (
    <div>
      {isLogged ? (
        <Sidebar>
          <SidebarHeader>
            <h1 className="text-2xl font-bold">Menu</h1>
          </SidebarHeader>

          <SidebarContent>
           
            <a>Boas vindas {LocalStorage.UserLogged?.name}!</a>
           
            <SidebarGroup />
            <Link to="/home">Home</Link>
            <SidebarGroup />
            <Link to="/pousadas-user">Minhas Pousadas</Link>
            <SidebarGroup />
                  <Link to="/form-pousada/">Cadastrar nova Pousada</Link>
            <SidebarGroup />
          </SidebarContent>

          <SidebarFooter>
            <Link to="/logout">Sair</Link>
          </SidebarFooter>
        </Sidebar>
      ) : (
        <Sidebar>
          <SidebarHeader>
            <h1 className="text-2xl font-bold">Menu:</h1>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup />
            <Link to="/home">Home</Link>
            <SidebarGroup />
            <Link to="/login">Entrar</Link>
            <Link to="/register">Registrar-se</Link>
            <SidebarGroup />
          </SidebarContent>

          <SidebarFooter />
        </Sidebar>
      )}
    </div>
  )
}

export default AppSidebar
