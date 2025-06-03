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

  async function listarEvento() {
    try {
      const eventoListado = await api.get("Eventos");
      setListaEventos(eventoListado.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarEvento();
  }, []);

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


          async function comentarEvento(item) {
           try {
            const { value: comentario } = await Swal.fire({
              title: 'Comentar Evento',
              input: 'textarea',
              inputLabel: `Comentário para o evento "${item.nomeEvento}"`,
              inputPlaceholder: 'Digite seu comentário aqui...',
              inputAttributes: {
                'aria-label': 'Digite seu comentário aqui'
              },
              showCancelButton: true,
              confirmButtonText: 'Enviar',
              cancelButtonText: 'Cancelar',
            });

            if (!comentario) {
              throw new Error('Comentário vazio ou cancelado');
            }

            // Aqui você pode enviar para uma API ou manipular o estado
            console.log(`Comentário do evento "${item.nomeEvento}":`, comentario);

            await Swal.fire({
              icon: 'success',
              title: 'Comentário enviado!',
              text: 'Seu comentário foi registrado com sucesso.',
            });

          } catch (error) {
            console.error('Erro ao comentar evento:', error.message);

            if (error.message !== 'Comentário vazio ou cancelado') {
              Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Houve um problema ao enviar o comentário.',
              });
            }
          }
              }


  return (
    <>
      <Header />
      <section className="layout_grid listagem_evento">
        <h1>Eventos</h1>
        <hr />
        <div className="tabela_evento">
          <select
            name="Todos os Eventos"
            className="select_evento"
            value={valorSelectEventos}
            onChange={(e) => setvalorSelectEventos(e.target.value)}>
            <option value="" disabled>
              Evento
            </option>
            {listaEventos.map((item) => (
              <option value={item.idEvento}>{item.nomeEvento}</option>
            ))}
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
                {listaEventos.map((item) =>(
              <tr className="item_evento">
                <td data-cell="Nome">{item.nomeEvento}</td>
                <td data-cell="Data">{item.dataEvento? format(new Date(item.dataEvento), "dd/MM/yyyy", { locale: ptBR}) : ""}
              </td>
                <td data-cell="TipoEvento">{item.tiposEvento.tituloTipoEvento}</td>
                <td data-cell="evento">
                   <button onClick={() => descricaoEvento(item) }>
                       <img src={Descricao} alt="Ícone editar" />
                   </button>
               </td>
                <td data-cell="Editar">
                  <button onClick={() => comentarEvento(item)}>
                  <img src={Comentar} alt="Comentar" />
                  </button>
                </td>
                <td data-cell="Participar">
                  <Checkin />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
      <Modal/>
    </>
  );
};

export default ListagemEvento;