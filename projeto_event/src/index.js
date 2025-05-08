import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import Rotas from "../src/routes/routes"
import ListagemEvento from "../src/pages/listagemEvento/ListagemEvento"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
      <App/>
    </>
  </React.StrictMode>
);

