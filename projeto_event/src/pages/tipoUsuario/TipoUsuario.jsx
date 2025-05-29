import Header from "../../components/header/Header"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"
import Footer from "../../components/footer/Footer"
import Banner from "../../assets/bannerTipoUsuario.png"
import Swal from 'sweetalert2'
import api from "../../Services/services";
import { useEffect, useState } from "react";

const TipoUsuario = () => {

    const [tipoUsuario, setTipoUsuario] = useState("")
    const [listaTipoUsuario, setListaTipoUsuario] = useState([]);

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


    async function cadastrarTipoUsuario(e){
        e.preventDefault();
        //Verificar se o input esta sendo cadastrado vazio
        if (tipoUsuario.trim() != "") {
            //try => tentar 
            //catch => lanca a excesao
        try{
            await api.post("tiposUsuarios", {tituloTipoUsuario: tipoUsuario});
            setTipoUsuario("");

            //============ alertar =======================
            let timerInterval;
                Swal.fire({ 
                title: "Cadastrando Tipo Usuario !",
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

            
        }catch(error){
            alertar("error", "Entre em contato com o suporte :(")
        }

        }else{
            alertar("error", "O campo esta vazio :(")
        }

    }

    async function listarTiposUsuarios(){

            try{
               const resposta = await api.get("tiposUsuarios");
                setListaTipoUsuario(resposta.data);

            }catch(error){
                console.log(error);
                
            }
        }


        useEffect(() => {
        listarTiposUsuarios();
        
    }, [listaTipoUsuario]);

    async function deletarTiposUsuarios(id) {
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
            await api.delete(`tiposUsuarios/${id.idTipoUsuario}`);
            listarTiposUsuarios();
            alertar("success", "Tipo de evento excluído!");
        }
    } catch (error) {
        console.error("Erro ao excluir:");
        alertar("error", "Erro ao excluir tipo de evento. Veja o console.");
    }
}


async function editarTiposUsuarios(tipoUsuario){

        const { value: novoTipoUsuario } = await Swal.fire({
        title: "Edite seu tipo de evento",
        input: "text",
        inputLabel: "Novo Tipo de evento",
        inputValue:  tipoUsuario.tituloTipoUsuario,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                
            return "O campo nao pode estar vazio";
            }
        }
        });
        if (novoTipoUsuario) {
                try {
                    // console.log(genero.nome);
                    // console.log(novoGenero);
                    await api.put(`tiposUsuarios/${tipoUsuario.idTipoUsuario}`,{tituloTipoUsuario: novoTipoUsuario});
                    Swal.fire(`O Tipo evento foi modificado para ${novoTipoUsuario}`);
                } catch (error) {
                    console.log(error);     
                }
        }
    };


    return(

        <>
        <Header />
        <main>
            <Cadastro 
                tituloCadastro="CADASTRO TIPO DE USUÁRIO"
                namePlace="Titulo"
                visibilidade="none"
                visiData="none"
                visiIndefinido="none"
                imagem= {Banner}
                funcCadastro= {cadastrarTipoUsuario}
                ValorInput = {tipoUsuario}
                setValorInputTitulo={setTipoUsuario}
            />
            <Lista
            tituloPagina="LISTA TIPO DE USUÁRIO"
            tituloDoEvento="Titulo"
            visiDataEvento="none"
            visiTipoEvento="none"
            visiBotaoDescricao="none"
            visibol="none"
            visiTituloDescricao="none"
            visi="none"
            lista={listaTipoUsuario}
            funcDeletar={deletarTiposUsuarios}
            funcEditar = {editarTiposUsuarios}
            />
            
        </main>
        <Footer />
    </>
    
    )
}

export default TipoUsuario;