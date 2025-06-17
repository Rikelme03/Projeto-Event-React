import React, { Children } from 'react'
import secureLocalStorage from "react-secure-storage";

//Importa funcoes do react para usar o Context
import { createContext, useState, useContext } from 'react';

//Cria o contesto de autenticacao, que permite compartilhar dados entre os componentes
const AuthContext = createContext();

//Esse componente vai envolver a aplicacao(ou parte dela) e fornecer os dados de autenticacao para os filhos dele 
export const AuthProvider = ({children}) => {

    //Cria um estado para o a const usuario
    const [usuario, setUsuario] = useState(() => {
        const usuarioSalvo = secureLocalStorage.getItem("tokenLogin");
        return usuarioSalvo ? JSON.parse(usuarioSalvo) : undefined
    });
    
    return(
        
        //O AuthContext.Provider permite que qualquer 
        // componente dentro dele acesse o usuario e setUsuario

        //Faz com que qualquer componente que esteja dentro de <AuthProvider>
        //{usuario,setUsuario}

        <AuthContext.Provider value={{usuario,setUsuario}}>
            {children}
        </AuthContext.Provider>
    );
};

//Esse hook personalizado facilita o acesso ao contexto dentro de qualquer componente 
export const useAuth = () => useContext(AuthContext);
