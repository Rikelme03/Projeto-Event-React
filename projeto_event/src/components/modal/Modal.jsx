import { useEffect, useState } from "react";
import ImgDeletar from "../../assets/Excluir.png";
import "./Modal.css";
import api from "../../Services/services";

const Model = (props) => {

  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [usuario, setUsuario] = useState("D96778D2-02A6-4BE3-832E-556D65392271");


  async function listarComentarios() {
    try {
      const resposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`);

      setComentarios(resposta.data);

      console.log(resposta.data);


    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    listarComentarios();
  }, [comentarios])


  async function excluirComentario(idComentario) {
    try {
      await api.delete(`ComentariosEventos/${idComentario}`);
    } catch (error) {
      console.log(error)
    }
  }

  async function cadastrarComentario(comentario) {
    try {
      await api.post("ComentariosEventos", {
        idUsuario: usuario,
        idEvento: props.idEvento,
        descricao: comentario
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    listarComentarios()
  }, [])

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
              {comentarios.map((item) => (
                <div key={item.idComentarioEvento}>
                  <strong>{item.usuario.nomeUsuario}</strong> 

                  <img
                    src={ImgDeletar}
                    alt="Deletar"
                    onClick={() => excluirComentario(item.idComentarioEvento)}
                  />

                  <p>{item.descricao}</p>
                  <hr />
                </div>
              ))}
              <div>
                <input
                  type="text"
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                  placeholder="Escreva seu comentário..." />

                <button
                  onClick={() => cadastrarComentario(novoComentario)}
                  className="botao">
                  cadastrar
                </button>
              </div>
            </>
          )}
        </div>
      </div >
    </>
  );

}

export default Model;