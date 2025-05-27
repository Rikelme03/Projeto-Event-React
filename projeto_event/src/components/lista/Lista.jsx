import "./Lista.css";
import Editar from "../../assets/Editar.png";
import Excluir from "../../assets/Excluir.png";
import Descricao from "../../assets/Descricao.png";

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

                            <th>{props.tituloDoEvento}</th>
                            <th>Data Evento</th>
                            <th >Tipo Evento</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                            <th>Descricao</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.lista && props.lista.length > 0 ? (
                            props.lista.map((item) => (
                                <tr className="item_lista"
                                    key={props.tipoLista == "TiposEventos" ? item.idTipoEvento : (props.tipoLista == "TiposUsuario" ? item.TituloUsuario : item.idEvento)}>


                                    <td data-cell="Nome" style={{ display: props.visibol }} >
                                        {item.nomeEvento}
                                    </td>
                                    <td style={{display: props.visill}}>{item.dataEvento}</td>
                                    <td data-cell="Tipo Evento" style={{ display: props.visill }}>
                                        {item.tiposEventos?.tituloTipoEvento}
                                    </td>
                                    <td data-cell="Editar">
                                        <button onClick={() => { props.funcEditar(item) }}>
                                            <img src={Editar} alt="Ícone editar" />
                                        </button>
                                    </td>
                                    <td data-cell="Excluir"><img src={Excluir} alt="Lixeira" onClick={() => props.funcDeletar(item)} /></td>

                                    <td data-cell="descrica"><img src={Descricao} alt="Lixeira" /></td>
                                </tr>

                            ))
                        )
                            : (<p>{props.listagemGenFil}</p>

                            )
                        }
                    </tbody>
                </table>
            </div>
        </section>

    );
};

export default Lista;
