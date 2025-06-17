import React from 'react';
import "./CadastroUsuario.css";
import { useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2';
import Logo from "../../assets/logo.png";
import LogoEvent from "../../assets/logoEvent.svg";
import { Link, useNavigate } from "react-router-dom"; 
import Botao from "../../components/botao/Botao";

const CadastroUsuario = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("B9715542-585E-453A-8561-5133CEC01949");

  const navigate = useNavigate(); // ⬅️ Hook para redirecionar

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

  async function cadastrarUsuarios(e) {
    e.preventDefault();

    if (nome.trim() !== "" && email.trim() !== "" && senha.trim() !== "") {
      try {
        await api.post("Usuario", {
          nomeUsuario: nome,
          email: email,
          senha: senha,
          idTipoUsuario: tipoUsuario

          
        });
        
        setNome("");
        setEmail("");
        setSenha("");
        setTipoUsuario("");
        
        let timerInterval;
        Swal.fire({
          title: "Usuário cadastrado!",
          html: "Redirecionando para o login... <b></b> ms",
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
          if (result.dismiss === Swal.DismissReason.timer) {
            navigate("/Login");
          }
        });
        
      } catch (error) {
        console.log(nome);
        console.log(email);
        console.log(senha);
        console.log(tipoUsuario);
        alertar("error", "Erro ao cadastrar. Contate o suporte.");
      }

    } else {
      alertar("error", "Preencha todos os campos.");
    }
  }

  return (
    <main className="main_login">
      <div className="logoBanner">
        <img src={Logo} alt="" />
      </div>
      <section className="section_login">
        <form className="form_cadastro" onSubmit={cadastrarUsuarios}>
          <img src={LogoEvent} alt="Logo do event+" />
          <div className="campos_login">
            <div className="campo_input">
              <input type="text" name="Nome" placeholder="Name"
                value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="campo_input">
              <input type="email" name="Email" placeholder="Username"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="campo_input">
              <input type="password" name="Senha" placeholder="Password"
                value={senha} onChange={(e) => setSenha(e.target.value)} />
            </div>
          </div>
          <Link to="/login" className="cadastro_usu">Login</Link>
          <a href="" >Esqueceu a senha?</a>
          <Botao nomeDoBotao="Cadastro"/>
        </form>
      </section>
    </main>
  );
};

export default CadastroUsuario;