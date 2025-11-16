import { useState } from "react"
import LocalStorage from "@/backend/LocalStorage"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { PersonAddIcon } from "@/components/ui/icons/akar-icons-person-add"
import { ChevronRightSmallIcon } from "@/components/ui/icons/akar-icons-chevron-right-small"
import { ChevronLeftSmallIcon } from "@/components/ui/icons/akar-icons-chevron-left-small"
import { Grid2X2Icon, Home, PencilIcon } from "lucide-react"

export function AppSidebar() {
  const [minimized, setMinimized] = useState(false)
  const isLogged = !!LocalStorage.UserLogged?.id

  return (
    <div className="relative flex">
      

      <Sidebar
        className={`transition-all duration-300 bg-white shadow-lg border-r ${minimized ? "w-20" : "w-64"
          }`}
      >
        <SidebarHeader>
          {!minimized && <h1 className="text-2xl font-bold m-auto">Menu</h1>}
        </SidebarHeader>
        <button
        onClick={() => setMinimized(!minimized)}
        className="sticky -left-3 mt-4 z-50 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition"
        >
        {minimized ? <ChevronRightSmallIcon className="h-5 w-5" /> : <ChevronLeftSmallIcon className="h-5 w-5" />}
      </button>
        <SidebarContent>
          {!minimized && isLogged && (
            <a className="block mb-4 text-sm font-medium text-gray-600">
              Boas-vindas, {LocalStorage.UserLogged?.name}!
            </a>
          )}

          <SidebarGroup />
          <Link
            to="/home"
            className="	white-space: nowrap flex  flex-row items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <Home className="h-5 w-5" />
            {!minimized && <span>Home</span>}
          </Link>

          <SidebarGroup />
          {isLogged ? (
            <>
              <Link
                to="/pousadas-user"
                className="flex  flex-row items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
              >
                <Grid2X2Icon className="h-5 w-5" />
                {!minimized && <span>Minhas Pousadas</span>}
              </Link>

              <SidebarGroup />
              <Link
                to="/form-pousada/"
                className="flex  flex-row items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
              >
                <PencilIcon className="h-5 w-5" />
                {!minimized && <span>Cadastrar nova Pousada</span>}
              </Link>

              <SidebarGroup />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex  flex-row items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
              >
                <ChevronRightSmallIcon className="h-5 w-5" />
                {!minimized && <span>Entrar</span>}
              </Link>

              <Link
                to="/register"
                className="flex  flex-row items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
              >
                <PersonAddIcon className="h-5 w-5" />
                {!minimized && <span>Registrar-se</span>}
              </Link>
            </>
          )}
        </SidebarContent>

        <SidebarFooter>
          {isLogged && (
            <Link
              to="/logout"
              className="flex  flex-row items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
            >
              <ChevronLeftSmallIcon className="h-5 w-5" />
              {!minimized && <span>Sair</span>}
            </Link>
          )}
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}

export default AppSidebar
