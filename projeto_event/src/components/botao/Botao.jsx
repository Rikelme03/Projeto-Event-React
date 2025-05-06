import "./Botao.css"

const Botao = (props) => {
    return(
        <button className="botao">{props.nomeDoBotao}</button>
    )
}

export default Botao;