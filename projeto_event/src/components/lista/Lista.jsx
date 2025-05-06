import "./Lista.css"

const Lista = (props) => {
    return(
        <section className="layout_grid titlo_org">
             <h1>{props.listaCadastro}</h1>
             <hr/>
             <div className="tabela">
                <table>
                    <thead>
                        <tr className="table_cabecalho">
                            <th >Nome</th>
                            <th style = {{display:props.visibilidadeGenero}}>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="item_lista">
                            <td data-cell ="Nome">Velozes e Furiosos</td>
                            <td data-cell ="Gênero" style = {{display:props.visibilidadeGenero}}>Ação</td>
                            {/* <td data-cell ="Editar"><img src={Editar} alt="Imagem de uma caneta" /></td>
                            <td data-cell ="Excluir"><img src={Excluir} alt="Lixeira" /></td> */}
                        </tr>
                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default Lista;