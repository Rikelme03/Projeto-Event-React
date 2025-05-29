import Header from "../../components/header/Header"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"
import Footer from "../../components/footer/Footer"
import Banner from "../../assets/bannerCadastroEvento.png"
import Swal from 'sweetalert2'
import api from "../../Services/services";
import { useEffect, useState } from "react";
import {format} from 'date-fns'


const CadastroEvento = () => {

    const [evento, setEvento] = useState("")
    const [dateEvento, setDateEvento] = useState("")
    const [descricao, setDescricao] = useState("")
    const [tipoEvento, setTipoEvento] = useState("")
    const [listaEvento, setListaEvento] = useState([])
    const [listaTipoEvento, setListaTipoEvento] = useState([])
    const [instituicao, setInstituicao] = useState("7FE5A07D-0AF6-43EA-BB33-ED889E8223A4")
    const currentDate = new Date();
    const formatandoData = format(currentDate, 'dd/mm/yyyy')


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

    async function cadastrarEvento(evt) {
        evt.preventDefault();
        console.log(evento);
        console.log(tipoEvento);
        console.log(dateEvento);
        console.log(descricao);
        console.log(instituicao);
        
        if (evento.trim() != "") {
            try {
                await api.post("eventos",
                    { nomeEvento: evento, idTipoEvento: tipoEvento, 
                        dataEvento: dateEvento, descricao: descricao, 
                        idInstituicao: instituicao });
                alertar("success", "Cadastro realizado com sucesso!");
                setEvento("");
                setDateEvento();
                setDescricao("");
                setTipoEvento("");
                listarEventos();
            } catch (error) {
                alertar("error", "Entre em contato com o suporte")
                console.log(error);

            }
        } else {
            alertar("error", "Preencha o campo vazio")

        }
    }

    useEffect(() => {
        listarTipoEvento();
        // listarEventos();
    }, [listaEvento]);

    useEffect(() => {
        // listarTipoEvento();
        listarEventos();
    }, []);

    async function listarTipoEvento() {

        try {
            const resposta = await api.get("tiposEventos");
            // console.log(resposta.data[2].idgenero);
            // console.log(resposta.data[3].TituloTipoEvento);
            // console.log(resposta.data);
            setListaTipoEvento(resposta.data);

        } catch (error) {
            console.log(error);

        }
    }

    async function deletarEvento(id) {
        try {
            const result = await Swal.fire({
                title: 'Tem certeza?',
                text: "Essa ação não poderá ser desfeita!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, apagar!',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                console.log("Deletando ID:", id); // Ajuda a depurar
                await api.delete(`Eventos/${id.idEvento}`);
                listarEventos();
                alertar("success", "Tipo de evento excluído!");
            }
        } catch (error) {
            console.error("Erro ao excluir:");
            alertar("error", "Erro ao excluir tipo de evento. Veja o console.");
        }
    }


    async function listarEventos() {
        try {

            const resposta = await api.get("Eventos")
            setListaEvento(resposta.data)

        } catch (error) {

        }
    }

    async function editarEvento(evento) {
  try {
    const tiposOptions = listaTipoEvento
      .map(tipo => `<option value="${tipo.idTipoEvento}" ${tipo.idTipoEvento === evento.idTipoEvento ? 'selected' : ''}>${tipo.tituloTipoEvento}</option>`)
      .join('');

    const { value } = await Swal.fire({
      title: "Editar Tipo de Evento",
      html: `
        <input id="campo1" class="swal2-input" placeholder="Título" value="${evento.nomeEvento || ''}">
        <input id="campo2" class="swal2-input" type="date" value="${evento.dataEvento?.substring(0, 10) || ''}">
        <select id="campo3" class="swal2-select">${tiposOptions}</select>
        <input id="campo4" class="swal2-input" placeholder="Categoria" value="${evento.descricao || ''}">
      `,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
      preConfirm: () => {
        const campo1 = document.getElementById("campo1").value;
        const campo2 = document.getElementById("campo2").value;
        const campo3 = document.getElementById("campo3").value;
        const campo4 = document.getElementById("campo4").value;

        if (!campo1 || !campo2 || !campo3 || !campo4) {
          Swal.showValidationMessage("Preencha todos os campos.");
          return false;
        }

        return { campo1, campo2, campo3, campo4 };
      }
    });

    if (!value) {
      console.log("Edição cancelada pelo usuário.");
      return;
    }

    console.log("Dados para atualizar:", value);

    await api.put(`eventos/${evento.idEvento}`, {
      nomeEvento: value.campo1,
      dataEvento: value.campo2,
      idTipoEvento: value.campo3,  
      descricao: value.campo4,
    });

    console.log("Evento atualizado com sucesso!");
    Swal.fire("Atualizado!", "Dados salvos com sucesso.", "success");
    listarEventos();

  } catch (error) {
    console.log("Erro ao atualizar evento:", error);
    Swal.fire("Erro!", "Não foi possível atualizar.", "error");
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

    return (

        <>
            <Header />
            <main>
                <Cadastro tituloCadastro="CADASTRO DE EVENTO"
                    namePlace="Titulo"
                    namePlaceData="Data do evento"
                    imagem={Banner}
                    namePlaceDescricao="Descricao"

                    funcCadastro={cadastrarEvento}
                    lista={listaTipoEvento}

                    ValorInput={evento}
                    setValorInputTitulo={setEvento}

                    ValorInputData={dateEvento}
                    setValorInputData={setDateEvento}

                    valorSelectTipoEvento={tipoEvento}
                    setValorSelectTipoEvento={setTipoEvento}

                    valorSelectInstituicao={instituicao}
                    setValorSelectInstituicao={setInstituicao}

                    ValorInputDescricao={descricao}
                    setValorInputDescricao={setDescricao}
                />
                <Lista
                    tituloPagina="LISTA DE EVENTOS"
                    lista={listaEvento}
                    tipoLista="Eventos"
                    tituloDoEvento="Nome"
                    tituloDescricao="Descricao"
                    dataEvento={dateEvento}
                    funcDeletar={deletarEvento}
                    descricao={descricaoEvento}
                    funcEditar={editarEvento}
                />
            </main>
            <Footer />
        </>

    )
}

export default CadastroEvento