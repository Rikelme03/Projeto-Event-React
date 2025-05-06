import "./Cadastro.css";
import Banner from "../../assets/bannerCadastro.png";
import Botao from "../botao/Botao";
import Seta from "../../assets/seta.png"


const Cadastro = (props) => {
    return(
        <main className="main_cadastro">
            <div className="titulo">
                    <h1>{props.tituloCadastro}</h1>
                    <hr/>
                </div>

            <section className="section_cadastro">
                    <div className="banner_cadastro">
                        <img src={Banner} alt="Fundo banner do cadastro eventos"  />
                    </div>

                <form action="" className="layout_grid form_cadastro">
            
                    <div className="campos_cadastro">
                        <div className="campo_cad_titulo">
                            <label htmlFor="titulo"></label>
                            <input type="text" name="nome" placeholder={`${props.namePlace}`}/>
                        </div>

                        <div className="campo_cad_titulo" style = {{display:props.visibilidade}}>
                            <label htmlFor="titulo"></label>
                            <input type="text" name="nome" placeholder={`${props.nomePlace}`}/>
                        </div>

                        

                        <Botao nomeDoBotao="Cadastrar"/>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Cadastro;