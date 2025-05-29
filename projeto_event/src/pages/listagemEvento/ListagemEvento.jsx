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
            onChange={(e) => setvalorSelectEventos(e.target.value)}
          >
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
                <td data-cell="Nome">{item.dataEvento
                ? format(new Date(item.dataEvento), "dd/MM/yyyy", { locale: ptBR }) : ""}
                {item.tituloTipoEvento} {item.tituloTipoUsuario}</td>
                <td data-cell="Evento">{item.tituloTipoEvento}</td>
                <td data-cell="Evento">
                    <img src={Descricao} alt="" />
                </td>
                <td data-cell="Editar">
                  <img src={Comentar} alt="Comentar" />
                </td>
                <td data-cell="Excluir">
                  <Checkin />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ListagemEvento;