import './App.css'
import LoginPage from './paginas/pagina-login/login-page'
import Homepage from './paginas/home/home'
import Paginacadastrocomodos from './paginas/pagina-cadastro-comodos/Pagina-cadastro-comodos'
import PaginaCadastroObjetos from './paginas/pagina-cadastro-objetos/Pagina-cadastro-objetos'
//import pingTest from './backend/exec'
import PaginaCadastroUser from './paginas/pagina-cadastro-user/pagina-cadastro-user'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PaginaLogout from './paginas/pagina-logout/pagina-logout'
import PousadasGeral from './paginas/pagina-pousadas-geral/pousadas-geral'
import CadastroPousadas from './paginas/pagina-cadastro-pousada/pagina-cadastro-pousada'
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/index' element={<Homepage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='pagina-item/:id' element={<PaginaCadastroObjetos/>}/>
        <Route path='register' element={<PaginaCadastroUser/>}/>
        <Route path='cadastro-comodos' element={<Paginacadastrocomodos/>}/>
        <Route path='logout' element={<PaginaLogout/>}></Route>
        <Route path='pousadas/' element={<PousadasGeral/>}></Route>
        <Route path='/form-pousada/' element={<CadastroPousadas/>}></Route>
        <Route path="*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
