import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import logo from '../src/assets/logo_vitalis.png';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import Login from './pages/Login';
import PatientRegister from './pages/PatientRegister';
import NurseRegister from './pages/NurseRegister';
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
          path="/login"
          element={
            <Login />
          } 
        />
        <Route 
          path="/registerPatient"
          element={
            <PatientRegister />
          } 
        />
        <Route 
          path="/registerNurse"
          element={
            <NurseRegister />
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
