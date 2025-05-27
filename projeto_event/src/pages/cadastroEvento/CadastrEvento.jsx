import Header from "../../components/header/Header"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"
import Footer from "../../components/footer/Footer"
import Banner from "../../assets/bannerCadastroEvento.png"
import Swal from 'sweetalert2'
import api from "../../Services/services";
import { useEffect, useState } from "react";

const CadastroEvento = () => {

    const [evento, setEvento] = useState("")
    const [dateEvento, setDateEvento] = useState("")
    const [descricao, setDescricao] = useState("")
    const [tipoEvento, setTipoEvento] = useState("")
    const [listaEvento, setListaEvento] = useState([])
    const [listaTipoEvento, setListaTipoEvento] = useState([])
    const [instituicao, setInstituicao] = useState("7FE5A07D-0AF6-43EA-BB33-ED889E8223A4")



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
        if (evento.trim() != "") {
            try {
                await api.post("eventos",
                    { nomeEvento: evento, idTipoEvento: tipoEvento, dataEvento: dateEvento, descricao: descricao, idInstituicao: instituicao });
                alertar("success", "Cadastro realizado com sucesso!");
                setEvento("");
                setDateEvento();
                setDescricao("");
                setTipoEvento("");

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
        listarEventos();
    }, [listaTipoEvento]);

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

        async function listarEventos() {
        try {

            const resposta = await api.get("Eventos")
            setListaEvento(resposta.data)

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
                    dataEvento ={dateEvento}
                />
            </main>
            <Footer />
        </>

    )
}

export default CadastroEvento