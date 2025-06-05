import "./Home.css";
import { Link } from "react-router-dom"
import Logo from "../../assets/logoEvent.svg"
import TelaFundo from "../../assets/TelaFundoHome.png"
import TelaFundoVisao from "../../assets/TelaHomeVisao.png"
import Footer from "../../components/footer/Footer";

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

                <div className="orgArticles layout_grid">

                    <article className="orgDentroDoArticle">
                        <h3>Titulo do Evento</h3>

                        <p>Breve descrição do evento, pode ser um paragrafo pequeno</p>

                        <a href="">Conectar</a>
                    </article>

                    <article className="orgDentroDoArticle">
                        <h3>Titulo do Evento</h3>

                        <p>Breve descrição do evento, pode ser um paragrafo pequeno</p>

                        <a href="">Conectar</a>
                    </article>

                    <article className="orgDentroDoArticle">
                        <h3>Titulo do Evento</h3>

                        <p>Breve descrição do evento, pode ser um paragrafo pequeno</p>

                        <a href="">Conectar</a>
                    </article>

                    <article className="orgDentroDoArticle ">
                        <h3>Titulo do Evento</h3>

                        <p>Breve descrição do evento, pode ser um paragrafo pequeno</p>

                        <a href="">Conectar</a>
                    </article>


                </div>
                <div className="orgBannerVisao">
                    <img src={TelaFundoVisao} alt="" />
                </div>
            </section>
        </main>
        
        
        </>
    )
}
export default Home;