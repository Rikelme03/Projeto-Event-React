import "./Home.css"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import { Link } from 'react-router-dom'
import Mapa from "../../assets/Mapa.svg"
import BannerHome from "../../assets/TelaFundoHome.png"

const Home = () => {
  return (   
        <>
            <Header
                Usuario = "none"
                naver="none"
                
            />
            <main>
                <div className="banner-div-home">
                    <img src={BannerHome} alt="Area de eventos da escola de informatica" />
                </div>

                <div className="cards-home">

                    <h2>Próximos Eventos</h2>
                    <hr />

                    <div className="card-pai">

                        <div className="cardzinho">
                            <h2>Lorem</h2>
                            <p>Lorem ipsum dolor sit amet consecteturcorrupti tempora! Delectus fugia</p>
                            <Link className="link-card" to="/Login">Conectar</Link>
                        </div>

                        <div className="cardzinho">
                            <h2>Lorem</h2>
                            <p>Lorem ipsum dolor sit amet consecteturcorrupti tempora! Delectus fugia</p>
                            <Link className="link-card" to="/Login">Conectar</Link>
                        </div>

                        <div className="cardzinho">
                            <h2>Lorem</h2>
                            <p>Lorem ipsum dolor sit amet consecteturcorrupti tempora! Delectus fugia</p>
                            <Link className="link-card" to="/Login">Conectar</Link>
                        </div>

                        <div className="cardzinho">
                            <h2>Lorem</h2>
                            <p>Lorem ipsum dolor sit amet consecteturcorrupti tempora! Delectus fugia</p>
                            <Link className="link-card" to="/Login">Conectar</Link>
                        </div>

                    </div> 

                </div>

                <div className="segundo_banner">
                </div>

                <div className="pre-footer">

                    <h2>Contato</h2>
                    <hr />

                    <div className="pai-pre-footer">

                        <div className="mapa">
                            <img src={Mapa} alt="" />
                        </div>

                        <div className="informacoes">
                            <p>Rua Niterói, 180 - Centro</p>
                            <p>São Caetano  do  Sul - SP</p>
                            <p>(11) 4225-2000</p>
                        </div>
                       
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default Home;