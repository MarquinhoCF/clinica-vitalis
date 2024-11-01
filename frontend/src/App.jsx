import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import logo from '../src/assets/logo_vitalis.png';

import Cadastro from './pages/Cadastro';

function App() {
  return (
    <BrowserRouter>
      <Header  logo={logo}/>
      <Routes>
        <Route 
          path="/cadastro"
          element={
            <Cadastro />
          } 
        />
        {/* <Route path="/about" component={About} />
        <Route component={NotFound} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
