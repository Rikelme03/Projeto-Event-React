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

  //Filtro
  const [filtroData, setFiltroData] = useState(["todos"]);
  const { usuario } = useAuth();

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
          idPresenca: presenca?.idPresencaEvento || null
        }
      })

      setListaEventos(eventosComPresencas)


    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  }

  // async function manipularPresenca(idEvento, presenca, idPresenca) {
  //   try {
  //     if (presenca && idPresenca) {
  //       await api.put(`PresencasEventos/${idPresenca}`, { situacao: false });
  //       Swal.fire("Removido", "Sua presença foi cancelada.", "info");
  //     } else if (!presenca && idPresenca) {
  //       await api.put(`PresencasEventos/${idPresenca}`, { situacao: true });
  //       Swal.fire("Confirmado", "Sua presença foi confirmada.", "success");
  //     } else {
  //       await api.post("PresencasEventos", {
  //         situacao: true,
  //         idUsuario: usuario.idUsuario,
  //         idEvento: idEvento,
  //       });
  //       Swal.fire("Confirmado", "Sua presença foi confirmada.", "success");
  //     }

  //     listarEventos();
  //   } catch (error) {
  //     console.error("Erro ao manipular presença:", error);
  //     Swal.fire("Erro", "Não foi possível atualizar sua presença.", "error");
  //   }
  // }

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
  // Mostra comentários existentes ou mensagem de nenhum comentário

  
  //aqui vc precisa pegar as informacoes de comentario!!
  const listaHtml = (item.comentarios?.length > 0)
    ? item.comentarios.map((c) => `<li><strong>${c.nomeEvento}:</strong> ${c}</li>`).join('')
    : '<li>Sem comentários ainda.</li>';

  // Abre o SweetAlert para comentar
  const { value: comentario } = await Swal.fire({
    title: `Comentários de "${item.nomeEvento}"`,
    html: `
      <ul style="text-align:left">${listaHtml}</ul>
      <textarea id="coment" class="swal2-textarea" placeholder="Digite seu comentário..."></textarea>
    `,
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const texto = document.getElementById('coment').value.trim();
      if (!texto) {
        Swal.showValidationMessage('Digite algo!');
        return false;
      }
      return texto;
    }
  });

  // Envia comentário se preenchido
  if (comentario) {
    try {
      await api.post('ComentariosEventos', {
        descricao: comentario,
        exibe: true,
        idUsuario: usuario.idUsuario,
        idEvento: item.idEvento
      });

      Swal.fire('Enviado!', 'Comentário cadastrado com sucesso.', 'success');
    } catch (err) {
      Swal.fire('Erro!', 'Não foi possível enviar o comentário.', 'error');
    }
  }
}

  async function manipularPresenca(idEvento, presenca, idPresencaEvento) {
    try {

      console.log(idPresencaEvento);
      console.log(presenca);
      
      if (presenca && idPresencaEvento != null) {
        console.log("aqui 01");
        //atualizacao: situacao para FALSE
        await api.put(`PresencasEventos/${idPresencaEvento}`, { situacao: false });
        Swal.fire('Removido!', 'Sua presença foi removida.', 'success');
      } else if (idPresencaEvento !== null) {
        //atualizacao: situacao para TRUE
        console.log("aqui 02");
        await api.put(`PresencasEventos/${idPresencaEvento}`, { situacao: true });
        Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success');
      } else {
        console.log("aqui 03");
        //cadastrar uma nova presenca
        await api.post("PresencasEventos", { situacao: true, idUsuario: usuario.idUsuario, idEvento: idEvento });
        Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success');
      }
      listarEventos()
    } catch (error) {
      console.log(error)
    }
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
      <section className=" listagem_evento">
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
                    <button onClick={() => comentarEvento(item, usuario.idUsuario)}>
                      <img src={Comentar} alt="Comentar" />
                    </button>
                  </td>
                  <td data-cell="Participar" type="checkbox"
                    checked={item.possuiPresenca}
                    onChange={() =>
                      manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca)
                    }>
                    <Checkin />
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
