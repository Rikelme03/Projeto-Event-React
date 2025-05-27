import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../pages/login/Login";
import TipoEvento from "../pages/tipoEvento/TipoEvento";
import TipoUsuario from "../pages/tipoUsuario/TipoUsuario";
import ListaEventos from "../pages/listagemEvento/ListagemEvento"
import CadastroEvento from "../pages/cadastroEvento/CadastrEvento"

const Rotas = () => {
    return(

        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Login/>} exact/>
                <Route path="/TipoEvento" element = {<TipoEvento/>}/>
                <Route path="/TipoUsuario" element = {<TipoUsuario/>}/>
                <Route path="/ListaEventos" element = {<ListaEventos/>}/>
                <Route path="/Eventos" element = {<CadastroEvento/>}/>
            </Routes>
        </BrowserRouter>
        
    )
}

export default Rotas;