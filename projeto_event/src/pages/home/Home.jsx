import "./Home.css";
import { Link } from "react-router-dom"
import Logo from "../../assets/logoEvent.svg"
import TelaFundo from "../../assets/TelaFundoHome.png"

const Home = () => {
    return (
        <>
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
                    <button>Jogar</button>
                </div>

            </div>
        </header>

        <main>
            <div className="organizandoHomeFundo">
            <img src={TelaFundo} alt="" />
            </div>

            <section className="orgProximosEventos">
                <div className="tituloHome">
                <h1>PRÓXIMOS EVENTOS</h1>
                <hr />
                </div>

                <div className="orgArticles">

                    <article className="orgDentroDoArticle">
                        <h2>Titulo do Evento</h2>

                        <p>Breve descrição do evento, pode ser um paragrafo pequeno</p>

                        <h3>Conectar</h3>
                    </article>

                    <article className="orgDentroDoArticle">
                        <h2>Titulo do Evento</h2>

                        <p>Breve descrição do evento, pode ser um paragrafo pequeno</p>

                        <h3>Conectar</h3>
                    </article>

                    <article className="orgDentroDoArticle">
                        <h2>Titulo do Evento</h2>

                        <p>Breve descrição do evento, pode ser um paragrafo pequeno</p>

                        <h3>Conectar</h3>
                    </article>

                    <article className="orgDentroDoArticle">
                        <h2>Titulo do Evento</h2>

                        <p>Breve descrição do evento, pode ser um paragrafo pequeno</p>

                        <h3>Conectar</h3>
                    </article>


                </div>

            </section>

        </main>
        
        </>
    )
}
export default Home;