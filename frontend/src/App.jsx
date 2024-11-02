import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import logo from '../src/assets/logo_vitalis.png';

import Home from './pages/Home';
import PatientRegister from './pages/PatientRegister';
import ComingSoon from './pages/ComingSoon';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Header  logo={logo}/>
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route 
          path="/registerPatient"
          element={
            <PatientRegister />
          } 
        />
        <Route 
          path="/comingSoon" 
          element={
            <ComingSoon />
          }
        />
        <Route
          path='*'
          element={
            <NotFound />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
