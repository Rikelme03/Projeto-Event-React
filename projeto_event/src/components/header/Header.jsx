import "./Header.css"
import Logo from "../../assets/logoEvent.svg"
import Logo_adm from "../../assets/Vector.png"
import { Link } from "react-router-dom"

const Header = () => {
    return (

        <header>
            <div className="layout_grid cabecalho">
                <img src={Logo} alt="Logo Evento" />
                <nav className="nav_header">
                     <Link className="link_header" to="/Home" href="">Home</Link>
                     <Link className="link_header" to="/ListaEventos" href="">Eventos</Link>
                     <Link className="link_header" to="/TipoEvento" href="">Usuários</Link>
                     <Link className="link_header" to="/" href="">Contatos</Link>
                </nav>
                <div className="Adm">
                    <a href="" className="link_header">Administrador</a>
                    <img src={Logo_adm} alt="Vetor" />
                </div>

            </div>
        </header>

    )
}

export default Header;