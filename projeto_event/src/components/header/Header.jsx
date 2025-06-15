import "./Header.css";
import Logo from "../../assets/logoEvent.svg";
import Logo_adm from "../../assets/Vector.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
    const { usuario } = useAuth();

    return (
        <header>
            <div className="layout_grid cabecalho">
                <img src={Logo} alt="Logo Evento" />

                <nav className="nav_header">
                    <Link className="link_header" to="/Home">Home</Link>
                    <Link className="link_header" to="/ListaEventos">Eventos</Link> 
                    
                    
                    {usuario?.tipoUsuario === "Admin" && (
                        <>
                        <Link className="link_header" to="/TipoEvento">Usuários</Link>
                        <Link className="link_header" to="/CadastroEvento">Cadastro Eventos</Link>
                        <Link className="link_header" to="/TipoUsuario">Tipo Usuario</Link>
                        <Link className="link_header" to="/TipoEvento">Tipo Eventos</Link>
                        </>
                    )}
                </nav>

                <div className="Adm">
                    {usuario ? (
                        <>
                            <Link className="link_header" to="/">
                                {usuario.tipoUsuario === "Admin"
                                    ? `Admin`
                                    : `alunos`}
                            </Link>
                            <img src={Logo_adm} alt="Ícone do usuário" />
                        </>
                    ) : (
                        <Link className="link_header" to="/login">Login</Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;