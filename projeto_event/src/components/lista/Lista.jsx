import "./Lista.css";
import Editar from "../../assets/Editar.png";
import Excluir from "../../assets/Excluir.png";
import Descricao from "../../assets/Descricao.png";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Lista = (props) => {
    return (

        <section className="listagem">
                <div className="layout_grid div_tabela">
                    <h1>{props.tituloLista}</h1>
                    <hr />

                    <div className="tabela">
                        <table>
                            <thead>
                                <tr className="table_cabecalho">
                                    <th>{props.nomezin}</th>
                                    <th style={{ display: props.visible }}>Data</th>
                                    <th style={{ display: props.visible }}>TipoEvento</th>
                                    <th>{props.edit}</th>
                                    <th style={{ display: props.visibly }}>Excluir</th>
                                    <th style={{ display: props.visible }}>Descrição</th>
                                    {/* <th id="sim" style={{display:props.acao}}>Ações</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {props.lista && props.lista.length > 0 ? (
                                    props.lista.map((item) => (
                                       <tr className="item_lista" key={props.tipoLista == "tiposEventos" ? item.idTipoEvento : (props.tipoLista == "tipoUsuarios" ? item.idTipoUsuario : item.idEvento)}>


                                            <td data-cell={props.nomezin}>
                                                {props.tipoLista == "tiposEventos" ? item.tituloTipoEvento : (props.tipoLista == "tiposUsuarios" ? item.tituloTipoUsuario : item.nomeEvento)}
                                            </td>

                                            <td style={{ display: props.visible }} data-cell="Data">{item.dataEvento ? format(new Date(item.dataEvento), "dd/MM/yyyy", { locale: ptBR }) : ""}</td>

                                            <td style={{ display: props.visible }} data-cell="TipoEvento">{item.tiposEvento?.tituloTipoEvento}</td>

                                            <td data-cell="Editar Ações">
                                                <img src={Editar} alt="lapizin" onClick={() => props.funcEditar(item)} style={{ cursor: "pointer" }} />
                                            </td>

                                            
                                            <td data-cell="Excluir"><img src={Excluir} alt="Lixeira" onClick={() => props.funcDeletar(item)} style={{ cursor: "pointer" }}/></td>
                                            

                                            <td data-cell="descrica" style={{ display: props.visible }}><img src={Descricao} alt="Lixeira" onClick={() => props.descricao(item)}/></td>

                                        </tr>
                                    ))
                                ) :
                                    (
                                        <p>Nada encontrado</p>
                                    )}
                                {/* <tr className="item_lista">
                                    <td data-cell={props.nomezin}>Senai</td>
                                    <td style={{ display: props.visible }} data-cell="TipoEvento">Gigachads</td>
                                    <td data-cell="Editar Ações"><img src={Lapizinho} alt="lapizin" /></td>
                                    <td data-cell="Excluir Ações"><img src={Lixinho} alt="lixin" /></td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>

    );
};

export default Lista;














