import LocalStorage from "@/backend/LocalStorage";
import {Sidebar, SidebarContent,SidebarFooter,SidebarGroup,SidebarHeader,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";

export function AppSidebar() {
     let boxUser = null;
    if (LocalStorage.UserLogged != null) {
        boxUser = (
            <Sidebar>
      <SidebarHeader > 
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
    </Sidebar>)
    }else{
        boxUser = (
            <Sidebar>
      <SidebarHeader > 
        <h1 className="text-2xl font-bold">Menu:</h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
        <Link to="/home">Home</Link>
        <SidebarGroup />
        <Link to="/pousadas-user">Minhas Pousadas</Link>
        
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter >
        <Link to="/logout">Sair</Link>
      </SidebarFooter>
    </Sidebar>
        )
    }
  return (
    <div>
        {boxUser}
    </div>
    
  )
}
export default AppSidebar;