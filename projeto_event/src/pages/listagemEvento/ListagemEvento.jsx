import "./ListagemEvento.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Comentar from "../../assets/comentar.png";
import Checkin from "../../components/checkin/Checkin";
import Swal from 'sweetalert2';
import api from "../../Services/services";
import { useEffect, useState } from "react";
import Descricao from "../../assets/Descricao Preta.png";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Modal from "../../components/modal/Modal";

const ListagemEvento = () => {
  const [listaEventos, setListaEventos] = useState([]);
  const [valorSelectEventos, setvalorSelectEventos] = useState("");

  //Modal
  const [tipoModal, setTipoModal] = useState({});//descricao Evento ou Comentario
  const [dadosModal, setDadosModal] = useState({});//descricao do modal
  const [modalAberto, setModalAberto] = useState(false)

  //Filtro
  const [filtroData, setFiltroData] = useState(["todos"])
  const [usuarioId, setUsuarioId] = useState("4E09F7E2-2273-472C-AFA9-DA857CECB321")

  function alertar(icone, mensagem) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: icone,
      title: mensagem
    });
  }



  async function listarEventos() {
    try {
      //pego o eventos em geral
      const resposta = await api.get("eventos");
      const todosOsEventos = resposta.data;
      const respostaPresencas = await api.get("PresencasEventos/ListarMinhas/" + usuarioId)
      const minhasPresencas = respostaPresencas.data;

      const eventosComPresencas = todosOsEventos.map((atualEvento) => {
        const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);
        return {
          ...atualEvento,

          possuiPresenca: presenca?.situacao === true,
        }
      })

      setListaEventos(eventosComPresencas)


    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  }

  async function manipularPresenca(idEvento, presenca, idPresenca) {
    try {
      if (presenca && idPresenca != "") {
        //atulizar: situacao para Falso
        await api.put(`PresencasEventos/${idPresenca}`, { situacao: false })




      } else if (idPresenca != "") {
        //atulizar: situacao para True
        await api.put(`PresencasEventos/${idPresenca}`, { situacao: true })

      } else {
        //Cadastrar uma nova presenca 
        await api.put("PresencasEventos", { situacao: true, idUsuario: usuarioId, idEvento: idEvento })
        listarEventos()
      }
    } catch (error) {
      console.log(error);
      console.log(idPresenca);
      console.log(usuarioId);
      console.log(idEvento);
      console.log(idEvento);
    }
  }


  useEffect(() => {
    listarEventos()
  }, []);



  function abrirModal(tipo, dados) {

    //tipo de modal
    //dados


    setModalAberto(true)
    setDadosModal(tipo)
    setTipoModal(dados)

  }

  function fecharModal(tipo, dados) {

    //tipo de modal
    //dados


    setModalAberto(false)
    setDadosModal({})
    setTipoModal("")

  }

  async function cadastrarComentario() {

  }

  function filtrarEventos() {
    const hoje = new Date();
    return listaEventos.filter(evento => {
      const dataEvento = new Date(evento.dataEvento);
      if (filtroData.includes("todos")) return true;
      if (filtroData.includes("futuros") && dataEvento > hoje) return true;
      if (filtroData.includes("passados") && dataEvento < hoje) return true;

      return false;
    });
  }

  

  return (
    <>
      <Header />
      <section className="layout_grid listagem_evento">
        <h1>Eventos</h1>
        <hr />
        <div className="tabela_evento">
          <select className="select_evento" onChange={(e) => setFiltroData([e.target.value])}>
            <option value="todos" selected>Todos os eventos</option>
            <option value="fututros" selected>Eventos Futuros</option>
            <option value="passados" selected>Eventos que pasaram</option>
          </select>

          <table>
            <thead>
              <tr className="table_evento">
                <th>Título</th>
                <th>Data Evento</th>
                <th>Tipo Evento</th>
                <th>Descricao</th>
                <th>Comentários</th>
                <th>Participar</th>
              </tr>
            </thead>
            <tbody>
              {listaEventos.map((item) => (
                filtrarEventos() && filtrarEventos().map((item) => (
                  <tr className="item_evento">
                    <td data-cell="Nome">{item.nomeEvento} </td>
                    <td data-cell="Data">{item.dataEvento ? format(new Date(item.dataEvento), "dd/MM/yyyy", { locale: ptBR }) : ""}
                    </td>
                    <td data-cell="TipoEvento">{item.tiposEvento.tituloTipoEvento}</td>
                    <td data-cell="evento">
                      <button onClick={() => abrirModal("descricaoEvento", { descricao: item.Descricao })}>
                        <img src={Descricao} alt="Ícone editar" />
                      </button>
                    </td>
                    <td data-cell="Editar">
                      <button onClick={() => abrirModal("Comentarios", { idEvento: item.idEvento })}>
                        <img src={Comentar} alt="Comentar" />
                      </button>
                    </td>
                    <td data-cell="Participar">
                      <Checkin presenca={item.possuiPresenca}
                        manipular={() => manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca)}
                      />
                    </td>
                  </tr>
                ))))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />

      {modalAberto && (
        <Modal
          titulo={tipoModal == "descricaoEvento" ? "Descricao do evento" : "Comentario"}
          tipoModel={tipoModal}
          idEvento={dadosModal.idEvento}
          descricao={dadosModal.descricao}
          fecharModal={fecharModal}

        />
      )}
    </>
  );
};

export default ListagemEvento;
