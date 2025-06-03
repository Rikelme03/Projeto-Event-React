import React from 'react'

export const Modal = (props) => {
    return (
        <>
            <div className="model-overlay" onClick={props.fecharModal}></div>
            <div className="model">
                <h1>{props.titulo}</h1>
                <div className="model_conteudo">
                    {props.tipoModel === "descricaoEvento" ? (
                        <p>{props.descricao}</p>
                    ) : (
                        <>
                            {/* {comentarios.map((item) => (
                                <div key={item.idComentarioEvento}>
                                    <strong>{item.usuario.nomeUsuario}</strong>

                                    <img
                                        // src={ImgDeletar}
                                        alt="Deletar"
                                    />

                                    <p>{item.descricao}</p>
                                    <hr />
                                </div>
                            ))}
                            <div>
                                <input 
                                type="text" 
                                placeholder="Escreva seu comentário..."/>

                                <button>
                                    cadastrar
                                </button>
                            </div> */}
                        </>
                    )}
                </div>
            </div >
        </>
    )
}

export default Modal