import { useEffect, useState } from "react";
import ImgDeletar from "../../assets/Excluir.png";
import "./Modal.css";
import api from "../../Services/services";

const Modal = (props) => {
  const [comentarios, setComentarios] = useState([]);
    const [usuarioId, setUsuarioId] = useState("4E09F7E2-2273-472C-AFA9-DA857CECB321")
    const [novoComentario,setNovoComentario] = useState("")

  async function listarComentarios() {
    try {
      const resposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`);
      setComentarios(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarComentarios();
  }, []);

  async function cadastrarComentario() {
    try {
      await api.post("ComentariosEventos", {idUsuario:usuarioId , idEvento: props.idEvento, Descricao: comentarios})
    } catch (error) {
      console.log(error);
      
    }
  }

  // async function () {
    
  // }

  async function deletarComentario(idComentario) {
    try {
      await api.delete(`ComentariosEventos/${idComentario}`)
    } catch (error) {
      console.log(error);
      
    }
  }


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
                  <img src={ImgDeletar} alt="Deletar" onClick={() => deletarComentario(item.idComentarioEvento)}/>
                  <p>{item.descricao}</p>
                  <hr />
                </div>
              ))}
              <div>
                <input type="text" placeholder="Escreva seu comentario..." 
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                />
                <button onClick={() => cadastrarComentario(novoComentario)}>Cadastrar</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
