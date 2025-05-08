import "./Login.css";
import LogoEvent from "../../assets/logoEvent.svg"
import Logo from "../../assets/logo.png"
import Botao from "../../components/botao/Botao";

const Login = () =>{
    return (
        <main className="main_login">
            <div className="logoBanner"> 
                <img src={Logo} alt="" />

            </div>
            <section className="section_login">

                <form action="" className="form_cadastro">
                <img src= {LogoEvent} alt="Logo do event+" />
                
                <div className="campos_login">

                <div className="campo_input">
                    <input type="nome" name="nome" placeholder="Username" />
                </div>

                <div className="campo_input">
                    <input type="nome" name="nome" placeholder="Password" />
                </div>
                </div>
                <a href="">Esqueceu a senha?</a>
                <Botao nomeDoBotao = "Login"/>
                </form>
                




            </section>
        </main>
    )
}

export default Login;