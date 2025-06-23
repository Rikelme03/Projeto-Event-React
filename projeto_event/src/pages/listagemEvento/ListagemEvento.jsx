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
import { useAuth } from "../../contexts/AuthContext";
import Checkin from "../../components/checkin/Checkin";
import withReactContent from 'sweetalert2-react-content';

const ListagemEvento = () => {
  const [listaEventos, setListaEventos] = useState([]);
  const [valorSelectEventos, setvalorSelectEventos] = useState("");
  const [ comentarios, setComentarios] = useState([]);
  const MySwal = withReactContent(Swal);

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

    async function listarECadastrarComentarios(idEvento, setComentarios) {
  try {
    
    const resposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${idEvento}`);
    const comentarios = resposta.data;

    // 2. Montar lista HTML
    const listaHtml = comentarios.length > 0
      ? `<ul style="text-align: left">${comentarios.map(c => `<li>${c.descricao}</li>`).join('')}</ul>`
      : "<p>Sem comentários ainda.</p>";

    
    const { value: descricao } = await MySwal.fire({
      title: "Comentários do Evento",
      html: `
        <div style="margin-bottom: 10px;">
          <strong>Lista:</strong>
          ${listaHtml}
        </div>
        <textarea id="comentario-input" class="swal2-textarea" placeholder="Digite seu comentário aqui..."></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Enviar comentário",
      preConfirm: () => {
        const descricao = document.getElementById("comentario-input").value;
        if (!descricao.trim()) {
          Swal.showValidationMessage("O comentário não pode estar vazio.");
        }
        return descricao;
      },
    });

    
    if (descricao) {
      await api.post("ComentariosEventos", {
        idEvento: idEvento,
        descricao: descricao,
      });

      Swal.fire("Sucesso!", "Comentário enviado com sucesso.", "success");

      // Atualiza a lista depois de comentar
      const novaResposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${idEvento}`);
      setComentarios(novaResposta.data);
    }
  } catch (error) {
    console.log(error);
    console.log("ID do Evento:", idEvento);
    Swal.fire("Erro", "Não foi possível carregar ou enviar comentários.", "error");
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
      <section className="listagem_evento">
        <h1>Eventos</h1>
        <hr />

        <div className="tabela_evento">
          <div className="org_select_listagemEvento">
          <select className="select_evento"
            onChange={(e) => setFiltroData([e.target.value])}>
            <option value="todos" selected>Todos os eventos</option>
            <option value="futuros">Somente futuros</option>
            <option value="passados">Somente passados</option>
          </select>
        </div>
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
                    <button onClick={() => listarECadastrarComentarios(item.idEvento, setComentarios)}>
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
