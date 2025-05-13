import Header from "../../components/header/Header"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"
import Footer from "../../components/footer/Footer"
import Banner from "../../assets/bannerCadastro.png"
const TipoEvento = () => {
    return(

        <>
        <Header />
        <main>
            <Cadastro 
                tituloCadastro="CADASTRO TIPO DE EVENTOS"
                namePlace="Titulo"
                visibilidade="none"
                imagem= {Banner}
            />
            <Lista
            tituloPagina="LISTA TIPO DE EVENTOS"
                visibilidade="none"
                visi="none"
                visibol="none"
            />
            
        </main>
        <Footer />
    </>
    
    )
}

export default TipoEvento
