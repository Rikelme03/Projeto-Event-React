import "./Login.css";
import event from "../../assets/logo-escura.png"
import Logo from "../../assets/logo.png"
import Botao from "../../components/botao/Botao";
import api from "../../Services/services";
import { useState } from "react";
import Swal from 'sweetalert2';
import { userDecodeToken } from "../../auth/Auth"
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const naviGate = useNavigate();

    const { setUsuario } = useAuth();

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

    async function realizarAutenticacao(e) {
        e.preventDefault();
        try {

            const usuario = {
                email: email,
                senha: senha
            }

            if (senha.trim() != "" || email.trim() != "") {


                const resposta = await api.post("Login", usuario)

                const token = resposta.data.token;

                if (token) {
                    const tokenDecodificado = userDecodeToken(token)
                    // console.log(tokenDecodificado);
                    // console.log(tokenDecodificado.tipoUsuario);
                    setUsuario(tokenDecodificado);
                    
                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));

                    if (tokenDecodificado.tipoUsuario === "alunos") {
                        //redirecionar a tela aluno(branco)
                        naviGate("/Home")
                    } else {
                        naviGate("/CadastroEvento")
                    }
                } else {
                    alertar("error", "Preencha os campos !")
                }
            }

        } catch (error) {
            console.log(error);
            alertar("error", "Email ou senha invalidos !")
        }
    }


    return (
        <main className="main_login">
            <div className="logoBanner">
                <img src={Logo} alt="" />

            </div>
            <section className="section_login">

                <form action="" className="form_cadastro" onSubmit={realizarAutenticacao}>
                    <img src={event} alt="Logo do event+" />

                    <div className="campos_login">

                        <div className="campo_input">
                            <input type="Email" name="Email" placeholder="Username"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="campo_input">
                            <input type="senha" name="Senha" placeholder="Password"
                                value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>
                    </div>
                    
                    <Link  to="/" >Cadastrar-se</Link>
                    <a href="">Esqueceu a senha?</a> 
                    <Botao nomeDoBotao="Login" />
                </form>

            </section>
        </main>
    )
}

export default Login;