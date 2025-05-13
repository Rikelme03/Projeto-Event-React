import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../pages/login/Login";
import TipoEvento from "../pages/tipoEvento/TipoEvento";
import TipoUsuario from "../pages/tipoUsuario/TipoUsuario";
import ListaEventos from "../pages/listagemEvento/ListagemEvento"

const Rotas = () => {
    return(

        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Login/>} exact/>
                <Route path="/TipoEvento" element = {<TipoEvento/>}/>
                <Route path="/TipoUsuario" element = {<TipoUsuario/>}/>
                <Route path="/ListaEventos" element = {<ListaEventos/>}/>
            </Routes>
        </BrowserRouter>
        
    )
}

export default Rotas;