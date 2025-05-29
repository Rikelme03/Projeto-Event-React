import Header from "../../components/header/Header"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"
import Footer from "../../components/footer/Footer"
import Banner from "../../assets/bannerCadastro.png"
import api from "../../Services/services";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
const TipoEvento = () => {

    const [tipoEvento, setTipoEvento] = useState("")
    const [listaTiposEventos, setListaTiposEventos] = useState([]);


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


    async function cadastrarTipoEvento(e) {
        e.preventDefault();
        //Verificar se o input esta sendo cadastrado vazio
        if (tipoEvento.trim() != "") {
            //try => tentar 
            //catch => lanca a excesao
            try {
                await api.post("tiposEventos", { tituloTipoEvento: tipoEvento });
                setTipoEvento("");

                //============ alertar =======================
                let timerInterval;
                Swal.fire({
                    title: "Cadastrando Titulo !",
                    html: "Demora apenas... <b></b> milliseconds.",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("I was closed by the timer");
                    }
                });
                //============ alertar =======================


            } catch (error) {
                alertar("error", "Entre em contato com o suporte :(")
            }

        } else {
            alertar("error", "O campo esta vazio :(")
        }

    }

    async function listarTiposEventos() {

        try {
            const resposta = await api.get("tiposEventos");
            // console.log(resposta.data[2].IdTipoEvento);
            // console.log(resposta.data[3].Ti);
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa");

            console.log(resposta.data);
            setListaTiposEventos(resposta.data);

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarTiposEventos();

    }, [listaTiposEventos]);

    async function deletarTipoEvento(id) {
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
                await api.delete(`TiposEventos/${id.idTipoEvento}`);
                listarTiposEventos();
                alertar("success", "Tipo de evento excluído!");
            }
        } catch (error) {
            console.error("Erro ao excluir:");
            alertar("error", "Erro ao excluir tipo de evento. Veja o console.");
        }
    }

    async function editarTipoEvento(tipoEvento) {

        const { value: novoTipoEvento } = await Swal.fire({
            title: "Edite seu tipo de evento",
            input: "text",
            inputLabel: "Novo Tipo de evento",
            inputValue: tipoEvento.tituloTipoEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {

                    return "O campo nao pode estar vazio";
                }
            }
        });
        if (novoTipoEvento) {
            try {
                // console.log(genero.nome);
                // console.log(novoGenero);
                await api.put(`TiposEventos/${tipoEvento.idTipoEvento}`, { tituloTipoEvento: novoTipoEvento });
                Swal.fire(`O Tipo evento foi modificado para ${novoTipoEvento}`);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (

        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="CADASTRO TIPO DE EVENTOS"
                    namePlace="Titulo"
                    visibilidade="none"
                    visiData="none"
                    visiIndefinido="none"
                    imagem={Banner}
                    funcCadastro={cadastrarTipoEvento}
                    ValorInput={tipoEvento}
                    setValorInput={setTipoEvento}

                />
                <Lista
                    tituloPagina="LISTA TIPO DE EVENTOS"
                    visibilidade="none"
                    visi="none"
                    visibol="none"
                    tituloDoEvento="Titulo"
                    visiDataEvento="none"
                    visiTipoEvento="none"
                    visiBotaoDescricao="none"
                    visiTituloDescricao="none"
                    lista={listaTiposEventos}
                    funcDeletar={deletarTipoEvento}
                    funcEditar={editarTipoEvento}
                />

            </main>
            <Footer />
        </>

    )
}

export default TipoEvento
