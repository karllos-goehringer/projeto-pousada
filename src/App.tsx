import './App.css'
import LoginPage from './paginas/pagina-login/login-page'
import Homepage from './paginas/home/home'
import Paginacadastrocomodos from './paginas/pagina-cadastro-comodos/Pagina-cadastro-comodos'
import PaginaCadastroObjetos from './paginas/pagina-cadastro-objetos/Pagina-cadastro-objetos'
//import pingTest from './backend/exec'
import PaginaCadastroUser from './paginas/pagina-cadastro-user/pagina-cadastro-user'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PaginaLogout from './paginas/pagina-logout/pagina-logout'
import PrivateRoute from './backend/private-route/private-route'
function App() {
  return (
<BrowserRouter>
  <Routes>
    {/* Rotas públicas */}
    <Route path='/' element={<Homepage />} />
    <Route path='/index' element={<Homepage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/pagina-item/:id' element={<PaginaCadastroObjetos />} />
    <Route path='/register' element={<PaginaCadastroUser />} />
    <Route path='/logout' element={<PaginaLogout />} />
    <Route path="*" element={<Homepage />} />
    {/* Rotas privadas */}
    <Route element={<PrivateRoute />}>
      <Route path="/cadastro-comodos" element={<Paginacadastrocomodos />} />
    </Route>
  </Routes>
</BrowserRouter>
  )
}
export default App
