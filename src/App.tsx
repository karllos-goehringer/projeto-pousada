import './App.css'
import LoginPage from './paginas/pagina-login/login-page'
import Homepage from './paginas/home/home'
import PaginaCadastroObjetos from './paginas/pagina-cadastro-objetos/Pagina-cadastro-objetos'
import PaginaCadastroUser from './paginas/pagina-cadastro-user/pagina-cadastro-user'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PaginaLogout from './paginas/pagina-logout/pagina-logout'
import PrivateRoute from './backend/private-route/private-route'
import { SidebarProvider } from '@/components/ui/sidebar'
import PousadasGeral from './paginas/pagina-pousadas-geral/pousadas-geral'
import PaginaCadastroPousadas from './paginas/pagina-cadastro-pousada/Pagina-cadastro-pousadas'
import PaginaPousada from './paginas/pagina-pousada/pagina-pousada'
import PaginaComodo from './paginas/pagina-comodo/Pagina-comodo.tsx'
function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/index' element={<Homepage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/pagina-item/:id' element={<PaginaCadastroObjetos />} />
        <Route path='/register' element={<PaginaCadastroUser />} />
        <Route path='/logout' element={<PaginaLogout />} />
        <Route path="*" element={<Homepage />} />
        <Route element={<PrivateRoute />}>
          <Route path ="/pousadas-user" element={<PousadasGeral />} />
          <Route path='/form-pousada/' element={<PaginaCadastroPousadas />} />
          <Route path='/pousada/single-page/:id' element={<PaginaPousada/>} />
          <Route path='/pousada/comodo/:id' element={<PaginaComodo/>} />

        </Route>
      </Routes>
      </SidebarProvider>
    </BrowserRouter>
  )
}
export default App
