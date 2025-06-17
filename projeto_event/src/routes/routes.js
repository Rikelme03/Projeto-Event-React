import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "../pages/login/Login";
import TipoEvento from "../pages/tipoEvento/TipoEvento";
import TipoUsuario from "../pages/tipoUsuario/TipoUsuario";
import ListaEventos from "../pages/listagemEvento/ListagemEvento"
import CadastrarEvento from "../pages/cadastroEvento/CadastrEvento"
import Home from "../pages/home/Home"
import { useAuth } from '../contexts/AuthContext';
import CadastroUsuario from '../pages/cadastroUsuario/CadastroUsuario';


const Privado = (props) => {
    const { usuario } = useAuth();
    //token, idUsuario, tipoUsuario

    //Se nao estiver autenticado, manda pro login
    if (!usuario) {
        return <Navigate to="/" />
    }
    //Se o tipo usuario nao for permitido, bloqueia
    if (usuario.tipoUsuario !== props.tipoPermitido) {
        //ir para a tela de nao encontrado
        return <Navigate to="/" />;
    }

    // Senao, renderizar o componente passado
    return <props.item />;
};

const Rotas = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CadastroUsuario />} />
                
                <Route path="/Login" element={<Login />} />
                
                <Route path="/Home" element={<Home/>} />
                    
                <Route path="/CadastroUsuario" element={CadastroUsuario} />

                <Route path="/TipoEvento" element={ <Privado item={TipoEvento} tipoPermitido="Admin" />} />

                <Route path="/TipoUsuario" element={<Privado item={TipoUsuario} tipoPermitido="Admin" />} />

                <Route path="/ListaEventos" element={<Privado item={ListaEventos} tipoPermitido="alunos" />} />

                <Route path="/CadastroEvento" element={<Privado item={CadastrarEvento} tipoPermitido="Admin" />} />
            </Routes>
        </BrowserRouter>

    )
}

export default Rotas;