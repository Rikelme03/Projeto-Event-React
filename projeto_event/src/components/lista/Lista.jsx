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
                        <tr className="item_lista">
                            <td data-cell="Nome" style={{ display: props.visibol }} >Nome</td>
                            <td data-cell="Tipo Evento" >Tipo Evento</td>
                            <td data-cell="Editar">
                                <img src={Editar} alt="Ícone editar" />
                            </td>
                            <td data-cell="Excluir">
                                <img src={Excluir} alt="Ícone excluir" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

    );
};

export default Lista;
