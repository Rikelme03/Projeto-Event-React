import React from 'react';
import "./CadastroUsuario.css";
import { useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2';
import event from "../../assets/logo-escura.png"
import { Link, useNavigate } from "react-router-dom"; 
import Botao from "../../components/botao/Botao";

const CadastroUsuario = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("f2dfc5e5-1853-4dbe-9aa5-7dce6851fc8f");

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
    <main className="tela_cadastro">
    <div className="cadastro_meio">
    <form className="formulario_cadastro" onSubmit={cadastrarUsuarios}>
      <img className="logo_event" src={event} alt="Logo Event+" />
      
      <div className="campos_login">
        <div className="campo_input">
          <input type="text" placeholder="Name" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="campo_input">
          <input type="email" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="campo_input">
          <input type="password" placeholder="Password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
      </div>

      <div className="links_aux">
        <Link to="/login">Login</Link>
        <a href="#">Esqueceu a senha?</a>
      </div>

      <Botao nomeDoBotao="Cadastre-se" />
    </form>
    </div>
  
</main>
  );
};

export default CadastroUsuario;