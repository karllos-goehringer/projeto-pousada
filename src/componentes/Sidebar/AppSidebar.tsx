import LocalStorage from "@/backend/LocalStorage"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { PersonAddIcon } from "@/components/ui/icons/akar-icons-person-add";
import { ChevronRightSmallIcon } from "@/components/ui/icons/akar-icons-chevron-right-small";
import { ChevronLeftSmallIcon } from "@/components/ui/icons/akar-icons-chevron-left-small";
import { Grid2X2Icon, Home, PencilIcon } from "lucide-react";
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
            <Link to="/home"   className="flex flex-col items-center gap-2" ><Home className="h-4 w-4" /> Home</Link>
            <SidebarGroup />
            <Link to="/pousadas-user" className="flex flex-row items-center gap-2" ><Grid2X2Icon className="h-4 w-4" />Minhas Pousadas</Link>
            <SidebarGroup />
                  <Link to="/form-pousada/"><PencilIcon className="h-4 w-4" />Cadastrar nova Pousada</Link>
            <SidebarGroup />
          </SidebarContent>

          <SidebarFooter>
            <Link to="/logout"><ChevronLeftSmallIcon className="h-4 w-4" />Sair</Link>
          </SidebarFooter>
        </Sidebar>
      ) : (
        <Sidebar>
          <SidebarHeader>
            <h1 className="text-2xl font-bold">Menu</h1>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup />
            <Link to="/home"><Home  className="h-4 w-4" />Home</Link>
            <SidebarGroup />
            <Link to="/login"><ChevronRightSmallIcon className="h-4 w-4" />Entrar</Link>
            <Link to="/register"><PersonAddIcon className="h-4 w-4" />Registrar-se</Link>
            <SidebarGroup />
          </SidebarContent>

          <SidebarFooter />
        </Sidebar>
      )}
    </div>
  )
}

export default AppSidebar
