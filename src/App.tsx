import './App.css'
import LoginPage from './paginas/pagina-login/login-page'
import Homepage from './paginas/home/home'
import Paginacadastrocomodos from './paginas/pagina-cadastro-comodos/Pagina-cadastro-comodos'
import PaginaCadastroObjetos from './paginas/pagina-cadastro-objetos/Pagina-cadastro-objetos'
import PaginaCadastroUser from './paginas/pagina-cadastro-user/pagina-cadastro-user'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PaginaLogout from './paginas/pagina-logout/pagina-logout'
import PrivateRoute from './backend/private-route/private-route'
import { SidebarProvider } from '@/components/ui/sidebar'
import PousadasGeral from './paginas/pagina-pousadas-geral/pousadas-geral'
import PaginaCadastroPousadas from './paginas/pagina-cadastro-pousada/Pagina-cadastro-pousadas'
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
          <Route path="/cadastro-comodos" element={<Paginacadastrocomodos />} />
          <Route path ="/pousadas-user" element={<PousadasGeral />} />
          <Route path='/form-pousada/' element={<PaginaCadastroPousadas />} />
        </Route>
      </Routes>
      </SidebarProvider>
    </BrowserRouter>
  )
}
export default App
