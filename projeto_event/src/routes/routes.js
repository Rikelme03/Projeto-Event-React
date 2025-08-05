import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "../pages/login/Login";
import TipoEvento from "../pages/tipoEvento/TipoEvento";
import TipoUsuario from "../pages/tipoUsuario/TipoUsuario";
import ListaEventos from "../pages/listagemEvento/ListagemEvento";
import CadastrarEvento from "../pages/cadastroEvento/CadastrEvento";
import Home from "../pages/home/Home";
import { useAuth } from '../contexts/AuthContext';
import CadastroUsuario from '../pages/cadastroUsuario/CadastroUsuario';

const Privado = (props) => {
    const { usuario } = useAuth();

    if (!usuario) {
        return <Navigate to="/" />;
    }

    if (usuario.tipoUsuario !== props.tipoPermitido) {
        return <Navigate to="/" />;
    }

    const Item = props.item;
    return <Item />;
};

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CadastroUsuario />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/CadastroUsuario" element={<CadastroUsuario />} />
                <Route path="/TipoEvento" element={<Privado item={TipoEvento} tipoPermitido="Admin" />} />
                <Route path="/TipoUsuario" element={<Privado item={TipoUsuario} tipoPermitido="Admin" />} />
                <Route path="/ListaEventos" element={<Privado item={ListaEventos} tipoPermitido="alunos" />} />
                <Route path="/CadastroEvento" element={<Privado item={CadastrarEvento} tipoPermitido="Admin" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Rotas;
