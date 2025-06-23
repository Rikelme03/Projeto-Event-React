import "./Header.css";
import Logo_adm from "../../assets/Vector.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import event from "../../assets/Event+.png";
import secureLocalStorage from "react-secure-storage";
import { useState } from "react";

const Header = () => {
  const { usuario } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);

  function deslogar() {
    try {
      secureLocalStorage.removeItem("tokenLogin");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header>
      <div className="layout_grid header_header">
        <div className="menu_icon" onClick={() => setMenuAberto(!menuAberto)}>
          ☰
        </div>

        
        <img src={event} alt="Logo Evento" />

        <nav className={`nav_header ${menuAberto ? "ativo" : ""}`}>
          <Link className="link_header" to="/Home">Home</Link>
          <Link className="link_header" to="/ListaEventos">Eventos</Link>

          {usuario?.tipoUsuario === "Admin" && (
              <>
              <Link className="link_header" to="/CadastroEvento">Cadastro Eventos</Link>
              <Link className="link_header" to="/TipoUsuario">Tipo Usuário</Link>
              <Link className="link_header" to="/TipoEvento">Tipo Eventos</Link>
            </>
          )}
        </nav>

        {/* Usuário */}
        <div className="Adm">
          {usuario ? (
            <Link className="link_header" to="/Login">
              <p>
                {usuario.tipoUsuario === "Admin" ? "Administrador" : "Aluno"}
                <img src={Logo_adm} alt="Ícone do usuário" onClick={deslogar} />
              </p>
            </Link>
          ) : (
            <Link className="link_header" to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};


export default Header;