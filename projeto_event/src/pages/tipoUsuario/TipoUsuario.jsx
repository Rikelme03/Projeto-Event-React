import Header from "../../components/header/Header"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"
import Footer from "../../components/footer/Footer"
import Banner from "../../assets/bannerTipoUsuario.png"

const TipoEvento = () => {
    return(
        <>
        <Header />
        <main>
            <Cadastro 
                tituloCadastro="CADASTRO TIPO DE USUÁRIO"
                namePlace="Titulo"
                visibilidade="none"
                imagem= {Banner}
            />
            <Lista
            
            tituloPagina="LISTA TIPO DE USUÁRIO"
            visibilidade="none"
            visibol="none"
            visi="none"
            />
            
        </main>
        <Footer />
    </>
    )
}

export default TipoEvento