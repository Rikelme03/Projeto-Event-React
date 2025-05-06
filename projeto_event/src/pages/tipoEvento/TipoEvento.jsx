import Header from "../../components/header/Header"
import Cadastro from "../../components/cadastro/Cadastro"
import Footer from "../../components/footer/Footer"
const TipoEvento = () => {
    return(
        <>
        <Header />
        <main>
            <Cadastro tituloCadastro="CADASTRO TIPO DE EVENTOS"
                namePlace="Titulo"
                visibilidade="none"
            />
        </main>
        <Footer />
    </>
    )
}

export default TipoEvento
