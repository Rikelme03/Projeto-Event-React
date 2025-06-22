import "./Home.css"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import { Link } from 'react-router-dom'
import Mapa from "../../assets/mapa.png"
import BannerHome from "../../assets/TelaFundoHome.png"
import bannerVisao from "../../assets/visaoHome.png"
import api from "../../Services/services";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";


const Home = () => {
  const [listaEventos, setListaEvento] = useState([]);

  async function listarEvento() {
        try {
            const resposta = await api.get("Eventos");
            setListaEvento(resposta.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        listarEvento();
    }, []);










  return (
    <div>
      <Header 
        visibilidade = "none"
      />
      <main className="home-layout">

        <section className="home-banner">
          <img src={BannerHome} alt="Área de eventos da escola de informática" />
        </section>

        <section className="home-eventos">
          <h2>Próximos Eventos</h2>
          <hr />

          <div className="evento-container">
            {listaEventos.length > 0 ? (
              listaEventos.map((item) => (
                <div key={item.idEvento} className="evento-card">
                  <h3 className="evento-titulo">{item.nomeEvento}</h3>
                  <p className="evento-descricao">{item.descricao}</p>
                  <Link className="evento-link" to="/ListaEventos">Conectar</Link>
                </div>
              ))
            ) : (
              <p>Nenhum evento encontrado.</p>
            )}
          </div>
        </section>

        <section className="home-visao">
          <div className="imagem-container">
            <img src={bannerVisao} alt="" />
            <div className="textoDaImagem">
              <h2>Visão</h2>
              <hr />
              <p>
                Nosso site nasceu com o propósito de conectar pessoas a experiências únicas, oferecendo uma plataforma prática e intuitiva onde é possível descobrir, acompanhar e participar de eventos dos mais variados estilos e categorias. Seja um show, uma exposição de arte, um campeonato esportivo, uma palestra de tecnologia, uma feira gastronômica ou um encontro cultural, aqui você encontra tudo isso com facilidade e agilidade. Navegar pelo nosso site é simples e agradável. Você pode buscar eventos por interesse, localização ou data, e acessar todas as informações necessárias para participar – desde a descrição completa até local, horário, valores e links de inscrição.
              </p>
            </div>
          </div>
        </section>

        <section className="home-contato">
            <div className= "tituloHome">
          <h2>Contato</h2>
          <hr />
            </div>
          <div className="contato-container">
            <div className="contato-mapa">
              <img src={Mapa} alt="Mapa da localização" />
            </div>
            <div className="contato-info">
              <p>Rua Niterói, 180 - Centro</p>
              <p>São Caetano do Sul - SP</p>
              <p>(11) 4225-2000</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

export default Home;