import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import logo from '../src/assets/logo_vitalis.png';

import PatientRegister from './pages/PatientRegister';

function App() {
  return (
    <BrowserRouter>
      <Header  logo={logo}/>
      <Routes>
        <Route 
          path="/cadastro"
          element={
            <PatientRegister />
          } 
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
