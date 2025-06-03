import "./Lista.css";
import Editar from "../../assets/Editar.png";
import Excluir from "../../assets/Excluir.png";
import Descricao from "../../assets/Descricao.png";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
                            <th style={{ display: props.visiDataEvento }}>Data Evento</th>
                            <th style={{ display: props.visiTipoEvento }}>Tipo Evento</th>
                            <th style={{ display: props.titulo }}></th><th>Editar</th>
                            <th>Excluir</th>
                            <th>{props.tituloDescricao}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.lista && props.lista.length > 0 ? (
                            props.lista.map((item) => (
                                <tr className="item_lista"
                                    key={props.tipoLista == "TiposEventos" ? item.idTipoEvento : (props.tipoLista == "TiposUsuario" ? item.TituloUsuario : item.idEvento)}>


                                    <td data-cell="Nome" style={{ display: props.visibol }} >
                                        {item.nomeEvento} {item.tituloTipoEvento}
                                    </td>
                                    <td style={{ display: props.visill }}>{item.dataEvento
                                        ? format(new Date(item.dataEvento), "dd/MM/yyyy", { locale: ptBR }) : ""}
                                         {item.tituloTipoEvento} {item.tituloTipoUsuario}</td>
                                    <td data-cell="Tipo Evento" style={{ display: props.visill }}>
                                        {item.tiposEvento?.tituloTipoEvento}
                                    </td>
                                    <td data-cell="Editar">
                                        <button onClick={() => { props.funcEditar(item) }}>
                                            <img src={Editar} alt="Ícone editar" />
                                        </button>
                                    </td>
                                    <td data-cell="Excluir"><img src={Excluir} alt="Lixeira" onClick={() => props.funcDeletar(item)} /></td>

                                    <td data-cell="descrica" style={{ display: props.visiBotaoDescricao }}><img src={Descricao} alt="Lixeira" onClick={() => props.descricao(item)}/></td>
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
