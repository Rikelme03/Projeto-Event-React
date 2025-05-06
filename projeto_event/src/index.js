import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './pages/login/Login';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Lista from './components/lista/Lista';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Lista/>
  </React.StrictMode>
);

