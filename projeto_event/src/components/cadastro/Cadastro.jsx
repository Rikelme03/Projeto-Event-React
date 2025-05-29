import "./Cadastro.css";
import Botao from "../botao/Botao";
import Seta from "../../assets/seta.png"


const Cadastro = (props) => {
    return (

        <main className="layout_grid main_cadastro">
            <div className="titulo">
                <h1>{props.tituloCadastro}</h1>
                <hr />
            </div>

            <section className="section_cadastro">
                <div className="banner_cadastro">
                    <img src={props.imagem} alt="Fundo banner do cadastro eventos" />
                </div>
                
                <form onSubmit={props.funcCadastro} className="layout_grid form_cadastro">
                     
                    <div className="campos_cadastro">
                        <div className="campo_cad_titulo">
                            <label htmlFor="titulo"></label>
                            <input type="text" name="" placeholder={`${props.namePlace}`} 
                            value={props.ValorInput}    
                            onChange={(e) => props.setValorInputTitulo(e.target.value)}/>
                        </div>

                        <div className="campo_cad_titulo">
                            <label htmlFor="Data do evento"></label>
                            <input type="date" name="" placeholder={`${props.namePlaceData}`}
                            style={{ display: props.visiData }}  
                            
                            value={props.ValorInputData}    
                            onChange={(e) => props.setValorInputData(e.target.value)}/>
                        </div>

                        
                       <div className="campo_cad_tipoevento" style={{ display: props.visibilidade }}>
                            <select name="Tipo de Evento" id="" 
                
                                 value={props.valorSelectTipoEvento}
                                onChange={(e) => props.setValorSelectTipoEvento(e.target.value)}
                            >
                                <option value="" disabled selected>Tipo de Evento</option>
                                {props.lista && props.lista.length > 0 && props.lista.map((item) => (
                                    (
                                        <option value={item.idTipoEvento}>{item.tituloTipoEvento}</option>
                                    ))
                                )}
                            </select>
                            
                        </div>
                       
                        <div className="campo_cad_tipoevento" style={{ display: props.visibilidade }}>
                            <select name="instituicao" id="instituicao"
                            value={props.valorSelectInstituicao}
                            onChange={(e) => props.setValorSelectInstituicao(e.target.value)}
                            >
 
                            <option value="">Senai</option>
                            </select>
                            
                        </div>

                        <div className="campo_cad_titulo">
                            <label htmlFor="Data do evento"></label>
                            <input type="text" name="nome" placeholder={`${props.namePlaceDescricao}`} 
                            style={{ display: props.visiIndefinido }}  
                            value={props.ValorInputDescricao}    
                            onChange={(e) => props.setValorInputDescricao(e.target.value)}/>
                        
                        <Botao nomeDoBotao="Cadastrar" />
                        </div>
                    </div>
                </form>
                
            </section>
        </main>
        
    );
}

export default Cadastro;