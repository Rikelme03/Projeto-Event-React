import "./Lista.css";
import Editar from "../../assets/Editar.png";
import Excluir from "../../assets/Excluir.png";

const Lista = () => {
    return (
        <section className="layout_grid listagem">
            <div className="titulo_organizando">
                <h1>LISTA TIPO DE EVENTOS</h1>
                <hr className="linha_titulo" />
            </div>

            <div className="tabela">
                <table>
                    <thead>
                        <tr className="table_cabecalho">
                            <th>Título</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="item_lista">
                            <td data-cell="Nome">Tipo Evento</td>
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
