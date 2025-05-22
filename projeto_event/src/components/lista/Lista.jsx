import "./Lista.css";
import Editar from "../../assets/Editar.png";
import Excluir from "../../assets/Excluir.png";

const Lista = (props) => {
    return (

        <section className=" listagem">
            <div className="titulo_organizando">
                <h1>{props.tituloPagina}    </h1>
                <hr className="linha_titulo" />
            </div>

            <div className="tabela">
                <table>
                    <thead>
                        <tr className="table_cabecalho">

                            <th style={{ display: props.tituloVisibilidade }}>Titulo</th>
                            <th style={{ display: props.visibilidade }}>Nome</th>
                            <th style={{ display: props.visi }} id="tipoEvento">Tipo Evento </th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.lista && props.lista.length > 0 ? (
                            props.lista.map((item) => (
                        <tr className="item_lista" Key={props.tipoLista == "tiposEventos" ? item.IdTipoEvento : item.TituloTipoEvento}>
                            <td data-cell="Nome" style={{ display: props.visibol }} >Nome</td>
                            <td data-cell="Tipo Evento">
                                {item.tituloTipoEvento}
                            </td>   
                            <td data-cell="Editar">
                                <button onClick={() => {props.funcEditar(item)}}>
                                <img src={Editar} alt="Ícone editar" />
                                </button>
                            </td>
                            <td data-cell="Excluir"><img src={Excluir} alt="Lixeira"  onClick={() => props.funcDeletar(item)} /></td>
                        </tr>
                        ))
                    )
                    :(<p>{props.listagemGenFil}</p>

                    )
                }
                    </tbody>
                </table>
            </div>
        </section>

    );
};

export default Lista;
