import "./ListagemEvento.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Comentar from "../../assets/comentar.png";
import Swal from 'sweetalert2';
import api from "../../Services/services";
import { useEffect, useState } from "react";
import Descricao from "../../assets/Descricao Preta.png";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Modal from "../../components/modal/Modal";
import { useAuth } from "../../contexts/AuthContext";
import Checkin from "../../components/checkin/Checkin";

const ListagemEvento = () => {
  const [listaEventos, setListaEventos] = useState([]);
  const [valorSelectEventos, setvalorSelectEventos] = useState("");

  //Modal
  const [tipoModal, setTipoModal] = useState({});//descricao Evento ou Comentario
  const [dadosModal, setDadosModal] = useState({});//descricao do modal
  const [modalAberto, setModalAberto] = useState(false)

  //Filtro
  const [filtroData, setFiltroData] = useState(["todos"]);
  const { usuario } = useAuth();
  // const [usuarioId, setUsuarioId] = useState("4E09F7E2-2273-472C-AFA9-DA857CECB321")

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
      const respostaPresencas = await api.get("PresencasEventos/ListarMinhas/" + usuario.idUsuario)
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
      if (presenca && idPresenca) {
        await api.put(`PresencasEventos/${idPresenca}`, { situacao: false });
        Swal.fire("Removido", "Sua presença foi cancelada.", "info");
      } else if (!presenca && idPresenca) {
        await api.put(`PresencasEventos/${idPresenca}`, { situacao: true });
        Swal.fire("Confirmado", "Sua presença foi confirmada.", "success");
      } else {
        await api.post("PresencasEventos", {
          situacao: true,
          idUsuario: usuario.idUsuario,
          idEvento: idEvento,
        });
        Swal.fire("Confirmado", "Sua presença foi confirmada.", "success");
      }

      listarEventos();
    } catch (error) {
      console.error("Erro ao manipular presença:", error);
      Swal.fire("Erro", "Não foi possível atualizar sua presença.", "error");
    }
  }

  async function descricaoEvento(evento) {
    try {
      Swal.fire({
        title: evento.nomeEvento,
        text: evento.descricao,
        showClass: {
          popup: `
            animate__animated
           animate__fadeInUp
           animate__faster
           `
        },
        hideClass: {
          popup: `
           animate__animated
           animate__fadeOutDown
           animate__faster
          `
        }
      });
    } catch (error) {
    }
  }


  useEffect(() => {
    listarEventos();

  }, [])

  async function comentarEvento(item) {
     if (!item.comentarios || item.comentarios.length === 0) {
    return Swal.fire({
      icon: 'info',
      title: 'Sem comentários',
      text: `O evento "${item.nomeEvento}" ainda não possui comentários.`,
    });
  }

  const listaHtml = item.comentarios.map((coment, i) => 
    `<li style="margin-bottom: 10px;"><strong>Comentário ${i + 1}:</strong> ${coment}</li>`
  ).join('');

  await Swal.fire({
    title: `Comentários de "${item.nomeEvento}"`,
    html: `<ul style="text-align: left; padding-left: 20px;">${listaHtml}</ul>`,
    confirmButtonText: 'Fechar',
  });
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
          <select className="select_evento"
            onChange={(e) => setFiltroData([e.target.value])}>
            <option value="todos" selected>Todos os eventos</option>
            <option value="futuros">Somente futuros</option>
            <option value="passados">Somente passados</option>
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
              {filtrarEventos().map((item) => (
                <tr key={item.idEvento} className="item_evento">
                  <td data-cell="Nome">{item.nomeEvento}</td>
                  <td data-cell="Data">
                    {item.dataEvento ? format(new Date(item.dataEvento), "dd/MM/yyyy", { locale: ptBR }) : ""}
                  </td>
                  <td data-cell="TipoEvento">{item.tiposEvento.tituloTipoEvento}</td>
                  <td data-cell="evento">
                    <button onClick={() => descricaoEvento(item)}>
                      <img src={Descricao} alt="Ícone editar" />
                    </button>
                  </td>
                  <td data-cell="Editar">
                    <button onClick={() => comentarEvento(item)}>
                      <img src={Comentar} alt="Comentar" />
                    </button>
                  </td>
                  <td data-cell="Participar"><Checkin/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section >
      <Footer />
    </>
  );
};

export default ListagemEvento;
