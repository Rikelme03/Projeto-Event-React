import "./Header.css";
import Logo_adm from "../../assets/Vector.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import event from "../../assets/Event+.png"
import secureLocalStorage from "react-secure-storage";


const Header = () => {
    const { usuario } = useAuth();

    function deslogar() {
        try {
        
        secureLocalStorage.removeItem("tokenLogin");
        <Link className="link_header" to="/Login"></Link>
        } catch (error) {
            
        }
        
    }

    return (
        <header>
            <div className="layout_grid header_header">
                <img src={event} alt="Logo Evento" />

                <nav className="nav_header">
                    <Link className="link_header" to="/Home">Home</Link>
                    <Link className="link_header" to="/ListaEventos">Eventos</Link> 
                    
                    
                    {usuario?.tipoUsuario === "Admin" && (
                        <>
 
                        <Link className="link_header" to="/CadastroEvento">Cadastro Eventos</Link>
                        <Link className="link_header" to="/TipoUsuario">Tipo Usuario</Link>
                        <Link className="link_header" to="/TipoEvento">Tipo Eventos</Link>
                        </>
                    )}
                </nav>

                <div className="Adm">
                    {usuario ? (
                        <>
                            <Link className="link_header" to="/Login">
                                {usuario.tipoUsuario === "Admin"
                                    ? <p>ADMIN <img src={Logo_adm} alt="Ícone do usuário" onClick={() => deslogar()}/></p>
                                    : <p>Aluno <img src={Logo_adm} alt="Ícone do usuário" onClick={() => deslogar()}/></p>}
                            </Link>
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