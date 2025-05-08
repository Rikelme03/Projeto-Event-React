import "./Cadastro.css";
import Botao from "../botao/Botao";
import Seta from "../../assets/seta.png"


const Cadastro = (props) => {
    return(
        <main className="layout_grid main_cadastro">
            <div className="titulo">
                    <h1>{props.tituloCadastro}</h1>
                    <hr/>
                </div>

            <section className="section_cadastro">
                    <div className="banner_cadastro">
                        <img src={props.imagem} alt="Fundo banner do cadastro eventos"  />
                    </div>

                <form action="" className="layout_grid form_cadastro">
            
                    <div className="campos_cadastro">
                        <div className="campo_cad_titulo">
                            <label htmlFor="titulo"></label>
                            <input type="text" name="nome" placeholder={`${props.namePlace}`}/>
                        </div>

           <div className="campo_cad_tipoevento" style = {{display:props.visibilidade}}>
                    <label htmlFor="tipoEvento">Gênero</label>
                    <select name="tipoEvento" id="">
                        <option value=""disabled selected>Selecione</option>
                        <option value="">op 1</option>
                        <option value="">op 2</option>
                        <option value="">op 3</option>  
                    </select>
                </div>
                        <Botao nomeDoBotao="Cadastrar"/>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Cadastro;